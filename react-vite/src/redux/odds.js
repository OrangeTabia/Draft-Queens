const LOAD_ODDS = 'odds/loadOdds'; 
const ADD_ODD = 'odds/addOdd'; 

const loadOdds = (odds) => ({
    type: LOAD_ODDS,
    odds
}); 

const addOdd = (odd) => ({
    type: ADD_ODD,
    odd
});


export const thunkLoadOdds = () => async (dispatch) => {
    const response = await fetch('/api/odds'); 
    if (response.ok) {
        const data = await response.json(); 
        return dispatch(loadOdds(data)); 
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 

export const thunkAddOdd = (odd) => async (dispatch) => {
    const response = await fetch('/api/odds/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

function oddsReducer(state = initialState, action) {
     switch (action.type) {
        case LOAD_ODDS: {
            const newState = { ...state };
            action.odds.forEach((odd) => {
                newState[odd.id] = odd;
            });
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


export default oddsReducer;