const LOAD_RESULTS = '/results/loadResults';
const ADD_RESULT = '/results/addResult';


const loadResults = (results) => ({
    type: LOAD_RESULTS, 
    results
}); 

const addResult = (result) => ({
    type: ADD_RESULT, 
    result
}); 


export const thunkLoadResults = () => async (dispatch) => {
    const response = await fetch('/api/results');
    if (response.ok) {
        const data = await response.json(); 
        return dispatch(loadResults(data));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 

export const thunkAddResult = (result) => async (dispatch) => {
    const response = await fetch('/api/results/new', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(result)
    }); 
    if (response.ok) {
        const newResult = await response.json();
        return dispatch(addResult(newResult));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 

// can only update result within 15 minutes of the game being over
export const thunkUpdateResult = (result, resultId) => async (dispatch) => {
    const response = await fetch(`/api/results/${resultId}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
    }); 
    if (response.ok) {
        const updatedResult = await response.json();
        return dispatch(addResult(updatedResult));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}; 


const initialState = {}; 

function resultsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_RESULTS: {
            const newState = { ...state };
            action.results.forEach((result) => {
                newState[result.id] = result;
            });
            return newState;
        }
        case ADD_RESULT: {
            const newState = { ...state }; 
            newState[action.result.id] = action.result;
            return newState;
        }
        default: 
            return state;
    }
}; 


export default resultsReducer;

