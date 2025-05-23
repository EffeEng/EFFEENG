from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta
import os

# Configuração do JWT
jwt = JWTManager()

def setup_jwt(app):
    """Configura o JWT para a aplicação Flask"""
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'effe-engenharia-secret-key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
    jwt.init_app(app)
    
def generate_token(user_id, role):
    """Gera um token JWT para o usuário"""
    return create_access_token(
        identity={'user_id': user_id, 'role': role}
    )

def admin_required(fn):
    """Decorator para verificar se o usuário é administrador"""
    @jwt_required()
    def wrapper(*args, **kwargs):
        identity = get_jwt_identity()
        if identity.get('role') != 'admin':
            return {'message': 'Acesso negado. Permissão de administrador necessária.'}, 403
        return fn(*args, **kwargs)
    wrapper.__name__ = fn.__name__
    return wrapper
