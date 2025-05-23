from datetime import datetime
from src.models.user import db

class TechnicalReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    report_type = db.Column(db.String(50), nullable=False)  # 'estrutural', 'arquitetônico', 'laudo_técnico', etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Chaves estrangeiras
    service_order_id = db.Column(db.Integer, db.ForeignKey('service_order.id'), nullable=False)
    
    # Relacionamentos
    files = db.relationship('ProjectFile', backref='technical_report', lazy=True)
    
    def __repr__(self):
        return f'<TechnicalReport {self.title}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'report_type': self.report_type,
            'service_order_id': self.service_order_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
