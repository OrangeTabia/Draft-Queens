import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect } from 'react';
import { thunkLoadTeams } from '../../redux/teams';
import { Link } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import DeleteTeam from './DeleteTeam';

import { MdOutlineSportsBasketball } from "react-icons/md";
import { MdSportsSoccer } from "react-icons/md";
import { MdSportsRugby } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import './Teams.css';

function Teams() {
    const dispatch = useDispatch(); 
    const allTeams = useSelector(state => state.teams.teams); 
    const currentUser = useSelector(state => state.session.user); 

    useEffect(() => {
        dispatch(thunkLoadTeams()); 
    }, [dispatch]);

    const smallBasketball = <MdOutlineSportsBasketball className='icon' fontSize='20px'/>
    const smallSoccer = <MdSportsSoccer className='icon' fontSize='20px'/>
    const smallRugby = <MdSportsRugby className='icon' fontSize='20px'/>

    function getSportsIcon(sportType) {
        switch(sportType) {
            case 'basketball':
              return smallBasketball;
            case 'soccer':
              return smallSoccer
            case 'rugby': 
              return smallRugby
            default:
              return null;
          }
    }


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
            
            <div id='create-team-btn-container'>
                {currentUser &&
                <Link id='create-team-btn' to='/teams/new'><FiPlus style={{ fontSize:'16px', color:'#f76900'}}/> Create a Team</Link>
                }
            </div>
            <div id='all-teams-container'>
    
                <table style={{width:'100%', textAlign:'left', backgroundColor: '#f76900'}}>
                    <tr>
                        <th style={{width: '20%'}}>Sport</th>
                        <th style={{width: '30%'}}>Team</th>
                        <th style={{width: '25%'}}>Location</th>
                        {currentUser && 
                        <th style={{width: '10%'}}></th>
                        }
                    </tr>
                </table>
                <div id='team-table'>
                {allTeams?.map((team) => {
                    let isOwner = team.userId === currentUser?.id;
                    
                    return (
                        <div id='team-card' key={team.id}>
                            <table style={{width:'100%'}}>
                                <tr>
                                    <td style={{width: '20%'}}>{getSportsIcon(team.sportType)}</td>
                                    <td style={{width: '30%'}}><div className='team-and-logo'><img className='team-logo' src={team.logo} alt='team-logo'/> {team.name}</div></td>
                                    <td style={{width: '25%'}}>{team.location}</td>
                                    {isOwner ? (
                                        <td style={{width: '10%'}}>
                                            <div id='teams-edit-delete-btns'>
                                                <Link to={`/teams/${team.id}/update`} id='update-team-btn'><BiSolidEdit fontSize='24px'/></Link>
                                                <OpenModalButton
                                                    to={`/teams/${team.id}/delete`}
                                                    buttonText={<BiSolidTrash fontSize='24px'/>}
                                                    modalComponent={<DeleteTeam teamId={team.id} />}
                                                />
                                            </div>
                                        </td>
                                    ) : '' }
                                </tr>
                            </table>
                        </div>
                    );
                })}
                </div>
            </div>
        </div>
    );
}

export default Teams;
