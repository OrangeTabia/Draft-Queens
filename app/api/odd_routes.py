from flask import Blueprint, request
from app.models import db, Odd
from app.forms import OddForm
from flask_login import current_user, login_required

odd_routes = Blueprint('odds', __name__)


@odd_routes.route('')
def all_odds(): 
    """
    Query for all odds on all available games
    """
    gameId = request.args.get('game_id')

    if gameId: 
        odds = Odd.query.filter_by(game_id = int(gameId)).all()
    else: 
        odds = Odd.query.all()
    return {'odds': [odd.to_dict() for odd in odds]}


@odd_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_odd(): 
    """
    Create a new odd for a specific game
    """

    print("POINT 1")
    form = OddForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    

    existing_odds = Odd.query.filter_by(
        game_id = form.data['game_id'],
        team_id = form.data['team_id'],
        type = form.data['type'],
        status = 'open'
    )
    print("EXISTING ODDS ======>", existing_odds)

    print("POINT 2")

    # Step 1: Validate
    if form.validate_on_submit(): 

        print("POINT 3")
        # Step 2: Deprecate all existing "live" odds

        
        # Only add in these changes if need be
        if existing_odds: 
            print("POINT 4")
            odd_to_update = existing_odds.update_all(status = 'closed')
            db.session.add(odd_to_update)
            db.session.commit()
            return odd_to_update.to_dict()

        print("POINT 5")

        # else:
        # Step 3: Create new odds
        new_odd = Odd(
            user_id=current_user.id,
            game_id=form.data['game_id'],
            team_id=form.data['team_id'],
            type=form.data['type'],
            value=form.data['value'],
            status="open"
        )

        db.session.add(new_odd)
        db.session.commit()

        # Step 4: Serialize to user
        return new_odd.to_dict()
    
    return form.errors, 401


