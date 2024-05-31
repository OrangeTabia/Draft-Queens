from app.models import db, Result, environment, SCHEMA
from sqlalchemy.sql import text


def seed_results(): 

    result1 = Result(
        user_id=1,
        game_id=1,
        home_team_score=70,
        away_team_score=47,
    )

    result2 = Result(
        user_id=1,
        game_id=2,
        home_team_score=88,
        away_team_score=82,
    )

    result3 = Result(
        user_id=1,
        game_id=3,
        home_team_score=77,
        away_team_score=68,
    )

    result4 = Result(
        user_id=1,
        game_id=4,
        home_team_score=79,
        away_team_score=81,
        notes='OT'
    )

    result5 = Result(
        user_id=1,
        game_id=5,
        home_team_score=80,
        away_team_score=66,
    )

    result6 = Result(
        user_id=1,
        game_id=6,
        home_team_score=103,
        away_team_score=88,
    )

    result7 = Result(
        user_id=1,
        game_id=7,
        home_team_score=83,
        away_team_score=73,
    )

    result8 = Result(
        user_id=1,
        game_id=8,
        home_team_score=92,
        away_team_score=79,
    )

    result9 = Result(
        user_id=1,
        game_id=9,
        home_team_score=84,
        away_team_score=84,
        notes='2OT'
    )

    db.session.add(result1)
    db.session.add(result2)
    db.session.add(result3)
    db.session.add(result4)
    db.session.add(result5)
    db.session.add(result6)
    db.session.add(result7)
    db.session.add(result8)
    db.session.add(result9)
    db.session.commit()



def undo_results():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.results RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM results"))
        
    db.session.commit()


