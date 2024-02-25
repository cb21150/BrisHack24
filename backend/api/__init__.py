from flask import Flask

from api.config import Config

app = Flask(__name__)

# config
app.config.from_object(Config)

# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)

app.config['JWT_SECRET_KEY'] = 'supersecretkey'  # Change this!

from api import routes