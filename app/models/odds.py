from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Odd(db.Model): 
    __tablename__ = 'odds'


    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')), nullable=True)
    type = db.Column(db.String, nullable=True)
    value = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())


    # one to many - user to odds
    user = db.relationship('User', back_populates='odd')
    # one to many - game to odds
    game = db.relationship('Game', back_populates='odd')
    # one to many - team to odds
    team = db.relationship('Team', back_populates='odd')


    def to_dict(self): 
        return {
            'id': self.id,
            'userId': self.user_id,
            'gameId': self.game_id,
            'teamId': self.team_id,
            'type': self.type,
            'value': self.value,
            'status': self.status
        }