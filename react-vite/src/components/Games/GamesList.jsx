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
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import OpenModalButton from '../OpenModalButton';
import fanswapAd from '../../../images/fanswap-longer.png'; 
import DeleteGame from './DeleteGame';
import './GamesList.css';
import { thunkLoadOdds } from '../../redux/odds';


function GamesList() {
    const dispatch = useDispatch(); 
    const allGames = useSelector(state => state.games.games);
    const numGames = useSelector(state => state.games.totalGames); // 18 
    const allTeams = useSelector(state => state.teams.teams);
    const currentUser = useSelector(state => state.session.user); 
    const allOdds = useSelector(state => state.odds.odds);
    console.log("ODDS", allOdds)
    const [selectedLeague, setSelectedLeague] = useState();
    const [currentPage, setCurrentPage] = useState(1); 
    const [gamesPerPage, setGamesPerPage] = useState(10); 
    const [searchTerm, setSearchTerm] = useState('');
    const numPages = Math.ceil(numGames / gamesPerPage);
    const gameIds = allGames?.map((game) => game.id); // [22, 21, 12, 11, 10, ... ]
    // const oddGameIds = allOdds?.map((odd) => odd.gameId); // [2, 2, 5, 5, 5, 5]
    // const currentGame = gameIds.find((id) => id = oddGameIds.gameId);
    // console.log("CURRENT GAME ID", currentGame)


    // Logic for filtering the teams in search bar
    let selectedTeams = allTeams;
    if (searchTerm != '') { 
        selectedTeams = selectedTeams.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Logic for filtering the leagues
    if (selectedLeague != null) { 
        selectedTeams = selectedTeams.filter((team) => team.sportType == selectedLeague);
    }
    
    useEffect(() => {
        dispatch(thunkLoadGames(currentPage, gamesPerPage, selectedLeague));
        dispatch(thunkLoadTeams()); 
    }, [dispatch])

    // Once we've loaded the games, we then load the odds
    useEffect(() => {
        dispatch(thunkLoadOdds(gameIds));
    }, [allGames])

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
                            dispatch(thunkLoadGames(idx+1, gamesPerPage, selectedLeague));
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
                        className={`sport-type ${selectedLeague == 'basketball' ? 'selected-sport' : ''}`}
                        onClick={() => {
                            setSelectedLeague(selectedLeague == 'basketball' ? undefined : 'basketball');
                            dispatch(thunkLoadGames(currentPage, gamesPerPage, selectedLeague == 'basketball' ? undefined : 'basketball'));
                        }}
                    >
                        <PiBasketballLight className='icon' fontSize='30px'/>
                        <p className='sport-league'>WNBA</p>
                    </div>
                    <div 
                        className={`sport-type ${selectedLeague == 'soccer' ? 'selected-sport' : ''}`}
                        onClick={() => {
                            selectedLeague == 'soccer' ? setSelectedLeague(undefined) : setSelectedLeague('soccer');
                            dispatch(thunkLoadGames(currentPage, gamesPerPage, selectedLeague == 'soccer' ? undefined : 'soccer'));
                        }}
                    >
                        <PiSoccerBallFill className='icon' fontSize='30px'/>
                        <p className='sport-league'>NWSL</p>
                    </div>
                </div>
                <div id='games-and-ad-container'> 
                    <div id='games-and-btn-container'>
                        <div id={currentUser ? 'create-game-btn-container' : 'create-game-btn-container-logged-out'}>
                        {currentUser &&
                        <Link id='create-game-btn' to='/games/new'><FiPlus style={{ fontSize:'16px', color:'#f76900'}}/>&nbsp;Create a Game</Link>
                        }
                        <div className='search-bar'>
                            <input
                                type='search'
                                placeholder='Search Games By Team'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                        </div>
                        </div>
                        <div className='games-container'>
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
                                // gets an array of the game's home team odds (could be spread, totals, or moneyline type)
                                let homeTeamOdds = allOdds?.filter((odd) => odd.gameId == game.id && odd.teamId == game.homeTeamId && odd.status == 'open');
                                // finds one odd object that is the spread type
                                let homeSpread = homeTeamOdds?.find((odd) => odd.type == 'spread'); 
                                let homeTotals = homeTeamOdds?.find((odd) => odd.type == 'totals');
                                let homeMoneyline = homeTeamOdds?.find((odd) => odd.type == 'moneyline');
                                // gets an array of the game's away team odds (could be spread, totals, or moneyline type)
                                let awayTeamOdds = allOdds?.filter((odd) => odd.gameId == game.id && odd.teamId == game.awayTeamId && odd.status == 'open');
                                let awaySpread = awayTeamOdds?.find((odd) => odd.type == 'spread');
                                let awayTotals = awayTeamOdds?.find((odd) => odd.type == 'totals');
                                let awayMoneyline = awayTeamOdds?.find((odd) => odd.type == 'moneyline');
                                let formattedDate = game.startTime.split(' ').slice(0, -2).join(' ');
                                let formattedTime = new Date(game.startTime).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}); // 3:30 PM

                                // See if one is the owner of this specific game
                                let isOwner = game.userId == currentUser?.id;

                                // Both teams need to exist
                                // and EITHER home OR away team match the query
                                {if (homeTeam && awayTeam && (
                                    selectedTeams.includes(homeTeam) || selectedTeams.includes(awayTeam)
                                )) {
                                    return (
                                    <table className='game-table-body'>
                                        <tr>
                                            <td style={{width:'34%', fontSize:'12px'}}>{formattedDate}&nbsp;&nbsp;&mdash;&nbsp;&nbsp;{formattedTime}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo' src={homeTeam.logo}/>{homeTeam.name}</div></td>
                                            {/* <td id='final-score' style={{width:'4%'}}>000</td> */}
                                            <td className='data-field' style={{width:'22%'}}>{homeSpread ? homeSpread.value : ''}</td>
                                            <td className='data-field' style={{width:'22%'}}>{homeTotals ? homeTotals.value : ''}</td>
                                            <td className='data-field' style={{width:'22%'}}>{homeMoneyline ? homeMoneyline.value : ''}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width:'34%', color: 'white'}}><div className='team-and-logo'><img className='team-logo' src={awayTeam.logo}/>{awayTeam.name}</div></td>
                                            {/* <td id='final-score' style={{width:'4%'}}>000</td> */}
                                            <td className='data-field' style={{width:'22%'}}>{awaySpread ? awaySpread.value : ''}</td>
                                            <td className='data-field' style={{width:'22%'}}>{awayTotals ? awayTotals.value : ''}</td>
                                            <td className='data-field' style={{width:'22%'}}>{awayMoneyline ? awayMoneyline.value : ''}</td>
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
                                                        <Link id='add-odds-btn' to='/odds/new'>
                                                        Add Odds
                                                        </Link>
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
                    {currentPage != 1 ? 
                    <span
                        className='pag-arrows'
                        onClick={() => {
                                setCurrentPage(currentPage - 1);
                                dispatch(thunkLoadGames(currentPage - 1, gamesPerPage, selectedLeague));
                            }
                        }
                    >
                        <RiArrowLeftSLine style={{fontSize: '30px'}}/>
                    </span>
                    :
                    <span>
                        <RiArrowLeftSLine style={{fontSize: '30px'}}/>
                    </span>
                    }
                    {pageButtons}

                    {currentPage != numPages ? 
                    <span
                        className='pag-arrows'
                        onClick={() => {
                                setCurrentPage(currentPage + 1);
                                dispatch(thunkLoadGames(currentPage + 1, gamesPerPage, selectedLeague));
                            }
                        }
                    >
                        <RiArrowRightSLine style={{fontSize: '30px'}}/>
                    </span>
                    :
                    <span>
                        <RiArrowRightSLine style={{fontSize: '30px'}}/>
                    </span>
                    }
                </div>
            </div>
        )
    }
}

export default GamesList;