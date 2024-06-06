import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 

import { thunkLoadGames } from '../../redux/games'; 
import { thunkLoadTeams } from '../../redux/teams'; 
import OpenModalButton from '../OpenModalButton';
import DeleteGame from './DeleteGame';
import './CurrentGames.css';


function CurrentGames() {
    const dispatch = useDispatch(); 
    const allGames = useSelector(state => state.games.games);
    const allTeams = useSelector(state => state.teams.teams);
    const currentUser = useSelector(state => state.session.user); 

    // get games for TODAY only 
    // get games for TOMORROW only
    // get upcoming games up to 7 days 
    // 'View All Games' will link to history of all games paginated ( 6 per page?)
    // - all three should be in separate divs and maps probably 
    
    useEffect(() => {
        dispatch(thunkLoadGames());
        dispatch(thunkLoadTeams()); 
    }, [dispatch])


    return (
        <div id='current-games-container'>
            <div id='current-games'>
                <div id='today-games'>
                    <table className='game-table-header'>
                        <tr>
                            <th className='table-header' style={{width:'34%', textAlign:'left'}}>TODAY</th>
                            <th className='table-header' style={{width:'22%'}}>SPREAD</th>
                            <th className='table-header' style={{width:'22%'}}>TOTAL</th>
                            <th className='table-header' style={{width:'22%'}}>MONEYLINE</th>
                        </tr>
                    </table>
                    <table className='game-table-body'>
                        <tr>
                            <td style={{width:'34%', fontSize:'12px'}}>game time</td>
                        </tr>
                        <tr>
                            <td style={{width:'34%'}}>home team</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                        </tr>
                        <tr>
                            <td style={{width:'34%'}}>away team</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                        </tr>
                    </table>
                </div>
                <div id='tomorrow-games'>
                    <table className='game-table-header'>
                        <tr>
                            <th className='table-header' style={{width:'34%', textAlign:'left'}}>TOMORROW</th>
                            <th className='table-header' style={{width:'22%'}}>SPREAD</th>
                            <th className='table-header' style={{width:'22%'}}>TOTAL</th>
                            <th className='table-header' style={{width:'22%'}}>MONEYLINE</th>
                        </tr>
                    </table>
                    <table className='game-table-body'>
                        <tr>
                            <td style={{width:'34%', fontSize:'12px'}}>game time</td>
                        </tr>
                        <tr>
                            <td style={{width:'34%'}}>home team</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                        </tr>
                        <tr>
                            <td style={{width:'34%'}}>away team</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                        </tr>
                    </table>
                </div>
                <div id='upcoming-games'>
                    <table className='game-table-header'>
                        <tr>
                            <th className='table-header' style={{width:'34%', textAlign:'left'}}>UPCOMING</th>
                            <th className='table-header' style={{width:'22%'}}>SPREAD</th>
                            <th className='table-header' style={{width:'22%'}}>TOTAL</th>
                            <th className='table-header' style={{width:'22%'}}>MONEYLINE</th>
                        </tr>
                    </table>
                    <table className='game-table-body'>
                        <tr>
                            <td style={{width:'34%', fontSize:'12px'}}>game time</td>
                        </tr>
                        <tr>
                            <td style={{width:'34%'}}>home team</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                        </tr>
                        <tr>
                            <td style={{width:'30%'}}>away team</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>data</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CurrentGames;