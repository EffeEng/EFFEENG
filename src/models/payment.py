from datetime import datetime
from src.models.user import db

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)  # 'pix', 'cartão', 'boleto', etc.
    status = db.Column(db.String(20), nullable=False, default='pendente')  # 'pendente', 'aprovado', 'rejeitado'
    transaction_id = db.Column(db.String(100), unique=True, nullable=True)
    payment_date = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Chaves estrangeiras
    service_order_id = db.Column(db.Integer, db.ForeignKey('service_order.id'), nullable=False)
    
    def __repr__(self):
        return f'<Payment {self.id} - R${self.amount}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'payment_method': self.payment_method,
            'status': self.status,
            'transaction_id': self.transaction_id,
            'payment_date': self.payment_date.isoformat() if self.payment_date else None,
            'service_order_id': self.service_order_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
