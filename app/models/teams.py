from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Team(db.Model): 
    __tablename__ = 'teams'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(100), unique=True, nullable=False)
    sport_type = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    logo = db.Column(db.String(1000), nullable=True) #this is an image
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # one to many - user to teams
    user = db.relationship('User', back_populates='team')
    # one to many - team to odds
    odd = db.relationship('Odd', back_populates='team')

    
    def to_dict(self): 
        return {
            'id': self.id, 
            'userId': self.user_id,
            'name': self.name,
            'sportType': self.sport_type,
            'location': self.location,
            'logo': self.logo
        }