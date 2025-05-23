from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.service_order import ServiceOrder, db
from src.models.user import User
from src.auth import admin_required

service_order_bp = Blueprint('service_order', __name__)

# Rotas para clientes
@service_order_bp.route('/client/orders', methods=['GET'])
@jwt_required()
def get_client_orders():
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    orders = ServiceOrder.query.filter_by(client_id=user_id).all()
    return jsonify({
        'orders': [order.to_dict() for order in orders]
    }), 200

@service_order_bp.route('/client/orders/<int:order_id>', methods=['GET'])
@jwt_required()
def get_client_order_detail(order_id):
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    order = ServiceOrder.query.filter_by(id=order_id, client_id=user_id).first()
    if not order:
        return jsonify({'message': 'Ordem de serviço não encontrada ou acesso negado.'}), 404
    
    return jsonify({
        'order': order.to_dict()
    }), 200

# Rotas para administradores
@service_order_bp.route('/admin/orders', methods=['GET'])
@admin_required
def get_all_orders():
    orders = ServiceOrder.query.all()
    return jsonify({
        'orders': [order.to_dict() for order in orders]
    }), 200

@service_order_bp.route('/admin/orders', methods=['POST'])
@admin_required
def create_order():
    data = request.get_json()
    
    # Verificar se os campos obrigatórios estão presentes
    if not all(k in data for k in ['title', 'description', 'client_id']):
        return jsonify({'message': 'Dados incompletos. Forneça title, description e client_id.'}), 400
    
    # Verificar se o cliente existe
    client = User.query.filter_by(id=data['client_id'], role='cliente').first()
    if not client:
        return jsonify({'message': 'Cliente não encontrado.'}), 404
    
    # Gerar número da ordem
    import random
    import string
    order_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    
    # Criar nova ordem de serviço
    new_order = ServiceOrder(
        order_number=order_number,
        title=data['title'],
        description=data['description'],
        status=data.get('status', 'aberta'),
        client_id=data['client_id']
    )
    
    db.session.add(new_order)
    db.session.commit()
    
    return jsonify({
        'message': 'Ordem de serviço criada com sucesso!',
        'order': new_order.to_dict()
    }), 201

@service_order_bp.route('/admin/orders/<int:order_id>', methods=['PUT'])
@admin_required
def update_order(order_id):
    data = request.get_json()
    
    order = ServiceOrder.query.get(order_id)
    if not order:
        return jsonify({'message': 'Ordem de serviço não encontrada.'}), 404
    
    # Atualizar campos
    if 'title' in data:
        order.title = data['title']
    if 'description' in data:
        order.description = data['description']
    if 'status' in data:
        order.status = data['status']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Ordem de serviço atualizada com sucesso!',
        'order': order.to_dict()
    }), 200

@service_order_bp.route('/admin/orders/<int:order_id>', methods=['DELETE'])
@admin_required
def delete_order(order_id):
    order = ServiceOrder.query.get(order_id)
    if not order:
        return jsonify({'message': 'Ordem de serviço não encontrada.'}), 404
    
    db.session.delete(order)
    db.session.commit()
    
    return jsonify({
        'message': 'Ordem de serviço excluída com sucesso!'
    }), 200
