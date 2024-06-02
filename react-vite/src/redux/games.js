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

