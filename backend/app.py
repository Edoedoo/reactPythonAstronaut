from flask import Flask
from controllers.userController import userBp
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(userBp)
CORS(app)
app.config['SECRET_KEY'] = 'EC_3000_**'

if __name__ == '__main__':
    app.run(debug=True)

