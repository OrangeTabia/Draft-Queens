from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class TeamForm(FlaskForm): # TODO: need to edit the class name for this form 
    # TODO: need to add in proper variables.fields for the create team form 
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")