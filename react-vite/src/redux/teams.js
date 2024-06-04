const LOAD_TEAMS = 'teams/loadTeams';
const ADD_TEAM = 'teams/addTeam';
const DELETE_TEAM = 'teams/deleteTeam';


const loadTeams = (teams) => ({
    type: LOAD_TEAMS,
    teams
});

const addTeam = (team) => ({
    type: ADD_TEAM,
    team
});

const deleteTeam = (teamId) => ({
    type: DELETE_TEAM,
    teamId
}); 


export const thunkLoadTeams = () => async (dispatch) => {
    const response = await fetch('/api/teams');
    if (response.ok) {
        const data = await response.json();
        return dispatch(loadTeams(data));
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
};

export const thunkAddTeam = (team) => async (dispatch) => {
    const response = await fetch('/api/teams/new', {
        method: 'POST', 
        body: team
    });
    if (response.ok) {
        const { newTeam } = await response.json();
        return dispatch(addTeam(newTeam)); 
    } else {
        return { server: 'Something went wrong. Please try again'}
    }
};

export const thunkUpdateTeam = (team, teamId) => async (dispatch) => {
    const response = await fetch(`/api/teams/${teamId}/update`, {
        method: 'POST',
        body: team
    }); 
    if (response.ok) {
        const { updatedTeam } = await response.json();
        return dispatch(addTeam(updatedTeam)); 
    } else {
        return { server: 'Something went wrong. Please try again'}
    }
}; 

export const thunkDeleteTeam = (teamId) => async (dispatch) => {
    const response = await fetch(`/api/teams/${teamId}/delete`);
    if (response.ok) {
        return dispatch(deleteTeam(teamId)); 
    } else {
        return { server: 'Something went wrong. Please try again'}
    }
};


const initialState = {}

function teamsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_TEAMS: {
            return { ...state, ...action.teams }
            // const newState = { ...state };
            // action.teams.forEach((team) => {
            //     newState[team.id] = team;
            // });
            // return newState;
        }
        case ADD_TEAM: {
            return { ...state , ...action.team }; 
        }
        case DELETE_TEAM : {
            const newState = { ...state };
            delete newState[action.teamId];
            return newState;
        }
        default: 
            return state; 
    }
}

export default teamsReducer;

