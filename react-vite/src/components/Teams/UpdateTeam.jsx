import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'; 
import { useParams, useNavigate, Link } from 'react-router-dom';

import { thunkUpdateTeam } from '../../redux/teams';
import './UpdateTeam.css'; 



function UpdateTeam() {

    const { teamId } = useParams();
    const teams = useSelector(state => state.teams.teams); 
    const selectedTeam = teams?.find((team) => team.id == teamId);

    console.log("SELECTED TEAM", selectedTeam); 


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState(selectedTeam?.name);
    const [location, setLocation] = useState(selectedTeam?.location);
    const [sport, setSport] = useState(selectedTeam?.sportType); 
    const [logo, setLogo] = useState(); 
    const [preview, setPreview] = useState();
    const [errors, setErrors] = useState({}); 
    const [hasSubmitted, setHasSubmitted] = useState(false); 
    const currentUser = useSelector(state => state.session.user); 


    useEffect(() => {
        const errors = {}; 
        if (!name) errors.name = 'Name is required';
        if (name.length > 100) errors.name = 'Name must be less than 100 characters'; 
        if (!location) errors.location = 'Location is required';
        if (location.length > 100) errors.location = 'Location must be less than 100 characters'; 
        if (!sport) errors.sport = 'Type of sport is required'; 
        setErrors(errors); 
    }, [name, location, sport]); 


    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        // If we have a logo on the object and not a new one, use the S3 Link
        let objectUrl;
        if (selectedTeam?.logo && !logo) { 
            objectUrl = selectedTeam.logo
        // Otherwise, create a new object URL
        } else {
            objectUrl = URL.createObjectURL(logo)
           
        }      
        setPreview(objectUrl)
        // free memory whenever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)  
    }, [logo, selectedTeam?.logo])


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        setHasSubmitted(true);

        if (Object.values(errors)?.length > 0) {
            return;
        } else {
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
                            {/* If there's no value set, we'll use the existing selection. Otherwise, use the current state */}
                            <select 
                                className='select' 
                                value={sport || selectedTeam?.sportType} 
                                onChange={(e) => setSport(e.target.value)}
                            >
                                <option value={''} disabled>Select a sport</option>
                                <option value='basketball'>Basketball</option>
                                <option value='soccer'>Soccer</option>
                                <option value='rugby'>Rugby</option>
                            </select>
                        </div>
                        <div className='form-errors'>{hasSubmitted && errors.sport}</div>
                        <div className='form-input'>{
                            <>
                                <label>Current Image:</label>
                                <img id='edit-image-populate' src={preview}/>
                                <input
                                    className='select'
                                    type='file'
                                    // accept='image/*'
                                    onChange={(e) => setLogo(e.target.files[0])}
                                >
                                </input>
                            </>
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