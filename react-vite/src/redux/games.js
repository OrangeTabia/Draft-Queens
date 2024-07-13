const LOAD_GAMES = 'games/loadGames';
const LOAD_GAME = 'games/loadGame';
const ADD_GAME = 'games/addGame';
const DELETE_GAME = 'games/deleteGame'; 
const ADD_ODD = 'games/addOdd';


const loadGames = (games) => ({
    type: LOAD_GAMES, 
    games
});

const loadGame = (game) => ({
    type: LOAD_GAME,
    game
});

const addGame = (game) => ({
    type: ADD_GAME,
    game
});

const deleteGame = (gameId) => ({
    type: DELETE_GAME, 
    gameId
});

const addOdd = (odd) => ({
    type: ADD_ODD,
    odd
})


export const thunkLoadGames = (page, size, sportType) => async (dispatch) => {
    // Add these page + size in as a URL parameter
    const response = await fetch('/api/games?' + new URLSearchParams({sportType, page, size})); 
    if (response.ok) {
        const data = await response.json(); 
        return dispatch(loadGames(data));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 

export const thunkLoadGame = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`); 
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadGame(data));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}

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

export  const thunkAddOdd = (odd) => async (dispatch) => {
    const response = await fetch(`/api/games/${odd.gameId}/odds`, {
        method: 'POST',
        headers: { 'Content-Type': 'appliction/json' },
        body: JSON.stringify(odd)
    }); 
    if (response.ok) {
        const newOdd = await response.json(); 
        return dispatch(addOdd(newOdd)); 
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
                sportType: action.games.sportType
            }; 
        }
        case LOAD_GAME: {
            // Set both the games and teams within the games so that we may use this 
            // for the purposes of understanding and editing an individual odd
            return { ...state, 
                games: [...action.game.games],
                teams: [...action.game.teams]
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
        case ADD_ODD: {
            const newState = { ...state };
            newState[action.odd.id] = action.odd;
            return newState;
        }
        default: 
            return state;
    }
}


export default gamesReducer;
