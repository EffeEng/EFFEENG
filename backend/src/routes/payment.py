from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.payment import Payment, db
from src.models.service_order import ServiceOrder
from src.auth import admin_required
import os
from datetime import datetime

payment_bp = Blueprint('payment', __name__)

# Rotas para clientes
@payment_bp.route('/client/payments', methods=['GET'])
@jwt_required()
def get_client_payments():
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    # Buscar ordens de serviço do cliente
    orders = ServiceOrder.query.filter_by(client_id=user_id).all()
    order_ids = [order.id for order in orders]
    
    # Buscar pagamentos relacionados às ordens de serviço do cliente
    payments = Payment.query.filter(Payment.service_order_id.in_(order_ids)).all()
    
    return jsonify({
        'payments': [payment.to_dict() for payment in payments]
    }), 200

@payment_bp.route('/client/payments/<int:payment_id>', methods=['GET'])
@jwt_required()
def get_client_payment_detail(payment_id):
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    # Buscar pagamento
    payment = Payment.query.get(payment_id)
    if not payment:
        return jsonify({'message': 'Pagamento não encontrado.'}), 404
    
    # Verificar se o pagamento pertence a uma ordem de serviço do cliente
    order = ServiceOrder.query.get(payment.service_order_id)
    if not order or order.client_id != user_id:
        return jsonify({'message': 'Acesso negado.'}), 403
    
    return jsonify({
        'payment': payment.to_dict()
    }), 200

@payment_bp.route('/client/payments', methods=['POST'])
@jwt_required()
def create_client_payment():
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    data = request.get_json()
    
    # Verificar se os campos obrigatórios estão presentes
    if not all(k in data for k in ['amount', 'payment_method', 'service_order_id']):
        return jsonify({'message': 'Dados incompletos. Forneça amount, payment_method e service_order_id.'}), 400
    
    # Verificar se a ordem de serviço existe e pertence ao cliente
    order = ServiceOrder.query.filter_by(id=data['service_order_id'], client_id=user_id).first()
    if not order:
        return jsonify({'message': 'Ordem de serviço não encontrada ou acesso negado.'}), 404
    
    # Criar novo pagamento
    new_payment = Payment(
        amount=data['amount'],
        payment_method=data['payment_method'],
        status='pendente',
        service_order_id=data['service_order_id']
    )
    
    # Simular integração com gateway de pagamento
    # Em um ambiente real, aqui seria feita a integração com PagSeguro, Stripe ou Pix
    import uuid
    new_payment.transaction_id = str(uuid.uuid4())
    
    db.session.add(new_payment)
    db.session.commit()
    
    return jsonify({
        'message': 'Pagamento registrado com sucesso! Aguardando confirmação.',
        'payment': new_payment.to_dict()
    }), 201

# Rotas para administradores
@payment_bp.route('/admin/payments', methods=['GET'])
@admin_required
def get_all_payments():
    payments = Payment.query.all()
    return jsonify({
        'payments': [payment.to_dict() for payment in payments]
    }), 200

@payment_bp.route('/admin/payments/<int:payment_id>', methods=['PUT'])
@admin_required
def update_payment(payment_id):
    data = request.get_json()
    
    payment = Payment.query.get(payment_id)
    if not payment:
        return jsonify({'message': 'Pagamento não encontrado.'}), 404
    
    # Atualizar campos
    if 'status' in data:
        payment.status = data['status']
        if data['status'] == 'aprovado' and not payment.payment_date:
            payment.payment_date = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({
        'message': 'Pagamento atualizado com sucesso!',
        'payment': payment.to_dict()
    }), 200

# Webhook para processadores de pagamento (simulado)
@payment_bp.route('/webhook/payment', methods=['POST'])
def payment_webhook():
    data = request.get_json()
    
    # Verificar se os campos obrigatórios estão presentes
    if not all(k in data for k in ['transaction_id', 'status']):
        return jsonify({'message': 'Dados incompletos.'}), 400
    
    # Buscar pagamento pelo transaction_id
    payment = Payment.query.filter_by(transaction_id=data['transaction_id']).first()
    if not payment:
        return jsonify({'message': 'Pagamento não encontrado.'}), 404
    
    # Atualizar status do pagamento
    payment.status = data['status']
    if data['status'] == 'aprovado':
        payment.payment_date = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({
        'message': 'Webhook processado com sucesso!'
    }), 200
