from datetime import datetime
from src.models.user import db

class ServiceOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(20), unique=True, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='aberta')  # 'aberta', 'em_andamento', 'concluída'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Chaves estrangeiras
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Relacionamentos
    budget = db.relationship('Budget', backref='service_order', lazy=True, uselist=False)
    reports = db.relationship('TechnicalReport', backref='service_order', lazy=True)
    files = db.relationship('ProjectFile', backref='service_order', lazy=True)
    payments = db.relationship('Payment', backref='service_order', lazy=True)
    
    def __repr__(self):
        return f'<ServiceOrder {self.order_number}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_number': self.order_number,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'client_id': self.client_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
