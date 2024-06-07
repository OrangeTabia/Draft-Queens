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
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # one to many - user to games
    user = db.relationship('User', back_populates='game')
    # two to many - two teams to games
    home_team = db.relationship('Team',  foreign_keys=[home_team_id], back_populates='home_games')
    away_team = db.relationship('Team', foreign_keys=[away_team_id], back_populates='away_games')
    # one to many - game to odds (Delete odds when the game is gone)
    odd = db.relationship('Odd', back_populates='game', cascade="all, delete-orphan")
    # one to one - one game to one game result (Delete results when the game is gone)
    result = db.relationship('Result', uselist=False, back_populates='game', cascade="all, delete-orphan")


    def to_dict(self): 
        return {
            'id': self.id,
            'userId': self.user_id,
            'homeTeamId': self.home_team_id,
            'awayTeamId': self.away_team_id,
            'startTime': self.start_time
        }
