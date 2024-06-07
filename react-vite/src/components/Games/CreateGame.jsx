import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { thunkAddGame } from '../../redux/games';
import { thunkLoadTeams } from '../../redux/teams';
import fanswapAd from '../../../images/fanswap-longer.png';
import draftQueensAd from '../../../images/draftqueens-longer.png'; 
import './CreateGame.css'; 


function AddGame() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const [homeTeam, setHomeTeam] = useState(''); 
    const [awayTeam, setAwayTeam] = useState('');
    const [startTime, setStartTime] = useState('');
    const [errors, setErrors] = useState({}); 
    const [hasSubmitted, setHasSubmitted] = useState(false); 
    const teamList = useSelector(state => state.teams.teams);

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

        const newGame = {
            homeTeam,
            awayTeam,
            startTime
        }
        await dispatch(thunkAddGame(newGame)); 
        navigate('/games');
    }

    // Getting the current date and time in order to use it as a minimum datetime for form input
    // Users will not be able to create a game before the current day/time
    const today = (new Date(Date.now())).toISOString().split('.')[0]; // "2024-06-04T19:43:24.215Z"
    // properly formatting the mininum date in order to properly work in the form
    const formattedDate = today.split(':').slice(0, -1).join(':'); // "2024-06-04T19:43"


    if (teamList) {
        return (
            <div className='create-container'>
                <h1>Create a Game</h1>
                <div className='create-form-container'>
                    <div><a href='https://draft-queens.onrender.com' target='_blank' rel='noreferrer'><img src={draftQueensAd} alt='draftqueens-ad'/></a></div>
                    <form
                        className='create-form'
                        onSubmit={handleSubmit}
                        >
                        <div className='form-input'>
                            <label>Home Team</label>
                            <select
                                className='select'
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
                        <div className='form-input'>
                            <label>Away Team</label>
                            <select
                                className='select'
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
                        <div className='form-input'>
                            <label>Game Date and Time</label>
                            <input
                                className='select'
                                type='datetime-local'
                                value={startTime} 
                                min={formattedDate}
                                onChange={(e) => setStartTime(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-errors'>{hasSubmitted && errors.startTime}</div>
                        <button className='form-button' type='submit'>Create Game</button>
                    </form>
                    <div><a href='https://fanswap.onrender.com/' target='_blank' rel='noreferrer'><img src={fanswapAd} alt='fanswap-ad'/></a></div>
                </div>
            </div>
        )
    }
}

export default AddGame;