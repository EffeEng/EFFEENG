from datetime import datetime
from src.models.user import db

class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pendente')  # 'pendente', 'aprovado', 'rejeitado'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Chaves estrangeiras
    service_order_id = db.Column(db.Integer, db.ForeignKey('service_order.id'), nullable=False)
    
    def __repr__(self):
        return f'<Budget {self.id} - R${self.value}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'value': self.value,
            'description': self.description,
            'status': self.status,
            'service_order_id': self.service_order_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
