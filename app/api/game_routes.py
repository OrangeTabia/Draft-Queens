from flask import Blueprint, request
from app.models import db, Game, Team, Odd
from app.forms import GameForm
from flask_login import current_user, login_required

game_routes = Blueprint('games', __name__)


@game_routes.route('')
def all_games(): 
    """
    Query for all games
    """

    page = request.args.get('page')
    size = request.args.get('size')

    # Find all of the gamees
    if page and size: 
        games = Game.query.order_by(Game.start_time).limit(int(size)).offset(int(size) * (int(page)-1)).all()
    else: 
        games = Game.query.order_by(Game.start_time).all()

    include_teams = request.args.get('include_teams')

    # Add the specific teams serialized when the URL Param is included
    if include_teams: 
        serialized_games = []
        for game in games: 
            away_team = Team.query.filter_by(id = game.away_team_id).first()
            home_team = Team.query.filter_by(id = game.home_team_id).first()

            game_dict = game.to_dict()
            game_dict['away_team'] = away_team.to_dict()
            game_dict['home_team'] = home_team.to_dict()

            serialized_games.append(game_dict)

        return {'games': serialized_games}

    else:
        return {
            'games': [game.to_dict() for game in games], 
            'total_games': db.session.query(Game).count()
        }



@game_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_game(): 
    """
    Create a new game
    """
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_game = Game(
            user_id=current_user.id,
            home_team_id=form.data['home_team_id'],
            away_team_id=form.data['away_team_id'],
            start_time = form.data['start_time']
        )

        db.session.add(new_game)
        db.session.commit()

        return new_game.to_dict()
    
    return form.errors, 401



@game_routes.route('/<int:game_id>/update', methods=['GET', 'POST'])
@login_required
def update_game(game_id): 
    """
    Edit a game
    """

    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit(): 

        updated_game = Game.query.get(game_id)
        updated_game.home_team_id = form.data['home_team_id']
        updated_game.away_team_id = form.data['away_team_id']
        updated_game.start_time = form.data['start_time']

        db.session.commit()

        return updated_game.to_dict()
    
    return form.errors, 401


@game_routes.route('/<int:game_id>/delete')
@login_required
def delete_game(game_id):
    """
    Delete a game
    """

    game_to_delete = Game.query.get(game_id)

    db.session.delete(game_to_delete)
    db.session.commit()

    return {'message': 'Game has been successfully deleted'}


