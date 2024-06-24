from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from logging import FileHandler,WARNING


app = Flask(__name__, template_folder='templates', static_url_path='/static')
file_handler = FileHandler('errorlog.txt')
file_handler.setLevel(WARNING)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Maztapee-1989@localhost:5432/flaskr'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://Maztapee:clara_2312@Maztapee.mysql.pythonanywhere-services.com/Maztapee$default'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Maztapee_1989@localhost/clara_todo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

todo_db = SQLAlchemy(app)

todo_migrate = Migrate(app, todo_db)

