import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect } from 'react';
import { thunkLoadTeams } from '../../redux/teams';
import { Link } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import DeleteTeam from './DeleteTeam';

function Teams() {
    const dispatch = useDispatch(); 
    const allTeams = useSelector(state => state.teams.teams); 
    const currentUser = useSelector(state => state.session.user); 
    // let teamOwner = currentUser.id == allTeams.team.userId

    // console.log("SINGLE TEAM", singleTeam)

    useEffect(() => {
        dispatch(thunkLoadTeams()); 
    }, [dispatch])


    return (
        <>
            <h1>Teams List</h1>
            <h2>Basketball Logo Here</h2>
            <h2>Soccer Logo Here</h2>
            <h2>Rugby Logo Here</h2>
            <Link to='/teams/new'>
                <button>Add New Teams</button>
            </Link>
            <div>
                {allTeams?.map((team) => (
                    <div key={team.id}>
                        <p>{team.name}</p>
                        <p>Location: {team.location}</p>
                        <img src={team.logo}/>
                        {/* {teamOwner ? */}
                        <div>
                            <Link to={`/teams/${team.id}/update`}>
                                <button>Update Team</button>
                            </Link>
                            <OpenModalButton to={`/teams/${team.id}/delete`}
                            buttonText='Delete Team'
                            modalComponent={<DeleteTeam teamId={team.id}/>}
                            />
                        </div>
                        {/* : '' */}
                        {/* } */}
                    </div>
                ))}
            </div>
        </>
    )
}


export default Teams;