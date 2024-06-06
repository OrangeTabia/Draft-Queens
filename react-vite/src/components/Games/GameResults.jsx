import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 

import { thunkLoadGames } from '../../redux/games'; 
import { thunkLoadTeams } from '../../redux/teams'; 
import { BiSolidEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";
import OpenModalButton from '../OpenModalButton';
import DeleteGame from './DeleteGame';
import './GameResults.css';


function GamesList() {
    const dispatch = useDispatch(); 
    const allGames = useSelector(state => state.games.games);
    const allTeams = useSelector(state => state.teams.teams);
    const currentUser = useSelector(state => state.session.user); 

    // get only all games that have already happened - use their startTime
    
    useEffect(() => {
        dispatch(thunkLoadGames());
        dispatch(thunkLoadTeams()); 
    }, [dispatch])


    return (
        <div id='all-games-list-container'>
            <div id='all-games'>
            {allGames?.map((game) => {
                let homeTeam = allTeams?.find((team) => team.id == game.homeTeamId);
                let awayTeam = allTeams?.find((team) => team.id == game.awayTeamId);
                let isOwner = allTeams?.find((team) => team.userId == currentUser?.id);

                {if (homeTeam && awayTeam) {
                    return (
                        <div id='game-and-odds-container'>
                            <div id='game-card' key={game.id}>
                                <div id='opponents-and-gametime'>
                                    <div id='all-games-time'>{game.startTime}</div>
                                    <div className='all-games-home-away'><img className='team-logo' src={homeTeam.logo}/>{homeTeam.name}</div>
                                    <div className='all-games-home-away'><img className='team-logo' src={awayTeam.logo}/>{awayTeam.name}</div>
                                </div>
                                
                                { 
                                    isOwner ?
                                        <div className='all-games-edit-delete-btns'>
                                            <Link id='all-games-edit-btn'to={`/games/${game.id}/update`}>
                                            <BiSolidEdit fontSize='24px'/>
                                            </Link>
                                            <OpenModalButton to={`/games/${game.id}/delete`}
                                            buttonText={<BiSolidTrash fontSize='24px'/>}
                                            modalComponent={<DeleteGame gameId={game.id}/>}
                                            />
                                        </div>
                                    :
                                    ''
                                }
                            </div>
                            <div id='odds-card'>
                                <div id='odds-table-container'>
                                    <table id='odds-table'>
                                        <tr>
                                            <th className='table-header'>SPREAD</th>
                                            <th className='table-header'>TOTAL</th>
                                            <th className='table-header'>MONEYLINE</th>
                                        </tr>
                                        <tr>
                                            <td>data</td>
                                            <td>data</td>
                                            <td>data</td>
                                        </tr>
                                        <tr>
                                            <td>data</td>
                                            <td>data</td>
                                            <td>data</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        )
                            
                    }}
                } 
            )}
            </div>
        </div>
    )
}

export default GamesList;