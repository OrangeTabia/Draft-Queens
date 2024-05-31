from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_games():

    game1 = Game(
        user_id=1,
        home_team_id=1,
        away_team_id=6,
        start_time=datetime(2024, 5, 26, 6, 0, 0)
    )

    game2 = Game(
        user_id=1,
        home_team_id=2,
        away_team_id=5,
        start_time=datetime(2024, 5, 31, 6, 0, 0)
    )

    game3 = Game(
        user_id=1,
        home_team_id=3,
        away_team_id=4,
        start_time=datetime(2024, 5, 28, 6, 0, 0)
    )

    game4 = Game(
        user_id=1,
        home_team_id=5,
        away_team_id=1,
        start_time=datetime(2024, 6, 1, 6, 0, 0)
    )

    game5 = Game(
        user_id=1,
        home_team_id=4,
        away_team_id=6,
        start_time=datetime(2024, 6, 2, 6, 0, 0)
    )

    game6 = Game(
        user_id=1,
        home_team_id=3,
        away_team_id=2,
        start_time=datetime(2024, 5, 29, 6, 0, 0)
    )

    game7 = Game(
        user_id=1,
        home_team_id=1,
        away_team_id=4,
        start_time=datetime(2024, 6, 4, 6, 0, 0)
    )

    game8 = Game(
        user_id=1,
        home_team_id=5,
        away_team_id=3,
        start_time=datetime(2024, 6, 5, 6, 0, 0)
    )

    game9 = Game(
        user_id=1,
        home_team_id=6,
        away_team_id=2,
        start_time=datetime(2024, 6, 5, 6, 0, 0)
    )

    db.session.add(game1)
    db.session.add(game2)
    db.session.add(game3)
    db.session.add(game4)
    db.session.add(game5)
    db.session.add(game6)
    db.session.add(game7)
    db.session.add(game8)
    db.session.add(game9)
    db.session.commit()



def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))
        
    db.session.commit()