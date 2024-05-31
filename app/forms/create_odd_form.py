from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField, StringField
from wtforms.validators import DataRequired

odds_type = ['moneyline', 'spread', 'over', 'under']

class OddForm(FlaskForm): 
    user_id = IntegerField('user_id', validators=[DataRequired()])
    game_id = IntegerField('game_id', validators=[DataRequired()])
    team_id = IntegerField('team_id', validators=[DataRequired()])
    type = SelectField(choicees=[odds_type], validators=[DataRequired()])
    value = IntegerField('value', validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])
    
