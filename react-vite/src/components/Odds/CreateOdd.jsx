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

    const [errors, setErrors] = useState({}); 
    const [hasSubmitted, setHasSubmitted] = useState(false); 

    useEffect(() => {
        dispatch(thunkLoadGame(gameId));
    }, [dispatch]);


    const [homeSpreadOdd, setHomeSpreadOdd] = useState(homeSpread?.value);
    const [homeTotalsOdd, setHomeTotalsOdd] = useState(homeTotals?.value);
    const [homeMoneylineOdd, setHomeMoneyLineOdd] = useState(homeMoneyline?.value);
    const [awaySpreadOdd, setAwaySpreadOdd] = useState(awaySpread?.value);
    const [awayTotalsOdd, setAwayTotalsOdd] = useState(awayTotals?.value); 
    const [awayMoneylineOdd, setAwayMoneylineOdd] = useState(awayMoneyline?.value);
    
    // Since our state management needs work, let's just reset these values when we properly render the odds
    useEffect(() => { 
        setHomeSpreadOdd(homeSpread?.value);
        setHomeTotalsOdd(homeTotals?.value);
        setHomeMoneyLineOdd(homeMoneyline?.value);
        setAwaySpreadOdd(awaySpread?.value);
        setAwayTotalsOdd(awayTotals?.value); 
        setAwayMoneylineOdd(awayMoneyline?.value);
    }, [allOdds])

    // useEffect(() => {
    //     const errors = {};
    //     if (odds !== typeof('number')) errors.odds = 'Input must only be a number'; 
    //     if (odds.length > 4) errors.odds = 'Odds must be 3 numbers or less'; 
    //     setErrors(errors); 
    // }, [odds]);


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setHasSubmitted(true);

        if (Object.values(errors).length > 0) {
            return;

        } else {

            let odds = [];

            if (homeSpreadOdd) {
                odds.push({
                    // user_id: currentUser.id,
                    game_id: Number(gameId),
                    team_id: homeTeam.id, 
                    type: 'spread',
                    value: homeSpreadOdd
                })
            }

            if (homeTotalsOdd) {
                odds.push({
                    // user_id: currentUser.id,
                    game_id: Number(gameId),
                    team_id: homeTeam.id, 
                    type: 'totals',
                    value: homeTotalsOdd
                })
            }

            if (homeMoneylineOdd) {
                odds.push({
                    // user_id: currentUser.id,
                    game_id: Number(gameId),
                    team_id: homeTeam.id, 
                    type: 'moneyline',
                    value: homeMoneylineOdd
                })
            }

            if (awaySpreadOdd) {
                odds.push({
                    // user_id: currentUser.id,
                    game_id: Number(gameId),
                    team_id: awayTeam.id, 
                    type: 'spread',
                    value: awaySpreadOdd
                })
            }

            if (awayTotalsOdd) {
                odds.push({
                    // user_id: currentUser.id,
                    game_id: Number(gameId),
                    team_id: awayTeam.id, 
                    type: 'totals',
                    value: awayTotalsOdd
                })
            }

            if (awayMoneylineOdd) {
                odds.push({
                    // user_id: currentUser.id,
                    game_id: Number(gameId),
                    team_id: awayTeam.id, 
                    type: 'moneyline',
                    value: awayMoneylineOdd
                })
            }
        
            await dispatch(thunkAddOdd(odds)); 
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
                                            value={homeSpreadOdd}
                                            placeholder='enter spread'
                                            onChange={(e) => setHomeSpreadOdd(e.target.value)}
                                            contentEditable='true'
                                        >
                                        </input>
                                    </td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={homeTotalsOdd}
                                            placeholder='enter totals'
                                            onChange={(e) => setHomeTotalsOdd(e.target.value)}
                                            contentEditable='true'
                                        >
                                        </input>
                                    </td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={homeMoneylineOdd}
                                            placeholder='enter moneyline'
                                            onChange={(e) => setHomeMoneyLineOdd(e.target.value)}
                                            contentEditable='true'
                                        >
                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo' src={awayTeam?.logo}/>{awayTeam?.name}</div></td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={awaySpreadOdd}
                                            placeholder='enter spread'
                                            onChange={(e) => setAwaySpreadOdd(e.target.value)}
                                            contentEditable='true'
                                        >
                                        </input>
                                    </td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={awayTotalsOdd}
                                            placeholder='enter totals'
                                            onChange={(e) => setAwayTotalsOdd(e.target.value)}
                                            contentEditable='true'
                                        >
                                        </input>
                                    </td>
                                    <td className='data-field-odds'>
                                        <input 
                                            value={awayMoneylineOdd}
                                            placeholder='enter moneyline'
                                            onChange={(e) => setAwayMoneylineOdd(e.target.value)}
                                            contentEditable='true'
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