from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length


class ResultForm(FlaskForm): 
    user_id = IntegerField('user_id', validators=[DataRequired()])
    game_id = IntegerField('game_id', validators=[DataRequired()])
    home_team_score = IntegerField('home_team_score', validators=[DataRequired()])
    away_team_score = IntegerField('away_team_score', validators=[DataRequired()])
    notes = StringField('notes', validators=[Length(max=2000)])
