import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { thunkAddTeam } from '../../redux/teams';
import './Teams.css'; 



function AddTeam() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [sport, setSport] = useState(''); 
    const [logo, setLogo] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const currentUser = useSelector(state => state.session.user); 
    const [hasSubmitted, setHasSubmitted] = useState(false); 


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

        const formData = new FormData(); 
        formData.append['user_id', currentUser.id]
        formData.append('name', name)
        formData.append('location', location)
        formData.append('sport_type', sport)
        formData.append('logo', logo)
        
        await dispatch(thunkAddTeam(formData)); 
        // if there are no errors, confirm that the team has been added 
        // navigate back to teams page or create a button on the form to navigate back to teams page
    }

    return (
        <>
            <h1>Add New Team Form</h1>
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
                        <option value={''} selected disabled>Select a sport</option>
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
                <button type='submit'>Create Team</button>
            </form>
        </>

    )
}


export default AddTeam;