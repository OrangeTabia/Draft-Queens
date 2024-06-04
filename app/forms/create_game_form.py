from flask_wtf import FlaskForm
from wtforms import IntegerField, DateTimeField
from wtforms.validators import DataRequired

class GameForm(FlaskForm): 
    home_team_id = IntegerField('home_team_id', validators=[DataRequired()])
    away_team_id = IntegerField('away_team_id', validators=[DataRequired()])
    start_time = DateTimeField('start_time', validators=[DataRequired()], format='%Y-%m-%d %H:%M')
