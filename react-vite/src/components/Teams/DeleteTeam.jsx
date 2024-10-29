import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux'; 
import { thunkDeleteTeam, thunkLoadTeams } from '../../redux/teams';
import './DeleteTeam.css';


function DeleteTeam({ teamId }) {
    const { closeModal } = useModal(); 
    const dispatch = useDispatch(); 

    const handleDelete = async (e) => {
        e.preventDefault(); 
        await dispatch(thunkDeleteTeam(teamId)); 
        await dispatch(thunkLoadTeams()); 
        await closeModal(); 
    }

    if (currentUser?.role === 'bookkeeper') {
        return (
            <div className='delete-modal'>
                <h1 className='delete-title'>Delete Team</h1>
                <div className='delete-confirmation'>
                    <p>Are you sure you want to delete this team? </p>
                    <h5>Deleting the team will remove games/matches <br></br>and their associated odds and results.</h5>
                </div>
                <div className='buttons-container'>
                    <div className='cancel-delete-btns'>
                        <button className='cancel-btn' type='submit' onClick={() => closeModal()}>Cancel</button>
                        <button className='delete-btn' type='submit' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                Content Unavailable
            </div>
        )
    }
}

export default DeleteTeam;