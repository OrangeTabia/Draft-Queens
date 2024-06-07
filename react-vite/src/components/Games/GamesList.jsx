import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import { thunkLoadGames } from '../../redux/games'; 
import { thunkLoadTeams } from '../../redux/teams'; 
// import { BiSolidEdit } from "react-icons/bi";
// import { BiSolidTrash } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import OpenModalButton from '../OpenModalButton';
import fanswapAd from '../../../images/fanswap-longer.png'; 
import DeleteGame from './DeleteGame';
import './GamesList.css';


function GamesList() {
    const dispatch = useDispatch(); 
    const allGames = useSelector(state => state.games.games);
    const allTeams = useSelector(state => state.teams.teams);
    const currentUser = useSelector(state => state.session.user); 

    // 1. filter all games to a list of games where their start date is less than today's date
    // 2. find today's date and parse it into a comparable number
    // let today = Date.parse(new Date(Date.now())); 
    // 3. find the list of game dates and prse it into a comparable number
    // after mapping each game - Date.parse(game.startTime)

    // possibly do this in the backend - query parameter to filter by passed games
    // additional thunk 

    
    useEffect(() => {
        dispatch(thunkLoadGames());
        dispatch(thunkLoadTeams()); 
    }, [dispatch])

    if (allTeams && allGames) {
        return (
            <div id='games-outisde-container'>
                <div id='games-and-ad-container'> 
                    <div id='games-and-btn-container'>
                        <div id='create-game-btn-container'>
                        {currentUser &&
                        <Link id='create-game-btn' to='/games/new'><FiPlus style={{ fontSize:'16px', color:'#f76900'}}/> Create a Game</Link>
                        }
                        </div>
                        <div id='games-container'>
                            <table className='game-table-header'>
                                <tr>
                                    <th className='table-header' style={{width:'34%', textAlign:'left', color:'#f76900'}}>GAMES</th>
                                    {/* <th className='table-header' style={{width:'4%'}}></th> */}
                                    <th className='table-header' style={{width:'22%'}}>SPREAD</th>
                                    <th className='table-header' style={{width:'22%'}}>TOTAL</th>
                                    <th className='table-header' style={{width:'22%'}}>MONEYLINE</th>
                                </tr>
                            </table>
                            {allGames.map((game) => {
                                let homeTeam = allTeams.find((team) => team.id == game.homeTeamId);
                                let awayTeam = allTeams.find((team) => team.id == game.awayTeamId);
                                let isOwner = allTeams.find((team) => team.userId == currentUser?.id);

                                {if (homeTeam && awayTeam) {
                                    return (
                                    <table className='game-table-body'>
                                        <tr>
                                            <td style={{width:'34%', fontSize:'12px'}}>{game.startTime}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo' src={homeTeam.logo}/>{homeTeam.name}</div></td>
                                            {/* <td id='final-score' style={{width:'4%'}}>000</td> */}
                                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                                        </tr>
                                        <tr>
                                            <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo' src={awayTeam.logo}/>{awayTeam.name}</div></td>
                                            {/* <td id='final-score' style={{width:'4%'}}>000</td> */}
                                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                                            <td className='data-field' style={{width:'22%', textAlign:'center'}}>coming soon!</td>
                                        </tr>
                                        {isOwner ? 
                                            <tr>
                                                <td style={{width:'34%', fontSize:'12px'}}>
                                                    <div className='finished-games-edit-delete-btns'>
                                                        <Link id='finished-games-edit-btn'to={`/games/${game.id}/update`}>
                                                        {/* <BiSolidEdit fontSize='20px'/> */}
                                                        Edit Game
                                                        </Link>
                                                        <OpenModalButton to={`/games/${game.id}/delete`}
                                                        // buttonText={<BiSolidTrash fontSize='20px'/>}
                                                        id='finished-games-delete-btn'
                                                        buttonText='Delete Game'
                                                        modalComponent={<DeleteGame gameId={game.id}/>}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        : ''}
                                    </table>
                                    )
                                }}
                            })}
                        </div>
                    </div>
                    <div id='fanswap-ad'><a href='https://fanswap.onrender.com/' target='_blank' rel='noreferrer'><img src={fanswapAd} alt='fanswap-ad' /></a></div>
                </div>
            </div>
        )
    }
}

export default GamesList;