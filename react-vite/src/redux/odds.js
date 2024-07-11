const LOAD_ODDS = 'odds/loadOdds'; 

const loadOdds = (odds) => ({
    type: LOAD_ODDS,
    odds
}); 


export const thunkLoadOdds = (gameIds) => async (dispatch) => {
    const response = await fetch('/api/odds?' + new URLSearchParams({gameIds})); 
    if (response.ok) {
        const data = await response.json(); 
        return dispatch(loadOdds(data)); 
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 


const initialState = {};

function oddsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ODDS: {
            const newState = { ...state, 
                odds: [...action.odds.odds]
            };
            return newState;
        }
        default: 
            return state;
    }
}


export default oddsReducer;