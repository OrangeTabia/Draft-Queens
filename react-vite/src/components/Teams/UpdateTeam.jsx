import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'

import { thunkLoadTeams, thunkUpdateTeam } from '../../redux/teams';
import './Teams.css'; 



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
        updatedFormData.set['user_id', currentUser.id]
        updatedFormData.set('name', name)
        updatedFormData.set('location', location)
        updatedFormData.set('sport_type', sport)
        updatedFormData.set('logo', logo)
        
        await dispatch(thunkUpdateTeam(updatedFormData, teamId)); 
        // if there are no errors, confirm that the team has been updated 
        // navigate back to teams page or create a button on the form to navigate back to teams page
        // navigate('/teams'); 
    }

    return (
        <>
            <h1>Edit Team Form</h1>
            <form
                onSubmit={handleSubmit}
                encType='multipart/form-data'
                >
                <div>
                    <label>Team Name:</label>
                    <input
                        id='team-name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </input>
                </div>
                <div className='form-errors'>{hasSubmitted && errors.name}</div>
                <div>
                    <label>Location:</label>
                    <input
                        id='location'
                        type='text'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                    </input>
                </div>
                <div className='form-errors'>{hasSubmitted && errors.location}</div>
                <div>
                    <label value={sport}>Select Sport:</label>
                    <select id='sport-type' onChange={(e) => setSport(e.target.value)}>
                        <option value={''} disabled>Select a sport</option>
                        <option value='basketball'>basketball</option>
                        <option value='soccer'>soccer</option>
                        <option value='rugby'>rugby</option>
                    </select>
                </div>
                <div className='form-errors'>{hasSubmitted && errors.sport}</div>
                <div>
                    <label>Select Image:</label>
                    <input
                        id='logo'
                        type='file'
                        // accept='image/*'
                        onChange={(e) => setLogo(e.target.files[0])}
                    >
                    </input>
                </div>
                <button type='submit'>Update Team</button>
            </form>
        </>

    )
}


export default UpdateTeam;