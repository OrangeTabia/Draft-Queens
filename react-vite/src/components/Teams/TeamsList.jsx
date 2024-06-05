import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect } from 'react';
import { thunkLoadTeams } from '../../redux/teams';
import { Link } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import DeleteTeam from './DeleteTeam';

import { MdOutlineSportsBasketball } from "react-icons/md";
import { MdSportsSoccer } from "react-icons/md";
import { MdSportsRugby } from "react-icons/md";

function Teams() {
    const dispatch = useDispatch(); 
    const allTeams = useSelector(state => state.teams.teams); 
    const currentUser = useSelector(state => state.session.user); 

    useEffect(() => {
        dispatch(thunkLoadTeams()); 
    }, [dispatch]);

    return (
        <div id='team-list-container'>
            <div id='sports-buttons'>
                <div className='sport-type'>
                    <MdOutlineSportsBasketball className='icon' fontSize='40px'/>
                    <p className='sport-name'>BASKETBALL</p>
                </div>
                <div className='sport-type'>
                    <MdSportsSoccer className='icon' fontSize='40px'/>
                    <p className='sport-name'>SOCCER</p>
                </div>
                <div className='sport-type'>
                    <MdSportsRugby className='icon' fontSize='40px'/>
                    <p className='sport-name'>RUGBY</p>
                </div>
            </div>
            <Link to='/teams/new'>
                <button>Add New Teams</button>
            </Link>
            <div id='all-teams-container'>
                {allTeams?.map((team) => {
                    let isOwner = team.userId === currentUser?.id;

                    return (
                        <div id='team-card' key={team.id}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Logo</th>
                                        <th>Team</th>
                                        <th>Location</th>
                                        <th>Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><img className='team-logo' src={team.logo} alt='team logo'/></td>
                                        <td><p>{team.name}</p></td>
                                        <td><p>{team.location}</p></td>
                                        {isOwner && (
                                            <>
                                                <td>
                                                    <Link to={`/teams/${team.id}/update`} buttontext='Update Team'>Update Team</Link>
                                                </td>
                                                <td>
                                                    <OpenModalButton
                                                        to={`/teams/${team.id}/delete`}
                                                        buttonText='Delete Team'
                                                        modalComponent={<DeleteTeam teamId={team.id} />}
                                                    />
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Teams;
