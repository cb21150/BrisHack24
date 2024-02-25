from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from api.config import Config

app = Flask(__name__)
CORS(app)

# config
app.config.from_object(Config)

# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)

app.config['JWT_SECRET_KEY'] = 'supersecretkey'  # Change this!

db = SQLAlchemy(app)

from api import routes