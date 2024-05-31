from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text


def seed_teams(): 

    team1 = Team(
        user_id=1, 
        name='Atlanta Dream',
        sport_type='basketball',
        location='Atlanta',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/atlanta-dream.png'
    )

    team2 = Team(
        user_id=1, 
        name='Chicago Sky',
        sport_type='basketball',
        location='Chicago',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/chicaco-sky.png'
    )

    team3 = Team(
        user_id=1, 
        name='Connecticut Sun',
        sport_type='basketball',
        location='Connecticut',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/connecticut-sun.png'
    )

    team4 = Team(
        user_id=1, 
        name='Indiana Fever',
        sport_type='basketball',
        location='Indiana',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/indiana-fever.png'
    )

    team5= Team(
        user_id=1, 
        name='New York Liberty',
        sport_type='basketball',
        location='New York',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/newyork-liberty.png'
    )

    team6 = Team(
        user_id=1, 
        name='Washington Mystics',
        sport_type='basketball',
        location='Washington',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/washington-mystics.png'
    )

    db.sesion.add(team1)
    db.sesion.add(team2)
    db.sesion.add(team3)
    db.sesion.add(team4)
    db.sesion.add(team5)
    db.sesion.add(team6)
    db.session.commit()




def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))
        
    db.session.commit()
