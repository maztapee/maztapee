import json
import sys
from config import app, todo_db
from flask import render_template,redirect, url_for, request, jsonify
from datetime import date, datetime, timedelta
from sqlalchemy import func
from models import TodoCategory, TodoList
from sqlalchemy.exc import IntegrityError

#########################################################

@app.route('/')
def welcome():
    return render_template('welcome.html', 
    category = TodoCategory.query.all(),
    category_lists = TodoCategory.query.order_by('id').all(), 
    todo_lists = TodoList.query.order_by('id').all())


@app.route('/add_reminder')
def add_reminder():
    return render_template('add_reminder.html')

@app.route('/home')
def home():
    return redirect(url_for('welcome'))

@app.route('/categories/<category_id>/home')
def home1(category_id):
    return redirect(url_for('welcome'))

@app.route('/login')
def login():
    return render_template('login_signup.html')

@app.route('/categories/<category_id>/login')
def login1(category_id):
    return redirect(url_for('login'))

@app.route('/categories/<category_id>/login')
def login2(category_id):
    return redirect(url_for('login'))

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/categories/<category_id>/about')
def about1(category_id):
    return redirect(url_for('about'))

@app.route('/categories/<category_id>/about')
def about2(category_id):
    return redirect(url_for('about'))

@app.route('/contact_us')
def contact_us():
    return render_template('contact_us.html')

@app.route('/categories/<category_id>/contact_us')
def contact_us1(category_id):
    return redirect(url_for('contact_us'))

@app.route('/categories/<category_id>/contact_us')
def contact_us2(category_id):
    return redirect(url_for('contact_us'))

@app.route('/categories/<category_id>/')
def categoryDisplay(category_id):
    return render_template('category_display.html', 
    category = TodoCategory.query.filter_by(id=category_id).all(),
    category_lists = TodoCategory.query.order_by('id').all(), 
    category_todos= TodoList.query.filter_by(category_id=category_id).all())
    
@app.route('/categories/edit', methods=['POST'])
def edit_category():
    body = {}
    todo_id = 0
    todo_update= {}
    error = False
    try:
        # Extracting data from the JSON request
        category_name = request.get_json()["category_name"]
        newCat_name = request.get_json().get("newCategory_name", category_name).strip()

        # Retrieving the category to be updated from the database
        category_update = TodoCategory.query.filter_by(category_name=category_name).first()

        if category_update:
            # Updating the category name
            cat_id = category_update.id
            category_update.category_name = newCat_name
            todo_db.session.add(category_update)
            todo_db.session.commit()

            # Extracting additional data for TodoList
            expected_time = request.get_json().get("deadline")
            new_task = request.get_json().get("todo")
            activity_time = datetime.now(tz=None)

            if new_task and expected_time:
                # Creating a new TodoList entry
                todo_update = TodoList(description=new_task, expected_time=expected_time, activity_time=activity_time, category_id=cat_id)
                todo_db.session.add(todo_update)
                todo_db.session.commit()
            elif not (new_task and expected_time):
                print("You are only changing the name of this category!")

            # Populating the response body
            body["category_name"] = newCat_name
            body["description"] = new_task
            body["category_id"] = cat_id
            body["todo_id"] = todo_update.id if todo_update else None
        else:
            error = True
            return jsonify({"error": "Category not found"}), 404

    except (KeyError, AttributeError, TypeError, ValueError, IntegrityError) as e:
        error = True
        todo_db.session.rollback()
        return jsonify({"error": "Invalid Operation: " + str(e)}), 400

    finally:
        todo_db.session.close()

    if not error:
        return body
    

@app.route('/todos/create', methods=['POST'])
def category():
    body = {}
    error = False
    try:
        description = request.get_json()["todo_description"]
        print(description)
        cat_name = request.get_json()["category_name"]
        expected_time = request.get_json()["completed"]
        activity_time = datetime.now(tz=None)
        print(activity_time)
        category = TodoCategory(category_name=cat_name, create_time=activity_time)
        todo_db.session.add(category)
        todo_db.session.commit()
        category_id = category.id
        todo_update = TodoList(description=description, category_id=category_id, expected_time=expected_time, activity_time=activity_time)
        todo_db.session.add(todo_update)
        todo_db.session.commit()
        body["category_name"] = category.category_name
        body["description"] = todo_update.description
        body["id"] = category_id
        display_body = json.dumps(body)
    except:
        error = True
        todo_db.session.rollback()
        print (sys.exc_info())
    finally:
        todo_db.session.close()
    if not error:
        return display_body

@app.route('/categories/<cat_id>/delete', methods = ['DELETE'])
def deleteTask(cat_id):
    body = {}
    try:
        cat_id = cat_id
        TodoCategory.query.filter_by(id=cat_id).delete()
        todo_db.session.commit()
        requestUrl = request.url
        body['cat_id'] = cat_id
        body['url'] = requestUrl
        delete_body = json.dumps(body)
    except:
        todo_db.session.rollback()
    finally:
        todo_db.session.close()
        welcome()
        return delete_body

@app.route('/todos/<todo_id>/delete', methods = ['DELETE'])
def deleteTodo(todo_id):
    try:
        todo_id = todo_id
        deletion = TodoList.query.filter_by(id=todo_id)
        deletion.delete()
        todo_db.session.commit()
    except:
        todo_db.session.rollback()
    finally:
        todo_db.session.close()
    return jsonify(todo_id)

@app.route('/recent_todos', methods=['POST'])
def recent_todos():
    error = False
    body = {}
    try:
        new_task = request.get_json()['description']
        print (new_task)
        create_task = TodoList(description=new_task)
        todo_db.session.add(create_task)
        todo_db.session.commit()
        body['description'] = create_task.description
        body['id'] = create_task.id
    except:
        error = True
        todo_db.session.rollback()
    finally:
        todo_db.session.close()
        if not error:
            return jsonify(body)    

@app.route('/todos/<todo_id>/boxcheck', methods = ['POST'])
def todoStatus(todo_id):
    body ={}
    try: 
        completed = request.get_json()['completed']
        todoId = request.get_json()['todoId']
        print(todoId)
        todo_id = TodoList.query.filter_by(id=todoId).first()
        todo_id.completed = completed
        body['completed'] = todo_id.completed
        body['todoId'] = todo_id.id
        todo_db.session.add(todo_id)
        todo_db.session.commit()
        
    except:
        todo_db.session.rollback()
    finally:
        todo_db.session.close()
        return jsonify(body)