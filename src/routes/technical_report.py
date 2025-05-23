from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.technical_report import TechnicalReport, db
from src.models.service_order import ServiceOrder
from src.auth import admin_required

report_bp = Blueprint('report', __name__)

# Rotas para clientes
@report_bp.route('/client/reports', methods=['GET'])
@jwt_required()
def get_client_reports():
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    # Buscar ordens de serviço do cliente
    orders = ServiceOrder.query.filter_by(client_id=user_id).all()
    order_ids = [order.id for order in orders]
    
    # Buscar laudos relacionados às ordens de serviço do cliente
    reports = TechnicalReport.query.filter(TechnicalReport.service_order_id.in_(order_ids)).all()
    
    return jsonify({
        'reports': [report.to_dict() for report in reports]
    }), 200

@report_bp.route('/client/reports/<int:report_id>', methods=['GET'])
@jwt_required()
def get_client_report_detail(report_id):
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    # Buscar laudo
    report = TechnicalReport.query.get(report_id)
    if not report:
        return jsonify({'message': 'Laudo técnico não encontrado.'}), 404
    
    # Verificar se o laudo pertence a uma ordem de serviço do cliente
    order = ServiceOrder.query.get(report.service_order_id)
    if not order or order.client_id != user_id:
        return jsonify({'message': 'Acesso negado.'}), 403
    
    return jsonify({
        'report': report.to_dict()
    }), 200

# Rotas para administradores
@report_bp.route('/admin/reports', methods=['GET'])
@admin_required
def get_all_reports():
    reports = TechnicalReport.query.all()
    return jsonify({
        'reports': [report.to_dict() for report in reports]
    }), 200

@report_bp.route('/admin/reports', methods=['POST'])
@admin_required
def create_report():
    data = request.get_json()
    
    # Verificar se os campos obrigatórios estão presentes
    if not all(k in data for k in ['title', 'content', 'report_type', 'service_order_id']):
        return jsonify({'message': 'Dados incompletos. Forneça title, content, report_type e service_order_id.'}), 400
    
    # Verificar se a ordem de serviço existe
    order = ServiceOrder.query.get(data['service_order_id'])
    if not order:
        return jsonify({'message': 'Ordem de serviço não encontrada.'}), 404
    
    # Criar novo laudo técnico
    new_report = TechnicalReport(
        title=data['title'],
        content=data['content'],
        report_type=data['report_type'],
        service_order_id=data['service_order_id']
    )
    
    db.session.add(new_report)
    db.session.commit()
    
    return jsonify({
        'message': 'Laudo técnico criado com sucesso!',
        'report': new_report.to_dict()
    }), 201

@report_bp.route('/admin/reports/<int:report_id>', methods=['PUT'])
@admin_required
def update_report(report_id):
    data = request.get_json()
    
    report = TechnicalReport.query.get(report_id)
    if not report:
        return jsonify({'message': 'Laudo técnico não encontrado.'}), 404
    
    # Atualizar campos
    if 'title' in data:
        report.title = data['title']
    if 'content' in data:
        report.content = data['content']
    if 'report_type' in data:
        report.report_type = data['report_type']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Laudo técnico atualizado com sucesso!',
        'report': report.to_dict()
    }), 200

@report_bp.route('/admin/reports/<int:report_id>', methods=['DELETE'])
@admin_required
def delete_report(report_id):
    report = TechnicalReport.query.get(report_id)
    if not report:
        return jsonify({'message': 'Laudo técnico não encontrado.'}), 404
    
    db.session.delete(report)
    db.session.commit()
    
    return jsonify({
        'message': 'Laudo técnico excluído com sucesso!'
    }), 200
