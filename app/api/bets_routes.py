from flask import Blueprint, request
from app.models import db, Bet
from app.forms import BetForm
from flask_login import current_user, login_required

bets_routes = Blueprint('bets', __name__)


@bets_routes.route('')
@login_required
def all_bets(): 
    """
    Query for all bets made
    """
    bets = Bets.query.all()
    return {'bets': [bet.to_dict() for bet in bets]}


@bets_routes.route('/new', methods=['GET', 'POST'])
@login_required
def place_bet(): 
    """
    Places a bet on a specified odd
    """

    