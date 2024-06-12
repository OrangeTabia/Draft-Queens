from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_games():

    game1 = Game(
        user_id=1,
        home_team_id=1,
        away_team_id=6,
        start_time=datetime(2024, 5, 26, 1, 0)
    )

    game2 = Game(
        user_id=1,
        home_team_id=2,
        away_team_id=5,
        start_time=datetime(2024, 5, 31, 2, 0)
    )

    game3 = Game(
        user_id=1,
        home_team_id=3,
        away_team_id=4,
        start_time=datetime(2024, 5, 28, 3, 0)
    )

    game4 = Game(
        user_id=1,
        home_team_id=5,
        away_team_id=1,
        start_time=datetime(2024, 6, 1, 4, 0)
    )

    game5 = Game(
        user_id=1,
        home_team_id=4,
        away_team_id=6,
        start_time=datetime(2024, 6, 2, 5, 0)
    )

    game6 = Game(
        user_id=1,
        home_team_id=3,
        away_team_id=2,
        start_time=datetime(2024, 5, 29, 6, 0)
    )

    game7 = Game(
        user_id=1,
        home_team_id=1,
        away_team_id=4,
        start_time=datetime(2024, 6, 4, 7, 0)
    )

    game8 = Game(
        user_id=1,
        home_team_id=5,
        away_team_id=3,
        start_time=datetime(2024, 6, 5, 8, 0)
    )

    game9 = Game(
        user_id=1,
        home_team_id=6,
        away_team_id=2,
        start_time=datetime(2024, 6, 5, 9, 0)
    )

    game10 = Game(
        user_id=2,
        home_team_id=7,
        away_team_id=8,
        start_time=datetime(2024, 7, 1, 10, 0)
    )

    game11 = Game(
        user_id=2,
        home_team_id=1,
        away_team_id=14,
        start_time=datetime(2024, 7, 2, 11, 0)
    )

    game12 = Game(
        user_id=2,
        home_team_id=2,
        away_team_id=13,
        start_time=datetime(2024, 7, 3, 12, 0)
    )

    game13 = Game(
        user_id=2,
        home_team_id=3,
        away_team_id=12,
        start_time=datetime(2024, 7, 5, 13, 0)
    )

    game14 = Game(
        user_id=2,
        home_team_id=4,
        away_team_id=11,
        start_time=datetime(2024, 7, 6, 14, 0)
    )

    game15 = Game(
        user_id=2,
        home_team_id=5,
        away_team_id=10,
        start_time=datetime(2024, 7, 7, 15, 0)
    )

    game16 = Game(
        user_id=2,
        home_team_id=6,
        away_team_id=9,
        start_time=datetime(2024, 7, 8, 16, 0)
    )

    game17 = Game(
        user_id=2,
        home_team_id=7,
        away_team_id=8,
        start_time=datetime(2024, 7, 9, 17, 0)
    )

    game18 = Game(
        user_id=2,
        home_team_id=2,
        away_team_id=14,
        start_time=datetime(2024, 7, 10, 18, 0)
    )

    game19 = Game(
        user_id=2,
        home_team_id=3,
        away_team_id=13,
        start_time=datetime(2024, 7, 11, 19, 0)
    )

    game20 = Game(
        user_id=2,
        home_team_id=4,
        away_team_id=12,
        start_time=datetime(2024, 7, 5, 20, 0)
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
    db.session.add(game10)
    db.session.add(game11)
    db.session.add(game12)
    db.session.add(game13)
    db.session.add(game14)
    db.session.add(game15)
    db.session.add(game16)
    db.session.add(game17)
    db.session.add(game18)
    db.session.add(game19)
    db.session.add(game20)
    db.session.commit()



def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))
        
    db.session.commit()