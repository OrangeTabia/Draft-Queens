from flask import Blueprint, request
from app.models import db, Result
from app.forms import ResultForm
from flask_login import current_user, login_required

result_routes = Blueprint('results', __name__)


@result_routes.route('')
def all_results(): 
    """
    Query for all results
    """
    results = Result.query.all()
    return {'results': [result.to_dict() for result in results]}



@result_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_result():
    """
    Create the results for a game
    """

    form = ResultForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit(): 

        new_result = Result(
            user_id=current_user.id,
            game_id=form.data['game_id'],
            home_team_score=form.data['home_team_score'],
            away_team_score=form.data['away_team_score'],
            notes=form.data['notes']
        )

        db.session.add(new_result)
        db.session.commit()

        return new_result.to_dict()
    
    return form.errors, 401



