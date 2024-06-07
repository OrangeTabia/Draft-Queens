from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Result(db.Model): 
    __tablename__ = 'results'

    if environment == 'production': 
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')))
    home_team_score = db.Column(db.Integer, nullable=False)
    away_team_score = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.String(1000), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # TODO: Add cascades for all of these 
    # one to many - user to game results
    user = db.relationship('User', cascade='all, delete', back_populates='result')
    # one to one - one game to one game result
    game = db.relationship('Game', cascade='all, delete', back_populates='result')


    def to_dict(self): 
        return {
            'id': self.id, 
            'userId': self.user_id,
            'gameId': self.game_id,
            'homeTeamScore': self.home_team_score,
            'awayTeamScore': self.away_team_score,
            'notes': self.notes
        }