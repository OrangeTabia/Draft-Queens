from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField, StringField, SelectField
from wtforms.validators import DataRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

sport_types = ['basketball', 'soccer', 'rugby']

class TeamForm(FlaskForm): 
    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()])
    sport_type = SelectField('Sport', choices=[sport_types], validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    logo = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])