# DraftQueens 
DraftQueens is inspired by sports betting website 'DraftKings'. DraftQueens focuses on professional and amateur female sports such as the WNBA and the NWSL. At the moment, the site offers book keepers the ability to create teams, games, odds for each game, and results for each game. Eventually, there will be user roles for both betters and book keepers to bet on games and create games, respectively. 


# Live Link
https://draft-queens.onrender.com/


# Tech Stack

### Frameworks and Libraries
Python, Flask, JavaScript, React, Redux, CSS3, HTML5

### Database: 
Postgres

### Hosting: 
Render


# Index
[Features List](https://github.com/OrangeTabia/Draft-Queens/wiki/MVP-Features-List) | [Database Schema](https://github.com/OrangeTabia/Draft-Queens/wiki/Database-Schema) | [User Stories](https://github.com/OrangeTabia/Draft-Queens/wiki/User-Stories) | [Wireframes](https://github.com/OrangeTabia/Draft-Queens/wiki/Wireframes)


# Landing Page


# Teams

# Games
- pic or video of games page


# Endpoints

## Auth
### Log In User
- Method: `POST`
- URL: `/api/auth/login`
- Body: 
```json
{
    "email": "demo1@gmail.com",
    "password": "password"
}
```
- Successful Response: 
```json
{
    "id": 1,
    "username": "DemoUser1", 
    "email": "demo1@gmail.com"
}
```

## Teams

### Create a Team
- Method: `POST`
- URL: `/api/teams/new`
- Body: 
```json
{
    "name": "Golden State Valkyries",
    "sport_type": "basketball",
    "location": "San Francisco",
    "logo": "https://images.prismic.io/wnba/ZjVrS0MTzAJOCh36_gsv-logo-menu.png"
}
```
- Successful Response: 
```json
{
    "id": 1, 
    "user_id": 1, 
    "name": "Golden State Valkyries",
    "sportType": "basketball",
    "location": "San Francisco",
    "logo": "https://images.prismic.io/wnba/ZjVrS0MTzAJOCh36_gsv-logo-menu.png"
}
```
### View All Teams
- Method: `GET`
- URL: `/api/teams`
- Body: none
- Successful Response: 
```json
{
    "teams": [
        {
            "id": 1, 
            "user_id": 1, 
            "name": "Golden State Valkyries",
            "sportType": "basketball",
            "location": "San Francisco",
            "logo": "https://images.prismic.io/wnba/ZjVrS0MTzAJOCh36_gsv-logo-menu.png"
        }
    ]
}
```
### Update a Team
- Method: `POST`
- URL: `/api/teams/:teamId/update`
- Body: 
```json
{
    "name": "Golden State Valkyries",
    "sport_type": "basketball",
    "location": "San Francisco",
    "logo": "https://images.prismic.io/wnba/ZjVrS0MTzAJOCh36_gsv-logo-menu.png"
}
```
- Successful Response: 
```json
{
    "id": 1, 
    "user_id": 1, 
    "name": "Golden State Valkyries",
    "sportType": "basketball",
    "location": "San Francisco",
    "logo": "https://images.prismic.io/wnba/ZjVrS0MTzAJOCh36_gsv-logo-menu.png"
}
```
### Delete a Team
- Method: `GET`
- URL: `/api/teams/:teamId/delete`
- Body: none
- Successful Response: 
```json
{
    "message": "Team has been successfully deleted"
}
```

## Games
### Create a Game
- Method: `POST`,
- URL: `/api/games/new`,
- Body: 
```json
{
    "home_team_id": 1,
    "away_team_id": 2,
    "start_time": "2024-07-04 12:00"
}
```
- Successful Response: 
```json
{
    "id": 21,
    "userId": 1,
    "homeTeamId": 1,
    "awayTeamId": 2,
    "startTime": "Thu, 04 Jul 2024 12:00:00 GMT"
}
```
### View All Games
- Method: `GET`
- URL: `/api/games`
- Body: none
- Successful Response: 
```json
{
    "id": 3,
    "userId": 1,
    "awayTeamId": 4,
    "homeTeamId": 3,
    "startTime": "Tue, 28 May 2024 03:00:00 GMT"
}
```
### Update a Game
- Method: `POST`
- URL: `/api/games/:gameId/update`
- Body: 
```json
{
    "home_team_id": 1,
    "away_team_id": 2,
    "start_time": "2024-07-04 12:00"
}
```
- Successful Response: 
```json
{
    "games": [
        {
            "id": 3,
            "userId": 1,
            "awayTeamId": 4,
            "homeTeamId": 3,
            "startTime": "Tue, 28 May 2024 03:00:00 GMT"
        }
    ]
}
```
### Delete a Game
- Method: `GET`
- URL: `/api/games/:gameId/delete`
- Body: none
- Successful Response: 
```json
{
    "message": "Game has been successfully deleted"
}
```

## Odds

### Create an Odd
- Method: `POST`
- URL: `/api/odds/new`
- Body: 
```json
{
    "game_id": 18,
    "team_id": 14,
    "type": "moneyline",
    "value": -200,
    "status": "open"
}
```
- Successful Response:
```json
{
    "gameId": 18,
    "id": 11,
    "status": "open",
    "teamId": 14,
    "type": "moneyline",
    "userId": 1,
    "value": -200
}
```
### View all Odds
- Method: `POST`
- URL: `/api/odds`
- Body: none
- Successful Response:
```json
{
    "odds": [
        {
            "gameId": 2,
            "id": 3,
            "status": "open",
            "teamId": 2,
            "type": "spread",
            "userId": 1,
            "value": -8
        },
        {
            "gameId": 5,
            "id": 7,
            "status": "open",
            "teamId": 4,
            "type": "moneyline",
            "userId": 1,
            "value": -375
        }
    ]
}
```

## Results

### Create a Result
- Method: `POST`
- URL: `/api/results/new`
- Body: 
```json
{
    "user_id": 2,
    "game_id": 18,
    "home_team_score": 1,
    "away_team_score": 5
}
```
- Successful Response: 
```json
{
    "awayTeamScore": 5,
    "gameId": 18,
    "homeTeamScore": 1,
    "id": 10,
    "notes": null,
    "userId": 1
}
```
### View all Results
- Method: `GET`
- URL: `/api/results`
- Body: none
- Successful Response: 
```json
{
     "results": [
        {
            "id": 2,
            "userId": 1,
            "gameId": 2,
            "homeTeamScore": 88,
            "awayTeamScore": 82,
            "notes": null
        },
        {
            "id": 9,
            "userId": 1,
            "gameId": 9,
            "homeTeamScore": 86,
            "awayTeamScore": 84,
            "notes": "2OT"
        }
    ]
}
```

# Feature List
1. Teams
2. Games
3. Odds
4. Results

# Future Implementation Goals
1. User role for 'betters' 
2. API for live games
3. Betters can make single game bets or parlays
4. Betters can join groups with friends and see each others' bets

# Connect
[LinkedIn](https://www.linkedin.com/in/tabiaye/)

