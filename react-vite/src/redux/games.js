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


export const thunkLoadGames = () => async (dispatch) => {
    const response = await fetch('/api/games'); 
    if (response.ok) {
        const data = await response.json(); 
        return dispatch(loadGames(data));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 

export const thunkAddGame = (game) => async (dispatch) => {
    const response = await fetch('/api/games/new', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
    }); 
    if (response.ok) {
        const newGame = await response.json(); 
        return dispatch(addGame(newGame));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 

export const thunkUpdateGame = (game, gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
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
            const newState = { ...state };
            action.games.forEach((game) => {
                newState[game.id] = game;
            });
            return newState;
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
};


export default gamesReducer;
