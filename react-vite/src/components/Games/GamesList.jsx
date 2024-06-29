import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { thunkLoadGames } from '../../redux/games'; 
import { thunkLoadTeams } from '../../redux/teams'; 
// import { BiSolidEdit } from "react-icons/bi";
// import { BiSolidTrash } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { PiBasketballLight } from "react-icons/pi";
import { PiSoccerBallFill } from "react-icons/pi";
import OpenModalButton from '../OpenModalButton';
import fanswapAd from '../../../images/fanswap-longer.png'; 
import DeleteGame from './DeleteGame';
import './GamesList.css';


function GamesList() {
    const dispatch = useDispatch(); 
    const allGames = useSelector(state => state.games.games);
    const numGames = useSelector(state => state.games.totalGames); // 18 
    const allTeams = useSelector(state => state.teams.teams);
    const currentUser = useSelector(state => state.session.user); 
    const [selectedGame, setSelectedGame] = useState();
    const [currentPage, setCurrentPage] = useState(1); 
    const [gamesPerPage, setGamesPerPage] = useState(10); 

    let selectedGames = allGames;
    if (selectedGame != null) { 
        selectedGames = selectedGames.filter((game) => game.sportType == selectedGame);
    }
    
    useEffect(() => {
        dispatch(thunkLoadGames(currentPage, gamesPerPage));
        dispatch(thunkLoadTeams()); 
    }, [dispatch])

    if (allTeams && allGames) {

        let pageButtons = null;
        if (numGames) { 
            const numPages = Math.ceil(numGames / gamesPerPage)
            pageButtons = [...Array(numPages)].map((_, idx) => {
                return (
                    <span 
                        className={currentPage == idx+1 ? 'selected-page' : 'page'}
                        onClick={() => {
                            setCurrentPage(idx+1);
                            dispatch(thunkLoadGames(idx+1, gamesPerPage));
                        }
                    }
                    >{idx+1}</span>
                )
              }
            )
        }

        return (
            <div id='games-outisde-container'>
                <div id='sports-buttons'>
                    <div 
                        className={`sport-type ${selectedGame == 'basketball' ? 'selected-sport' : ''}`}
                        onClick={() => setSelectedGame(selectedGame == 'basketball' ? undefined : 'basketball')}
                    >
                        <PiBasketballLight className='icon' fontSize='30px'/>
                        <p className='sport-league'>WNBA</p>
                    </div>
                    <div 
                        className={`sport-type ${selectedGame == 'soccer' ? 'selected-sport' : ''}`}
                        onClick={() => selectedGame == 'soccer' ? setSelectedGame(undefined) : setSelectedGame('soccer')}
                    >
                        <PiSoccerBallFill className='icon' fontSize='30px'/>
                        <p className='sport-league'>NWSL</p>
                    </div>
                    </div>
                <div id='games-and-ad-container'> 
                    <div id='games-and-btn-container'>
                        <div id='create-game-btn-container'>
                        {currentUser &&
                        <Link id='create-game-btn' to='/games/new'><FiPlus style={{ fontSize:'16px', color:'#f76900'}}/>&nbsp;Create a Game</Link>
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
                                let formattedDate = game.startTime.split(' ').slice(0, -2).join(' ');
                                let formattedTime = new Date(game.startTime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}); // 3:07 PM

                                // See if one is the owner of this specific game
                                let isOwner = game.userId == currentUser?.id;

                                {if (homeTeam && awayTeam) {
                                    return (
                                    <table className='game-table-body'>
                                        <tr>
                                            <td style={{width:'34%', fontSize:'12px'}}>{formattedDate}&nbsp;&nbsp;&mdash;&nbsp;&nbsp;{formattedTime}</td>
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
                                                    <div className='games-edit-delete-btns'>
                                                        <Link id='games-edit-btn'to={`/games/${game.id}/update`}>
                                                        {/* <BiSolidEdit fontSize='20px'/> */}
                                                        Edit Game
                                                        </Link>
                                                        <OpenModalButton to={`/games/${game.id}/delete`}
                                                        id='games-delete-btn'
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
                    <div id='games-fanswap-ad'><a href='https://fanswap.onrender.com/' target='_blank' rel='noreferrer'><img src={fanswapAd} alt='fanswap-ad' /></a></div>
                </div>

                <div id='game-pagination'>
                    {pageButtons}
                </div>
            </div>
        )
    }
}

export default GamesList;