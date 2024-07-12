import { useDispatch, useSelector } from 'react-redux'; 
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { thunkAddOdd } from '../../redux/games';

import './CreateOdd.css'; 

function AddOdd() {
    const { gameId } = useParams(); 
    const dispatch = useDispatch();
    const allGames = useSelector(state => state.games.games); 
    const allTeams = useSelector(state => state.teams.teams); 
    const allOdds = useSelector(state => state.odds.odds);
    const currentUser = useSelector(state => state.session.user); 
    const currentGame = allGames?.find((game) => game.id == gameId); 
    const homeTeam = allTeams?.find((team) => team.id == currentGame.homeTeamId); 
    const awayTeam = allTeams?.find((team) => team.id == currentGame.awayTeamId); 
    const formattedDate = currentGame?.startTime.split(' ').slice(0, -2).join(' ');
    const formattedTime = new Date(currentGame?.startTime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}); 
    const homeTeamOdds = allOdds?.filter((odd) => odd.gameId == currentGame.id && odd.teamId == currentGame.homeTeamId && odd.status == 'open'); 
    const homeSpread = homeTeamOdds?.find((odd) => odd.type == 'spread'); 
    const homeTotals = homeTeamOdds?.find((odd) => odd.type == 'totals');
    const homeMoneyline = homeTeamOdds?.find((odd) => odd.type == 'moneyline');
    const awayTeamOdds = allOdds?.filter((odd) => odd.gameId == currentGame.id && odd.teamId == currentGame.awayTeamId && odd.status == 'open'); 
    const awaySpread = awayTeamOdds?.find((odd) => odd.type == 'spread');
    const awayTotals = awayTeamOdds?.find((odd) => odd.type == 'totals');
    const awayMoneyline = awayTeamOdds?.find((odd) => odd.type == 'moneyline');


    return (
        <div id='create-odds-container'>
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
                    <table className='game-table-body'>
                        <tbody>
                            <tr>
                                <td style={{width:'34%', fontSize:'12px'}}>{formattedDate}&nbsp;&nbsp;&mdash;&nbsp;&nbsp;{formattedTime}</td>
                            </tr>
                            <tr>
                                <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo' src={homeTeam?.logo}/>{homeTeam?.name}</div></td>
                                <td className='data-field'>{homeSpread ? homeSpread.value : ''}</td>
                                <td className='data-field'>{homeTotals ? homeTotals.value : ''}</td>
                                <td className='data-field'>{homeMoneyline ? homeMoneyline.value : ''}</td>
                            </tr>
                            <tr>
                                <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo' src={awayTeam?.logo}/>{awayTeam?.name}</div></td>
                                <td className='data-field'>{awaySpread ? awaySpread.value : ''}</td>
                                <td className='data-field'>{awayTotals ? awayTotals.value : ''}</td>
                                <td className='data-field'>{awayMoneyline ? awayMoneyline.value : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}


export default AddOdd;