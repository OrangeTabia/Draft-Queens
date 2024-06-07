import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'; 
import { useParams, useNavigate, Link } from 'react-router-dom'

import { thunkLoadTeams, thunkUpdateTeam } from '../../redux/teams';
import './UpdateTeam.css'; 



function UpdateTeam() {

    const { teamId } = useParams();
    const teams = useSelector(state => state.teams.teams); 
    const selectedTeam = teams?.find((team) => team.id == teamId);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState(selectedTeam?.name);
    const [location, setLocation] = useState(selectedTeam?.location);
    const [sport, setSport] = useState(selectedTeam?.sportType); 
    const [logo, setLogo] = useState(selectedTeam?.logo); 
    const [errors, setErrors] = useState({}); 
    const [hasSubmitted, setHasSubmitted] = useState(false); 
    const currentUser = useSelector(state => state.session.user); 


    useEffect(() => {
        const errors = {}; 
        if (!name) errors.name = 'Name is required';
        if (!location) errors.location = 'Location is required';
        if (!sport) errors.sport = 'Type of sport is required'; 
        setErrors(errors); 
    }, [name, location, sport]); 


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setHasSubmitted(true);

        const updatedFormData = new FormData(); 
        updatedFormData.set('user_id', currentUser.id)
        updatedFormData.set('name', name)
        updatedFormData.set('location', location)
        updatedFormData.set('sport_type', sport)
        updatedFormData.set('logo', logo)
        
        await dispatch(thunkUpdateTeam(updatedFormData, teamId)); 
        navigate('/teams'); 
        // if there are no errors, confirm that the team has been updated 
        // navigate back to teams page or create a button on the form to navigate back to teams page
    }

    return (
        <div className='update-container'>
            <h1>Edit Team Details</h1>
            <div className='update-form-container'>
                <div className='form-and-back-btn'>
                    <div><Link className='back-btn' to='/teams'>Go back to Teams</Link></div>
                    <form
                        onSubmit={handleSubmit}
                        encType='multipart/form-data'
                        className='create-form'
                        >
                        <div className='form-input'>
                            <label>Team Name</label>
                            <input
                                className='input'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-errors'>{hasSubmitted && errors.name}</div>
                        <div className='form-input'>
                            <label>Team Location</label>
                            <input
                                className='input'
                                type='text'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className='form-errors'>{hasSubmitted && errors.location}</div>
                        <div className='form-input'>
                            <label value={sport}>Sport</label>
                            <select className='select' onChange={(e) => setSport(e.target.value)}>
                                <option value={''} disabled>Select a sport</option>
                                <option value='basketball'>basketball</option>
                                <option value='soccer'>soccer</option>
                                <option value='rugby'>rugby</option>
                            </select>
                        </div>
                        <div className='form-errors'>{hasSubmitted && errors.sport}</div>
                        <div className='form-input'>{
                                selectedTeam?.logo ? (
                                <>
                                    <label>Current Image:</label>
                                    <img id='edit-image-populate' src={selectedTeam.logo}/>
                                    <input
                                        className='select'
                                        type='file'
                                        // accept='image/*'
                                        onChange={(e) => setLogo(e.target.files[0])}
                                    >
                                    </input>
                                </>
                            ) :
                                (
                                <>
                                    <label>Select Image:</label>
                                    <input
                                        className='select'
                                        type='file'
                                        // accept='image/*'
                                        onChange={(e) => setLogo(e.target.files[0])}
                                    >
                                    </input>
                                </>
                            )
                            }
                        </div>
                        <button className='form-button' type='submit'>Update Team</button>
                    </form>
                </div>
            </div>
        </div>

    )
}


export default UpdateTeam;