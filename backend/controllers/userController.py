from flask import Blueprint, request, jsonify
import models.userModel as userModel

userBp = Blueprint('userBp', __name__)

        # ====== LOGIN ====== 
@userBp.route('/login', methods=['POST'])
def loginUser():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = userModel.loginUser(username, password)
    
    if user:
        return jsonify({
            'message': f'astronaut siap, pakai helm mu {user['username']}!',
            'success': True,
            'id': user['id'],
            'email': user['email'],
            'username': user['username']
        })
    else:
        return jsonify({
            'message': 'nama atau token salah',
            'success': False
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
