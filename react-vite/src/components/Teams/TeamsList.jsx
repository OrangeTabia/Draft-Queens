import { useSelector, useDispatch } from 'react-redux'; 
import { useState, useEffect } from 'react';
import { thunkLoadTeams } from '../../redux/teams';
import { Link } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import DeleteTeam from './DeleteTeam';

// import { MdSportsRugby } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { PiBasketballLight } from "react-icons/pi";
import { PiSoccerBallFill } from "react-icons/pi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import './Teams.css';

function Teams() {
    const dispatch = useDispatch(); 
    const allTeams = useSelector(state => state.teams.teams); 
    const currentUser = useSelector(state => state.session.user); 

    // This is the selectedSport
    const [selectedSport, setSelectedSport] = useState();

    // This is the searchTerm
    const [searchTerm, setSearchTerm] = useState('');

    // This will house the teams that we care about 
    let selectedTeams = allTeams;
    if (selectedSport != null) { 
        selectedTeams = selectedTeams.filter((team) => team.sportType == selectedSport);
    }

    // Search term filtering
    if (searchTerm != '') { 
        selectedTeams = selectedTeams.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    useEffect(() => {
        dispatch(thunkLoadTeams()); 
    }, [dispatch]);

    // creating a variable for the sport icons to be used on all teams display
    const smallBasketball = <PiBasketballLight className='icon' fontSize='25px'/>
    const smallSoccer = <PiSoccerBallFill className='icon' fontSize='25px'/>
    // const smallRugby = <MdSportsRugby className='icon' fontSize='25px'/>

    // function with switchtype to display a sport icon based on the sport 
    function getSportsIcon(sportType) {
        switch(sportType) {
            case 'basketball':
              return smallBasketball;
            case 'soccer':
              return smallSoccer
            // case 'rugby': 
            //   return smallRugby
            default:
              return null;
        }
    }

    return (
        <div id='team-list-container'>
            <div id='sports-buttons'>
                <div 
                    className={`sport-type ${selectedSport == 'basketball' ? 'selected-sport' : ''}`}
                    onClick={() => setSelectedSport(selectedSport == 'basketball' ? undefined : 'basketball')}
                >
                    <PiBasketballLight className='icon' fontSize='30px'/>
                    <p className='sport-league'>WNBA</p>
                </div>
                <div 
                    className={`sport-type ${selectedSport == 'soccer' ? 'selected-sport' : ''}`}
                    onClick={() => selectedSport == 'soccer' ? setSelectedSport(undefined) : setSelectedSport('soccer')}
                >
                    <PiSoccerBallFill className='icon' fontSize='30px'/>
                    <p className='sport-league'>NWSL</p>
                </div>
                {/* <div className='sport-type'>
                    <MdSportsRugby className='icon' fontSize='40px'/>
                    <p className='sport-name'>RUGBY</p>
                    <p className='sport-league'>WPL</p>
                </div> */}
            </div>
            
            <div id={currentUser ? 'create-team-btn-container' : 'create-team-btn-container-logged-out'}>
                {currentUser &&
                <Link id='create-team-btn' to='/teams/new'><FiPlus style={{ fontSize:'16px', color:'#f76900'}}/><span>&nbsp;Create a Team</span></Link>
                }
                <div className='search-bar'>
                    <input
                        type='search'
                        placeholder='Search Teams'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
            </div>
            <div id='all-teams-container'>
    
                <table style={{width:'100%', textAlign:'left', backgroundColor: '#f76900'}}>
                    <tr>
                        <th style={{width: '25%'}} className='sport-header'>Sport</th>
                        <th style={{width: '35%'}} className='team-header'>Team</th>
                        <th style={{width: '30%'}} className='location-header'>Location</th>
                        <th style={{width: '10%'}} className='edit-header'></th>
                    </tr>
                </table>
                <div id='team-table'>
                {selectedTeams?.map((team) => {
                    let isOwner = team.userId === currentUser?.id;
                    
                    return (
                        <div id='team-card' key={team.id}>
                            <table style={{width:'100%'}}>
                                <tr>
                                    <td style={{width: '25%'}} className='sport-title'>{getSportsIcon(team.sportType)}</td>
                                    <td style={{width: '35%'}} className='team-title'><div className='team-and-logo'><img className='team-logo' src={team.logo} alt='team-logo'/> {team.name}</div></td>
                                    <td style={{width: '30%'}} className='location-title'>{team.location}</td>
                                    {isOwner ? (
                                        <td style={{width: '10%'}} className='edit-title'>
                                            <div id='teams-edit-delete-btns'>
                                                <Link to={`/teams/${team.id}/update`} id='update-team-btn'><BiSolidEdit /></Link>
                                                <OpenModalButton
                                                    to={`/teams/${team.id}/delete`}
                                                    buttonText={<BiSolidTrash />}
                                                    modalComponent={<DeleteTeam teamId={team.id} />}
                                                />
                                            </div>
                                        </td>
                                    ) : <td style={{width: '10%'}}></td> }
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
