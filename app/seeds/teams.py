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

    team7 = Team(
        user_id=1,
        name='Dallas Wings',
        sport_type='basketball',
        location='Dallas',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/dallas-wings.png'
    )

    team8 = Team(
        user_id=1,
        name='Las Vegas Aces',
        sport_type='basketball',
        location='Las Vegas',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/vegas-aces.png'
    )

    team9 = Team(
        user_id=1,
        name='Los Angeles Sparks',
        sport_type='basketball',
        location='Los Angeles',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/la-sparks.png'
    )

    team10 = Team(
        user_id=1,
        name='Minnesota Lynx',
        sport_type='basketball',
        location='Minnesota',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/minnesota-lynx.png'
    )

    team11 = Team(
        user_id=1,
        name='Phoenix Mercury',
        sport_type='basketball',
        location='Phoenix',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/phoenix-mercury.png'
    )

    team12 = Team(
        user_id=1,
        name='Seattle Storm',
        sport_type='basketball',
        location='Seattle',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/seattle-storm.png'
    )


    team13 = Team(
        user_id=2,
        name='Angel City FC',
        sport_type='soccer',
        location='Los Angeles',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/angel-city-fc.svg'
    )

    team14 = Team(
        user_id=2,
        name='Bay FC',
        sport_type='soccer',
        location='San Francisco',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/bay-fc.svg'
    )

    team15 = Team(
        user_id=2,
        name='Chicago Red Stars',
        sport_type='soccer',
        location='Chicago',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/chicago-red-stars.svg'
    )

    team16 = Team(
        user_id=2,
        name='Houston Dash',
        sport_type='soccer',
        location='Houston',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/houston-dash.svg'
    )

    team17 = Team(
        user_id=2,
        name='Kansas City Current',
        sport_type='soccer',
        location='Kansas City',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/kansas-city-current.svg'
    )

    team18 = Team(
        user_id=2,
        name='Gotham FC',
        sport_type='soccer',
        location='New York',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/nj-ny-gotham-fc.svg'
    )

    team19 = Team(
        user_id=2,
        name='North Carolina Courage',
        sport_type='soccer',
        location='North Carolina',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/north-carolina-courage.svg'
    )

    team20 = Team(
        user_id=2,
        name='Orlando Pride',
        sport_type='soccer',
        location='Orlando',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/orlando-pride.svg'
    )

    team21 = Team(
        user_id=2,
        name='Portland Thorns FC',
        sport_type='soccer',
        location='Portland',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/portland-thorns-fc.svg'
    )

    team22 = Team(
        user_id=2,
        name='Racing Louisville FC',
        sport_type='soccer',
        location='Louisville',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/racing-louisville-fc.svg'
    )

    team23 = Team(
        user_id=2,
        name='San Diego Wave FC',
        sport_type='soccer',
        location='San Diego',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/san-diego-wave-fc.svg'
    )

    team24 = Team(
        user_id=2,
        name='Seattle Reign',
        sport_type='soccer',
        location='Seattle',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/seattle-reign.svg'
    )

    team25 = Team(
        user_id=2,
        name='Utah Royals RC',
        sport_type='soccer',
        location='Utah',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/utah-royals-fc.svg'
    )

    team26 = Team(
        user_id=2,
        name='Washington Spirit',
        sport_type='soccer',
        location='Washington D.C.',
        logo='https://draft-queens-logo-images.s3.amazonaws.com/washington-spirit.svg'
    )

    db.session.add(team1)
    db.session.add(team2)
    db.session.add(team3)
    db.session.add(team4)
    db.session.add(team5)
    db.session.add(team6)
    db.session.add(team7)
    db.session.add(team8)
    db.session.add(team9)
    db.session.add(team10)
    db.session.add(team11)
    db.session.add(team12)
    db.session.add(team13)
    db.session.add(team14)
    db.session.add(team15)
    db.session.add(team16)
    db.session.add(team17)
    db.session.add(team18)
    db.session.add(team19)
    db.session.add(team20)
    db.session.add(team21)
    db.session.add(team22)
    db.session.add(team23)
    db.session.add(team24)
    db.session.add(team25)
    db.session.add(team26)
    db.session.commit()




def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))
        
    db.session.commit()
