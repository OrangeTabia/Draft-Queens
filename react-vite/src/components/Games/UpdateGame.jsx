import { useDispatch, useSelector } from 'react-redux'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { thunkUpdateGame } from '../../redux/games';
import { thunkLoadTeams } from '../../redux/teams';


function UpdateGame() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const { gameId } = useParams(); 
    const games = useSelector(state => state.games.games);
    const selectedGame = games?.find((game) => game.id == gameId); 
    const [homeTeam, setHomeTeam] = useState(selectedGame?.homeTeamId); 
    const [awayTeam, setAwayTeam] = useState(selectedGame?.awayTeamId);
    const [errors, setErrors] = useState({}); 
    const [hasSubmitted, setHasSubmitted] = useState(false); 
    const teamList = useSelector(state => state.teams.teams);

    // changed date format from Sun, 02 Jun 2024 06:00:00 GMT to 2024-05-26T06:00:00.000Z
    const currentDateInForm = new Date(selectedGame?.startTime).toJSON(); 
    // need to change to date to "2024-06-04T19:43"
    const formattedDateInForm = currentDateInForm.split(':').slice(0, -1).join(':');
    const [startTime, setStartTime] = useState(formattedDateInForm); 

    useEffect(() => {
        dispatch(thunkLoadTeams());
    }, [dispatch]); 

    
    useEffect(() => {
        const errors = {}; 
        if (!homeTeam) errors.homeTeam = 'Both teams are required'; 
        if (!awayTeam) errors.awayTeam = 'Both teams are required'; 
        if (homeTeam == awayTeam) errors.homeTeam = 'Teams cannot play themselves';
        if (awayTeam == homeTeam) errors.awayTeam = 'Teams cannot play themselves'; 
        if (!startTime) errors.startTime = 'Game start time is required';
        setErrors(errors);
    }, [homeTeam, awayTeam, startTime]); 

    const handleSubmit = async(e) => {
        e.preventDefault(); 

        setHasSubmitted(true);

        const updatedGame = {
            homeTeam,
            awayTeam,
            startTime
        }
        await dispatch(thunkUpdateGame(updatedGame, gameId)); 
    }

    // Getting the current date and time in order to use it as a minimum datetime for form input
    // Users will not be able to create a game before the current day/time
    const today = (new Date(Date.now())).toISOString().split('.')[0]; // "2024-06-04T19:43:24.215Z"
    // properly formatting the mininum date in order to properly work in the form
    const formattedDate = today.split(':').slice(0, -1).join(':'); // "2024-06-04T19:43"


    if (teamList) {
        return (
            <>
                <h1>Edit A Game Form</h1>
                <form
                    onSubmit={handleSubmit}
                    >
                    <div>
                        <label>Team 1:</label>
                        <select
                            id='home-team'
                            value={homeTeam}
                            onChange={(e) => setHomeTeam(e.target.value)}
                        >
                            <option value={''} selected disabled>Select a team</option>
                            {teamList.map((team) => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-errors'>{hasSubmitted && errors.homeTeam}</div>
                    <div>
                        <label>Team 2:</label>
                        <select
                            id='away-team'
                            value={awayTeam}
                            onChange={(e) => setAwayTeam(e.target.value)}
                        >
                            <option value={''} selected disabled>Select a team</option>
                            {teamList.map((team) => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-errors'>{hasSubmitted && errors.awayTeam}</div>
                    <div>
                        <label>Game Start Time:</label>
                        <input
                            id='game-start'
                            type='datetime-local'
                            value={startTime} 
                            min={formattedDate}
                            onChange={(e) => setStartTime(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className='form-errors'>{hasSubmitted && errors.startTime}</div>
                    <button type='submit'>Create Game</button>
                </form>
            </>
        )
    }
}

export default UpdateGame;