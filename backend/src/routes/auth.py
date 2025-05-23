from flask import Blueprint, request, jsonify
from src.models.user import User, db
from src.auth import generate_token
from werkzeug.security import check_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Verificar se os campos obrigatórios estão presentes
    if not all(k in data for k in ['username', 'email', 'password']):
        return jsonify({'message': 'Dados incompletos. Forneça username, email e password.'}), 400
    
    # Verificar se o usuário ou email já existem
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Nome de usuário já existe.'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email já está em uso.'}), 400
    
    # Criar novo usuário
    role = data.get('role', 'cliente')  # Por padrão, novos usuários são clientes
    
    # Apenas administradores podem criar outros administradores
    if role == 'admin' and not data.get('is_admin_creating', False):
        role = 'cliente'  # Força o papel para cliente se não for um admin criando
    
    new_user = User(
        username=data['username'],
        email=data['email'],
        role=role
    )
    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'message': 'Usuário registrado com sucesso!',
        'user': new_user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Verificar se os campos obrigatórios estão presentes
    if not all(k in data for k in ['email', 'password']):
        return jsonify({'message': 'Dados incompletos. Forneça email e password.'}), 400
    
    # Buscar usuário pelo email
    user = User.query.filter_by(email=data['email']).first()
    
    # Verificar se o usuário existe e a senha está correta
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Credenciais inválidas.'}), 401
    
    # Gerar token JWT
    token = generate_token(user.id, user.role)
    
    return jsonify({
        'message': 'Login realizado com sucesso!',
        'token': token,
        'user': user.to_dict()
    }), 200
