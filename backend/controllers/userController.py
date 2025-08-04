from flask import Blueprint, request, jsonify, current_app, g
import models.userModel as userModel
import jwt
import datetime
from middleware.middlewareRoute import token_required

userBp = Blueprint('userBp', __name__)
SECRET_KEY = "EC_3000_**"

@userBp.route('/login', methods=['POST'])
def loginUser():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = userModel.loginUser(username, password)
    
    if user:
        payload = {
            'id': user['id'],
            'username': user['username'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({
            'message': f"astronaut siap, pakai helm mu {user['username']}!",
            'success': True,
            'id': user['id'],
            'email': user['email'],
            'username': user['username'],
            'token': token
        })
    else:
        return jsonify({
            'message': 'nama atau token salah',
            'success': False
        })

@userBp.route('/profile', methods=['GET'])
@token_required
def getProfile():
    user_data = g.user
    return jsonify({
        'message': 'Data user berhasil diambil',
        'user': user_data
    })





@userBp.route('/users', methods=['GET'])
def getUsers():
    return jsonify(userModel.getAllUsers())

@userBp.route('/users', methods=['POST'])
def addUser():
    data = request.get_json()
    userModel.addUser(data['name'], data['user'])
    return jsonify({'message': 'User added'})


@userBp.route('/users/<int:id>', methods=['PUT'])
def updateUser(id):
    data = request.get_json()
    userModel.updateUser(id, data['name'], data['user'])
    return jsonify({'message': 'User updated'})

@userBp.route('/users/<int:id>', methods=['DELETE'])
def deleteUser(id):
    userModel.deleteUser(id)
    return jsonify({'message': 'User deleted'})
