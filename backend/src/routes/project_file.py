from flask import Blueprint, request, jsonify, current_app, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.project_file import ProjectFile, db
from src.models.service_order import ServiceOrder
from src.models.technical_report import TechnicalReport
from src.auth import admin_required
import os
import uuid
from werkzeug.utils import secure_filename

file_bp = Blueprint('file', __name__)

# Configuração para upload de arquivos
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
    
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'dwg', 'dxf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Rotas para clientes
@file_bp.route('/client/files', methods=['GET'])
@jwt_required()
def get_client_files():
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    # Buscar ordens de serviço do cliente
    orders = ServiceOrder.query.filter_by(client_id=user_id).all()
    order_ids = [order.id for order in orders]
    
    # Buscar arquivos relacionados às ordens de serviço do cliente
    files = ProjectFile.query.filter(ProjectFile.service_order_id.in_(order_ids)).all()
    
    return jsonify({
        'files': [file.to_dict() for file in files]
    }), 200

@file_bp.route('/client/files/<int:file_id>', methods=['GET'])
@jwt_required()
def get_client_file(file_id):
    identity = get_jwt_identity()
    user_id = identity.get('user_id')
    
    # Buscar arquivo
    project_file = ProjectFile.query.get(file_id)
    if not project_file:
        return jsonify({'message': 'Arquivo não encontrado.'}), 404
    
    # Verificar se o arquivo pertence a uma ordem de serviço do cliente
    order = ServiceOrder.query.get(project_file.service_order_id)
    if not order or order.client_id != user_id:
        return jsonify({'message': 'Acesso negado.'}), 403
    
    # Retornar o arquivo para download
    try:
        return send_file(project_file.file_path, as_attachment=True, download_name=project_file.filename)
    except Exception as e:
        return jsonify({'message': f'Erro ao baixar arquivo: {str(e)}'}), 500

# Rotas para administradores
@file_bp.route('/admin/files', methods=['GET'])
@admin_required
def get_all_files():
    files = ProjectFile.query.all()
    return jsonify({
        'files': [file.to_dict() for file in files]
    }), 200

@file_bp.route('/admin/files', methods=['POST'])
@admin_required
def upload_file():
    # Verificar se o arquivo foi enviado
    if 'file' not in request.files:
        return jsonify({'message': 'Nenhum arquivo enviado.'}), 400
    
    file = request.files['file']
    
    # Verificar se o arquivo tem nome
    if file.filename == '':
        return jsonify({'message': 'Nome de arquivo inválido.'}), 400
    
    # Verificar se o arquivo é permitido
    if not allowed_file(file.filename):
        return jsonify({'message': f'Tipo de arquivo não permitido. Tipos permitidos: {", ".join(ALLOWED_EXTENSIONS)}'}), 400
    
    # Verificar se os campos obrigatórios estão presentes
    service_order_id = request.form.get('service_order_id')
    file_type = request.form.get('file_type')
    description = request.form.get('description', '')
    technical_report_id = request.form.get('technical_report_id')
    
    if not service_order_id or not file_type:
        return jsonify({'message': 'Dados incompletos. Forneça service_order_id e file_type.'}), 400
    
    # Verificar se a ordem de serviço existe
    order = ServiceOrder.query.get(service_order_id)
    if not order:
        return jsonify({'message': 'Ordem de serviço não encontrada.'}), 404
    
    # Verificar se o laudo técnico existe (se fornecido)
    if technical_report_id:
        report = TechnicalReport.query.get(technical_report_id)
        if not report:
            return jsonify({'message': 'Laudo técnico não encontrado.'}), 404
    
    # Salvar o arquivo
    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4()}_{filename}"
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    file.save(file_path)
    
    # Criar registro no banco de dados
    new_file = ProjectFile(
        filename=filename,
        file_path=file_path,
        file_type=file_type,
        file_size=os.path.getsize(file_path),
        description=description,
        service_order_id=service_order_id,
        technical_report_id=technical_report_id
    )
    
    db.session.add(new_file)
    db.session.commit()
    
    return jsonify({
        'message': 'Arquivo enviado com sucesso!',
        'file': new_file.to_dict()
    }), 201

@file_bp.route('/admin/files/<int:file_id>', methods=['DELETE'])
@admin_required
def delete_file(file_id):
    project_file = ProjectFile.query.get(file_id)
    if not project_file:
        return jsonify({'message': 'Arquivo não encontrado.'}), 404
    
    # Excluir o arquivo físico
    try:
        os.remove(project_file.file_path)
    except Exception as e:
        return jsonify({'message': f'Erro ao excluir arquivo: {str(e)}'}), 500
    
    # Excluir o registro do banco de dados
    db.session.delete(project_file)
    db.session.commit()
    
    return jsonify({
        'message': 'Arquivo excluído com sucesso!'
    }), 200
