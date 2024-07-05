import { useDispatch, useSelector } from 'react-redux'; 
import { useState, useEffect } from 'react';
import { thunkAddOdd } from '../../redux/odds'; 

import './CreateOdd.css'; 

function AddOdd() {
    const dispatch = useDispatch();
    const allGames = useSelector(state => state.games.games); 
    const allTeams = useSelector(state => state.teams.teams); 
    const currentUser = useSelector(state => state.session.user); 

    return (
        <>
        <h1>ODDS PAGE</h1>
            <div id='odds-game-container'>
            <table className='game-table-header'>
                <tr>
                    <th className='table-header' style={{width:'34%', textAlign:'left', color:'#f76900'}}>GAME</th>
                    {/* <th className='table-header' style={{width:'4%'}}></th> */}
                    <th className='table-header' style={{width:'22%'}}>SPREAD</th>
                    <th className='table-header' style={{width:'22%'}}>TOTAL</th>
                    <th className='table-header' style={{width:'22%'}}>MONEYLINE</th>
                </tr>
            </table>

            <table className='game-table-body'>
                <tr>
                    <td style={{width:'34%', fontSize:'12px'}}>Date and Time</td>
                </tr>
                <tr>
                    <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo'/>Home Team Name</div></td>
                    {/* <td id='final-score' style={{width:'4%'}}>000</td> */}
                    <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                    <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                    <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                </tr>
                <tr>
                    <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo'/>Away Team Name</div></td>
                    {/* <td id='final-score' style={{width:'4%'}}>000</td> */}
                    <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                    <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                    <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                </tr>
            </table>

        </div>
    </>
    )

}


export default AddOdd;