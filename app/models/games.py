from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Game(db.Model): 
    __tablename__ = 'games'

    if environment == 'production': 
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    home_team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')), nullable=False)
    away_team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, defualt=datetime.now())
    updated_at = db.Column(db.DateTime, defualt=datetime.now())

    # one to many - user to games
    user = db.relationship('User', back_populates='game')
    # two to many - two teams to games
    home_team = db.relationship('Team', foreign_keys='Game.home_team_id')
    away_team = db.relationship('Team', foreign_keys='Game.away_team_id')
    # one to many - game to odds
    odd = db.relationship('Odd', back_populates='game')
    # one to one - one game to one game result
    result = db.relationship('Result', uselist=False, back_populates='game')


    def to_dict(self): 
        return {
            'id': self.id,
            'userId': self.user_id,
            'homeTeamId': self.home_team_id,
            'awayTeamId': self.away_team_id,
            'startTime': self.start_time
        }
