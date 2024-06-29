const LOAD_GAMES = 'games/loadGames';
const ADD_GAME = 'games/addGame';
const DELETE_GAME = 'games/deleteGame'; 


const loadGames = (games) => ({
    type: LOAD_GAMES, 
    games
}); 

const addGame = (game) => ({
    type: ADD_GAME,
    game
});

const deleteGame = (gameId) => ({
    type: DELETE_GAME, 
    gameId
});


export const thunkLoadGames = (page, size) => async (dispatch) => {
    // Add these page + size in as a URL parameter
    const response = await fetch('/api/games?' + new URLSearchParams({page, size})); 
    if (response.ok) {
        const data = await response.json(); 
        return dispatch(loadGames(data));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 

export const thunkAddGame = (game) => async (dispatch) => {
    const gamePaylod = {
        home_team_id: game.homeTeam,
        away_team_id: game.awayTeam,
        start_time: game.startTime.replace('T', ' ')
    }

    const response = await fetch('/api/games/new', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gamePaylod)
    }); 
    if (response.ok) {
        const newGame = await response.json(); 
        return dispatch(addGame(newGame));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 

export const thunkUpdateGame = (game, gameId) => async (dispatch) => {
    const gamePaylod = {
        home_team_id: game.homeTeam,
        away_team_id: game.awayTeam,
        start_time: game.startTime.replace('T', ' ')
    }
    const response = await fetch(`/api/games/${gameId}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gamePaylod)
    }); 
    if (response.ok) {
        const updatedGame = await response.json();
        return dispatch(addGame(updatedGame)); 
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 

export const thunkDeleteGame = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}/delete`); 
    if (response.ok) {
        return dispatch(deleteGame(gameId));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 


const initialState = {};

function gamesReducer(state = initialState, action) {
    switch (action.type) {
    
        case LOAD_GAMES: {
            return { ...state, 
                games: [...action.games.games.sort((game1, game2) => {
                    if (Date.parse(game1.startTime) < Date.parse(game2.startTime)) {
                        return 1
                    } else {
                        return -1
                    }
                })],
                totalGames: action.games.total_games,
            }; 
        }
        case ADD_GAME: {
            const newState = { ...state };
            newState[action.game.id] = action.game;
            return newState;
        }
        case DELETE_GAME: {
            const newState = { ...state }; 
            delete newState[action.gameId];
            return newState;
        }
        default: 
            return state;
    }
}


export default gamesReducer;
