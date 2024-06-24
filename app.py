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

@app.route('/world_reminder')
def world_reminder():
    return render_template('world_reminders.html')

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
    error = False
    todo_id = 0
    try:
        cat_name = request.get_json()["category_name"]
        category_name = cat_name.strip()
        category_id = request.get_json()["category_id"]
        newCat_name = request.get_json()["newCategory_name"] or category_name
        category_update = TodoCategory.query.filter(TodoCategory.id==category_id).first()
        if category_update:
            category_update.category_name = newCat_name
            todo_db.session.add(category_update)
            todo_db.session.commit()
        else:
            # Generate an error response when the category is not found
            error_message = f"Category with name {category_name} not found."
            return jsonify({"error": error_message}), 404 
            
        cat_id = category_update.id
        # category_status = request.get_json()["category_status"] // create column with accompanying migration in the models.py
        expected_time = request.get_json()["deadline"]
        # print (expected_time) {value obtained successfully}
        new_task = request.get_json()["todo"]
        activity_time = datetime.now(tz=None)
        print(cat_id, expected_time, new_task, activity_time)
        # print (new_task) {value obtained successfully}
        if new_task.strip() and expected_time:
            todo_update = TodoList(description=new_task, expected_time=expected_time, activity_time=activity_time, category_id=cat_id)
            todo_db.session.add(todo_update)
            todo_db.session.commit()
            todo_id = todo_update.id
            # print (todo_update.category_id) {value of category_id obtained successfully}
            # print (todo_update.description, todo_update.expected_time) {values changed successfully on the query object}
        elif not new_task.strip() or not expected_time:
            print("you are changing the name of this category!")
            pass
        body["category_name"] = newCat_name
        body["description"] = new_task
        body["category_id"] = cat_id
        body["todo_id"] = todo_id
        
        
    except (KeyError, AttributeError, TypeError, ValueError, IntegrityError) as e:
        error = True
        todo_db.session.rollback()
        return jsonify({"error": "Invalid Operation: " + str(e)}), 400
        # print (sys.exc_info())
    finally:
        todo_db.session.close()
    if not error:
        return body

@app.route('/todos/create', methods=['POST'])
def category():
    body = {}
    error = False
    try:
        activity_time = datetime.now(tz=None)

        description = request.get_json()["todo_description"].strip()
        cat_name = request.get_json()["category_name"].strip()
        expected_time = request.get_json()["completed"]

        if(not cat_name or not description):
            error = True
            raise Exception("New Todo Task Description or Category Name not found")
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
        todo_db.session.commit()

    except Exception as e:
        if error:
            todo_db.session.rollback()
            return json.dumps({"error": str(e)}), 400
        
    finally:
        todo_db.session.close()

    return json.dumps(body)

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
    return welcome()

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