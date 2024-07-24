from flask import Blueprint, request
from app.models import db, Game, Team, Odd
from app.forms import GameForm
from app.forms import OddForm
from flask_login import current_user, login_required

game_routes = Blueprint('games', __name__)


@game_routes.route('')
def all_games(): 
    """
    Query for all games
    """

    page = request.args.get('page')
    size = request.args.get('size')
    sportType = request.args.get('sportType')


    # Find all of the gamees
    if page and size: 
        # Filter down on sport types when they exist
        if sportType and sportType != 'undefined': 
            games = Game.query.filter(Game.home_team.has(sport_type=sportType)).order_by(Game.start_time).limit(int(size)).offset(int(size) * (int(page)-1)).all()
        else: 
            games = Game.query.order_by(Game.start_time).limit(int(size)).offset(int(size) * (int(page)-1)).all()
    else: 
        games = Game.query.order_by(Game.start_time).all()

    include_teams = request.args.get('include_teams')

    # TODO: Consider using this URL PARAM!
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
    
        # Take into account the sport Type when we have an extra game
        if sportType and sportType != 'undefined':
            total_games = Game.query.filter(Game.home_team.has(sport_type=sportType)).count()
        else: 
            total_games = Game.query.count()

        return {
            'games': [game.to_dict() for game in games], 
            'total_games': total_games
        }
    


@game_routes.route('/<int:game_id>')
def find_game(game_id):
    """
    Query for single game, and return the teams associated with the game
    """

    # Get the game and then 
    game = Game.query.get(game_id)
    if not game: 
        return { 
            "Error": "Game not found"
        }
    
    teams = Team.query.filter(Team.id.in_([game.home_team_id, game.away_team_id])).all()
    odds = Odd.query.filter(Odd.game_id == game_id, Odd.status == 'open').all()
    return {
        'games':[ game.to_dict()],
        'teams': [team.to_dict() for team in teams],
        'odds': [odd.to_dict() for odd in odds]
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


@game_routes.route('/<int:game_id>/odds', methods=['GET', 'POST'])
@login_required
def add_odd(game_id): 
    """
    Creates a new odds on a game
    """

    payload = request.json

    # Manually add the JSON values to the form 
    # NOTE: The form takes care of things like authentication through the 
    # CSRF token validation
    form = OddForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['game_id'].data = payload['game_id']
    form['team_id'].data = payload['team_id']
    form['value'].data = payload['value']
    form['type'].data = payload['type']

    # Step 1: Validate
    if form.validate_on_submit(): 
        # Step 2: Deprecate all existing "live" odds
        existing_odds = Odd.query.filter_by(
            game_id = form.data['game_id'],
            team_id = form.data['team_id'],
            type = form.data['type'],
            status = 'open'
        )
        
        if existing_odds: 
            for ex_odd in existing_odds: 
                ex_odd.status = 'closed'
            db.session.commit()

        # Step 3: Create new odds
        new_odd = Odd(
            user_id=current_user.id,
            game_id=form.data['game_id'],
            team_id=form.data['team_id'],
            type=form.data['type'],
            value=form.data['value'],
            status='open'
        )

        db.session.add(new_odd)
        db.session.commit()

        # Step 4: Serialize to user
        return new_odd.to_dict()
    
    return form.errors, 401



