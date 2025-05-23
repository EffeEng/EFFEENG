from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.budget import Budget, db
from src.models.service_order import ServiceOrder
from src.auth import admin_required

budget_bp = Blueprint('budget', __name__)

# Rotas para clientes
@budget_bp.route('/client/budgets', methods=['GET'])
@jwt_required()
def get_client_budgets():
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    # Buscar ordens de serviço do cliente
    orders = ServiceOrder.query.filter_by(client_id=user_id).all()
    order_ids = [order.id for order in orders]
    
    # Buscar orçamentos relacionados às ordens de serviço do cliente
    budgets = Budget.query.filter(Budget.service_order_id.in_(order_ids)).all()
    
    return jsonify({
        'budgets': [budget.to_dict() for budget in budgets]
    }), 200

@budget_bp.route('/client/budgets/<int:budget_id>', methods=['GET'])
@jwt_required()
def get_client_budget_detail(budget_id):
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    # Buscar orçamento
    budget = Budget.query.get(budget_id)
    if not budget:
        return jsonify({'message': 'Orçamento não encontrado.'}), 404
    
    # Verificar se o orçamento pertence a uma ordem de serviço do cliente
    order = ServiceOrder.query.get(budget.service_order_id)
    if not order or order.client_id != user_id:
        return jsonify({'message': 'Acesso negado.'}), 403
    
    return jsonify({
        'budget': budget.to_dict()
    }), 200

@budget_bp.route('/client/budgets/<int:budget_id>/approve', methods=['PUT'])
@jwt_required()
def approve_client_budget(budget_id):
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    # Buscar orçamento
    budget = Budget.query.get(budget_id)
    if not budget:
        return jsonify({'message': 'Orçamento não encontrado.'}), 404
    
    # Verificar se o orçamento pertence a uma ordem de serviço do cliente
    order = ServiceOrder.query.get(budget.service_order_id)
    if not order or order.client_id != user_id:
        return jsonify({'message': 'Acesso negado.'}), 403
    
    # Aprovar orçamento
    budget.status = 'aprovado'
    db.session.commit()
    
    return jsonify({
        'message': 'Orçamento aprovado com sucesso!',
        'budget': budget.to_dict()
    }), 200

# Rotas para administradores
@budget_bp.route('/admin/budgets', methods=['GET'])
@admin_required
def get_all_budgets():
    budgets = Budget.query.all()
    return jsonify({
        'budgets': [budget.to_dict() for budget in budgets]
    }), 200

@budget_bp.route('/admin/budgets', methods=['POST'])
@admin_required
def create_budget():
    data = request.get_json()
    
    # Verificar se os campos obrigatórios estão presentes
    if not all(k in data for k in ['value', 'description', 'service_order_id']):
        return jsonify({'message': 'Dados incompletos. Forneça value, description e service_order_id.'}), 400
    
    # Verificar se a ordem de serviço existe
    order = ServiceOrder.query.get(data['service_order_id'])
    if not order:
        return jsonify({'message': 'Ordem de serviço não encontrada.'}), 404
    
    # Verificar se já existe um orçamento para esta ordem de serviço
    existing_budget = Budget.query.filter_by(service_order_id=data['service_order_id']).first()
    if existing_budget:
        return jsonify({'message': 'Já existe um orçamento para esta ordem de serviço.'}), 400
    
    # Criar novo orçamento
    new_budget = Budget(
        value=data['value'],
        description=data['description'],
        status=data.get('status', 'pendente'),
        service_order_id=data['service_order_id']
    )
    
    db.session.add(new_budget)
    db.session.commit()
    
    return jsonify({
        'message': 'Orçamento criado com sucesso!',
        'budget': new_budget.to_dict()
    }), 201

@budget_bp.route('/admin/budgets/<int:budget_id>', methods=['PUT'])
@admin_required
def update_budget(budget_id):
    data = request.get_json()
    
    budget = Budget.query.get(budget_id)
    if not budget:
        return jsonify({'message': 'Orçamento não encontrado.'}), 404
    
    # Atualizar campos
    if 'value' in data:
        budget.value = data['value']
    if 'description' in data:
        budget.description = data['description']
    if 'status' in data:
        budget.status = data['status']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Orçamento atualizado com sucesso!',
        'budget': budget.to_dict()
    }), 200

@budget_bp.route('/admin/budgets/<int:budget_id>', methods=['DELETE'])
@admin_required
def delete_budget(budget_id):
    budget = Budget.query.get(budget_id)
    if not budget:
        return jsonify({'message': 'Orçamento não encontrado.'}), 404
    
    db.session.delete(budget)
    db.session.commit()
    
    return jsonify({
        'message': 'Orçamento excluído com sucesso!'
    }), 200
