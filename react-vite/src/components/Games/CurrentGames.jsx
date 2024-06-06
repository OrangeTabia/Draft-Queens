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
            <Link to='/games/all' id='view-all-games-link'>View All Games</Link>
            <div id='all-games'>
                <div>TODAY CONTAINER</div>
                <div>TOMORROW CONTAINER</div>
                <div>UPCOMING CONTAINER</div>
            </div>
        </div>
    )
}

export default CurrentGames;