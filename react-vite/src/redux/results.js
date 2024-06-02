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


