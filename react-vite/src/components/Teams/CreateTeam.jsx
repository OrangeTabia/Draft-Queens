import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { thunkAddTeam } from '../../redux/teams';
import fanswapAd from '../../../images/fanswap-longer.png';
import draftQueensAd from '../../../images/draftqueens-longer.png'; 
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
        formData.append('user_id', currentUser.id)
        formData.append('name', name)
        formData.append('location', location)
        formData.append('sport_type', sport)
        formData.append('logo', logo)
        
        await dispatch(thunkAddTeam(formData)); 
        navigate('/teams'); 
        // if there are no errors, confirm that the team has been added 
        // navigate back to teams page or create a button on the form to navigate back to teams page
    }

    return (
        <div className='create-container'>
            <h1>Create a New Team</h1>
            <div className='create-form-container'>
                <div><a href='https://draft-queens.onrender.com' target='_blank' rel='noreferrer'><img src={draftQueensAd} alt='draftqueens-ad'/></a></div>
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
                            <option value={''} selected disabled>Select a sport</option>
                            <option value='basketball'>basketball</option>
                            <option value='soccer'>soccer</option>
                            <option value='rugby'>rugby</option>
                        </select>
                    </div>
                    <div className='form-errors'>{hasSubmitted && errors.sport}</div>
                    <div className='form-input'>
                        <label>Select Team Image or Logo</label>
                        <input
                            id='logo'
                            type='file'
                            // accept='image/*'
                            onChange={(e) => setLogo(e.target.files[0])}
                        >
                        </input>
                    </div>
                    <button className='form-button' type='submit'>Create Team</button>
                </form>
                <div><a href='https://fanswap.onrender.com/' target='_blank' rel='noreferrer'><img src={fanswapAd} alt='fanswap-ad'/></a></div>
            </div>
        </div>

    )
}


export default AddTeam;