import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 

import { thunkLoadGames } from '../../redux/games'; 
import { thunkLoadTeams } from '../../redux/teams'; 



function GamesList() {
    const dispatch = useDispatch(); 
    const allGames = useSelector(state => state.games.games);
    const allTeams = useSelector(state => state.teams.teams);

    
    useEffect(() => {
        dispatch(thunkLoadGames());
        dispatch(thunkLoadTeams()); 
    }, [dispatch])

    return (
        <>
            <h1>Games List</h1>
            <Link to='/games/new'>
                <button>Add A Game</button>
            </Link>
            {allGames?.map((game) => {
                let homeTeam = allTeams?.find((team) => team.id == game.homeTeamId);
                let awayTeam = allTeams?.find((team) => team.id == game.awayTeamId);

                return (
                <div key={game.id}>
                    <span><img src={homeTeam.logo}/>{homeTeam.name} vs. <img src={awayTeam.logo}/>{awayTeam.name}</span>
                    <p>Start Time: {game.startTime}</p>
                    <button>Edit Game</button>
                    <button>Delete Game</button>
                </div>)
                } 
            )}
        </>
    )
}

export default GamesList;