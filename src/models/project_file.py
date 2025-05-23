from datetime import datetime
from src.models.user import db
import os

class ProjectFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    file_type = db.Column(db.String(50), nullable=False)  # 'projeto', 'laudo', 'orçamento', etc.
    file_size = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Chaves estrangeiras
    service_order_id = db.Column(db.Integer, db.ForeignKey('service_order.id'), nullable=False)
    technical_report_id = db.Column(db.Integer, db.ForeignKey('technical_report.id'), nullable=True)
    
    def __repr__(self):
        return f'<ProjectFile {self.filename}>'
    
    def get_file_extension(self):
        return os.path.splitext(self.filename)[1].lower()
    
    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'file_path': self.file_path,
            'file_type': self.file_type,
            'file_size': self.file_size,
            'description': self.description,
            'service_order_id': self.service_order_id,
            'technical_report_id': self.technical_report_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
