from email.policy import default
from config import todo_db

class TodoCategory (todo_db.Model):
    __tablename__ = 'todo_category'
    id = todo_db.Column(todo_db.Integer, primary_key = True)
    category_name = todo_db.Column(todo_db.String(50), nullable = False)
    create_time = todo_db.Column(todo_db.DateTime, nullable = True)
    todo_list = todo_db.relationship('TodoList', backref = 'list', lazy = True, cascade="all, delete")

class TodoList (todo_db.Model): #Child-Table
    __tablename__ = 'todo_database'
    id = todo_db.Column(todo_db.Integer, primary_key = True)
    description = todo_db.Column(todo_db.String(), nullable= False)
    completed = todo_db.Column(todo_db.Boolean, nullable = False, default= False)
    expected_time = todo_db.Column(todo_db.DateTime, nullable = True)
    completed_time = todo_db.Column(todo_db.DateTime, nullable = True)
    activity_time = todo_db.Column(todo_db.DateTime, nullable = True)
    category_id = todo_db.Column(todo_db.Integer, todo_db.ForeignKey(TodoCategory.id, ondelete="CASCADE"),nullable = False)

class WorldReminder (todo_db.Model):
    __tablename__ = 'world_reminder'
    id = todo_db.Column(todo_db.Integer, primary_key = True)
    event = todo_db.Column(todo_db.String(), nullable = False)
    date = todo_db.Column(todo_db.Date)

def __repr__(self):
    return f'<Todo {self.id} {self.description}>'