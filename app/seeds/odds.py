from app.models import db, Odd, environment, SCHEMA
from sqlalchemy.sql import text

def seed_odds(): 

    odd1_game1 = Odd(
        user_id=1,
        game_id=1,
        team_id=1,
        type='moneyline',
        value=-355,
        status='closed',
    )

    odd2_game1 = Odd(
        user_id=1,
        game_id=1,
        team_id=6,
        type='moneyline',
        value=280,
        status='closed',
    )

    odd3_game2 = Odd(
        user_id=1,
        game_id=2,
        team_id=2,
        type='spread',
        value=-8,
        status='open',
    )

    odd4_game2 = Odd(
        user_id=1,
        game_id=2,
        team_id=5,
        type='spread',
        value=8,
        status='open',
    )

    odd5_game3 = Odd(
        user_id=1,
        game_id=3,
        type='totals',
        value=171,
        status='closed',
    )

    odd6_game4 = Odd(
        user_id=1,
        game_id=4,
        type='totals',
        value=171,
        status='open',
    )

    odd7_game5 = Odd(
        user_id=1,
        game_id=5,
        team_id=4,
        type='moneyline',
        value=-375,
        status='open',
    )

    odd8_game5 = Odd(
        user_id=1,
        game_id=5,
        team_id=6,
        type='moneyline',
        value=295,
        status='open',
    )

    odd9_game6 = Odd(
        user_id=1,
        game_id=5,
        team_id=3,
        type='spread',
        value=-15,
        status='closed',
    )

    odd10_game6 = Odd(
        user_id=1,
        game_id=5,
        team_id=2,
        type='spread',
        value=15,
        status='closed',
    )

    db.session.add(odd1_game1)
    db.session.add(odd2_game1)
    db.session.add(odd3_game2)
    db.session.add(odd4_game2)
    db.session.add(odd5_game3)
    db.session.add(odd6_game4)
    db.session.add(odd7_game5)
    db.session.add(odd8_game5)
    db.session.add(odd9_game6)
    db.session.add(odd10_game6)
    db.session.commit()



def undo_odds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.odds RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM odds"))
        
    db.session.commit()