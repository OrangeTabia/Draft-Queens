from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField, FloatField
from wtforms.validators import DataRequired, InputRequired

odds_type = ['moneyline', 'spread', 'over', 'under']

class OddForm(FlaskForm): 
    game_id = IntegerField('game_id', validators=[DataRequired()])
    team_id = IntegerField('team_id', validators=[DataRequired()])
    type = SelectField(choices=odds_type, validators=[DataRequired()])
    value = FloatField('value', validators=[InputRequired()])
    
