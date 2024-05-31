from flask import Blueprint, request
from app.models import db, Team
from app.forms import TeamForm
from flask_login import current_user, login_required
# import from name of the helper function file
from .AWS_helpers import (upload_file_to_s3, get_unique_filename)

team_routes = Blueprint('teams', __name__)



@team_routes.route("")
def all_teams(): 
    """
    Query for all teams
    """
    teams = Team.query.all()
    return {'teams': [team.to_dict() for team in teams]}



@team_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_team(): 
    """
    Create a new team
    """
    form = TeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = form.data['logo']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if 'url' not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            print(form.errors)
            return form.errors, 401

        url = upload['url']

        new_team = Team(
            user_id=current_user.id,
            name=form.data['name'],
            sport_type=form.data['sport_type'],
            location=form.data['location'],
            image=url,
        )

        db.session.add(new_team)
        db.session.commit()
        return new_team.to_dict()
    
    if form.errors:
        print(form.errors)
        return form.errors, 401
    
    return form.errors, 401



@team_routes.route('/teams/<int:team_id>', methods=['GET', 'POST'])
@login_required
def update_team(team_id): 
    """
    Edit a specific team
    """

    form = TeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        updated_image = form.data['logo']
        updated_image.filename = get_unique_filename(updated_image.filename)
        upload = upload_file_to_s3(updated_image)
        print(upload)

        if "url" not in upload:
            print(form.errors)
            return form.errors, 401
        
        updated_url = upload['url']

        updated_team = Team.query.get(team_id)
        updated_team.name = form.data['name']
        updated_team.sport_type = form.data['sport_type']
        updated_team.location = form.data['location']
        updated_image = updated_url

        db.session.commit()

        return updated_team.to_dict()
    
    if form.errors:
        print(form.errors)
        return form.errors, 401
    
    return form.errors, 401



@team_routes.route('teams/<int:team_id>/delete')
@login_required
def delete_team(team_id): 
    """
    Delete a specific team
    """

    team_to_delete = Team.query.get(team_id)

    db.sessions.delete(team_to_delete)
    db.session.commit()

    return {'message': 'Comment has been successfully deleted'}