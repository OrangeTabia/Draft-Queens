from flask import Blueprint, request
from app.models import db, Team
from app.forms import TeamForm
from flask_login import current_user, login_required
# import from name of the helper function file
from .AWS_helpers import (upload_file_to_s3, get_unique_filename)

team_routes = Blueprint('teams', __name__)


@team_routes.route('')
def all_teams(): 
    """
    Query for all teams
    """
    teams = Team.query.all()
    return {'teams': [team.to_dict() for team in teams]}



@team_routes.route('/new', methods=['POST'])
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
        print("Uploaded Image to S3: ", upload)

        if 'url' not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            print("Error on the S3 Upload ", form.errors)
            return form.errors, 401

        logo = upload['url']

        new_team = Team(
            user_id=current_user.id,
            name=form.data['name'],
            sport_type=form.data['sport_type'],
            location=form.data['location'],
            logo=logo,
        )

        db.session.add(new_team)
        db.session.commit()
        return new_team.to_dict()
    
    if form.errors:
        print("Error on form validation ", form.errors)
        return form.errors, 401
    
    return form.errors, 401



@team_routes.route('/<int:team_id>/update', methods=['GET', 'POST'])
@login_required
def update_team(team_id): 
    """
    Edit a team
    """

    form = TeamForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        # If there is an image, upload to S3
        updated_image = form.data['logo']
        if updated_image:
            print('Uploading the the desired team image')
            updated_image.filename = get_unique_filename(updated_image.filename) 
            upload = upload_file_to_s3(updated_image)
            updated_logo = upload['url']

            # If there is not a URL returned from S3, there is an error, 401 response 
            if 'url' not in upload:
                print(form.errors)
                return form.errors, 401
        

        updated_team = Team.query.get(team_id)
        updated_team.name = form.data['name']
        updated_team.sport_type = form.data['sport_type']
        updated_team.location = form.data['location']


        # If there's the updated image, store the URL in the object
        if updated_image: 
            updated_team.logo = updated_logo

        db.session.commit()

        return updated_team.to_dict()
    
    if form.errors:
        print(form.errors)
        return form.errors, 401
    
    return form.errors, 401



@team_routes.route('/<int:team_id>/delete')
@login_required
def delete_team(team_id): 
    """
    Delete a team
    """

    team_to_delete = Team.query.get(team_id)

    db.session.delete(team_to_delete)
    db.session.commit()

    return {'message': 'Team has been successfully deleted'}