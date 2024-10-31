from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Bet(db.Model): 
    __tablename__ = 'bets'

    if environment == 'production': 
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    odd_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('odds.id')))
    status = db. Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.Datetime, default=datetime.now())

    user = db.relationship('User', back_populates='bet')
    odd = db.relationship('Game', back_populates='bet')

    def to_dict(self): 
        return {
            'id': self.id, 
            'userId': self.user_id, 
            'oddId': self.odd_id, 
            'status': self.status
        }