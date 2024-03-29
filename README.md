��#   m a z t a p e e 
App Name: **Claraz Reminder App**

**Introduction**


**Overview**

**Tech Stack (Dependencies)**

**1. Backend Dependencies**
Our tech stack will include the following:
Flask Flask-Migrate 
virtualenv (a tool to create isolated Python environments)
SQLAlchemy ORM to be our ORM library of choice
PostgreSQL as our database of choice
Python3 and Flask as our server language and server framework
(Note - I do not mention the specific version of a package, because I am constantly upgrading until the final product is hosted.)

**2. Frontend Dependencies**
HTML, CSS, and Javascript (with React remastering in the future) for our website's frontend.
Main Files: Project Structure
├── README.md
├── app.py *** the main driver of the app. Including SQLAlchemy models.
                  "python app.py" to run after installing dependencies
├── config.py *** Database URLs, CSRF generation, etc
├── error.log
├── requirements.txt *** the dependencies I installed in the development environment
├── static
│   ├── css 
│   ├── font
│   ├── img
│   └── js
└── templates
    ├── errors
    ├── forms
    ├── layouts
    └── pages
    
Overall:
Models are located in the MODELS section of app.py.
Controllers are also located in app.py.
The web frontend is located in templates/, which builds static assets deployed to the web server at static/. 
