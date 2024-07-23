import { useDispatch, useSelector } from 'react-redux'; 
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { thunkLoadGame } from '../../redux/games';
import { thunkAddOdd } from '../../redux/games';

import './CreateOdd.css'; 

function AddOdd() {
    const { gameId } = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Pull the info from the games since we reload a smaller portion of information
    const allGames = useSelector(state => state.games.games); 
    const allTeams = useSelector(state => state.games.teams); 
    const allOdds = useSelector(state => state.games.odds);
    const currentUser = useSelector(state => state.session.user); 
    const currentGame = allGames?.find((game) => game.id == gameId); 
    const homeTeam = allTeams?.find((team) => team.id == currentGame?.homeTeamId); 
    const awayTeam = allTeams?.find((team) => team.id == currentGame?.awayTeamId); 
    const formattedDate = currentGame?.startTime.split(' ').slice(0, -2).join(' ');
    const formattedTime = new Date(currentGame?.startTime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}); 
    const homeTeamOdds = allOdds?.filter((odd) => odd.gameId == currentGame.id && odd.teamId == currentGame.homeTeamId); 
    const homeSpread = homeTeamOdds?.find((odd) => odd.type == 'spread'); 
    const homeTotals = homeTeamOdds?.find((odd) => odd.type == 'totals');
    const homeMoneyline = homeTeamOdds?.find((odd) => odd.type == 'moneyline');
    const awayTeamOdds = allOdds?.filter((odd) => odd.gameId == currentGame.id && odd.teamId == currentGame.awayTeamId); 
    const awaySpread = awayTeamOdds?.find((odd) => odd.type == 'spread');
    const awayTotals = awayTeamOdds?.find((odd) => odd.type == 'totals');
    const awayMoneyline = awayTeamOdds?.find((odd) => odd.type == 'moneyline');
    const [value, setValue] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [hasSubmitted, setHasSubmitted] = useState(false); 

    useEffect(() => {
        dispatch(thunkLoadGame(gameId));
    }, [dispatch]);


    useEffect(() => {
        const errors = {};
        if (value !== typeof('number')) errors.value = 'Input must only be a number'; 
        setErrors(errors); 
    }, [value]);


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setHasSubmitted(true);

        if (Object.values(errors).length > 0) {
            return;
        } else {
            const formData = new FormData(); 

            formData.append('user_id', currentUser.id)
            formData.append('game_id', gameId)
            formData.append('value', value)
        
            await dispatch(thunkAddOdd(formData)); 
            navigate(`/games/${gameId}`); 
        }
    }



    return (
        <div id='create-odds-container'>
            <h1>Add Odds</h1>
            <div id='odds-back-btn-games-container'>
                <div id='odds-back-to-games'>
                    <Link className='back-btn' to='/games'>Go back to Games</Link>
                </div>
                <div id='odds-game-container'>
                    <table className='game-table-header'>
                        <thead>
                            <tr>
                                <th className='table-header' style={{width:'34%', textAlign:'left', color:'#f76900'}}>GAME</th>
                                <th className='table-header' style={{width:'22%'}}>SPREAD</th>
                                <th className='table-header' style={{width:'22%'}}>TOTAL</th>
                                <th className='table-header' style={{width:'22%'}}>MONEYLINE</th>
                            </tr>
                        </thead>
                    </table>
                    <form onSubmit={handleSubmit}>
                        <table className='game-table-body'>
                            <tbody>
                                <tr>
                                    <td style={{width:'34%', fontSize:'12px'}}>{formattedDate}&nbsp;&nbsp;&mdash;&nbsp;&nbsp;{formattedTime}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo' src={homeTeam?.logo}/>{homeTeam?.name}</div></td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={homeSpread?.value}
                                            placeholder='enter spread'
                                            onChange={(e) => setValue(e.target.value)}
                                            contenteditable='true'
                                        >
                                        </input>
                                    </td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={homeTotals?.value}
                                            placeholder='enter totals'
                                            onChange={(e) => setValue(e.target.value)}
                                            contenteditable='true'
                                        >
                                        </input>
                                    </td>
                                    <td className='data-field-odds' contentEditable='true'>
                                        <input 
                                            value={homeMoneyline?.value}
                                            placeholder='enter moneyline'
                                            onChange={(e) => setValue(e.target.value)}
                                            
                                        >
                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo' src={awayTeam?.logo}/>{awayTeam?.name}</div></td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={awaySpread?.value}
                                            placeholder='enter spread'
                                            onChange={(e) => setValue(e.target.value)}
                                            contenteditable='true'
                                        >
                                        </input>
                                    </td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={awayTotals?.value}
                                            placeholder='enter totals'
                                            onChange={(e) => setValue(e.target.value)}
                                            contenteditable='true'
                                        >
                                        </input>
                                    </td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={awayMoneyline?.value}
                                            placeholder='enter moneyline'
                                            onChange={(e) => setValue(e.target.value)}
                                            contenteditable='true'
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div id='odds-submit-btn-container'>
                            <button id='submit-odds-btn' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}


export default AddOdd;