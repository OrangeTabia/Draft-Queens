import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux'; 
import { thunkDeleteTeam, thunkLoadTeams } from '../../redux/teams';


function DeleteTeam({ teamId }) {
    const { closeModal } = useModal(); 
    const dispatch = useDispatch(); 

    const handleDelete = async (e) => {
        e.preventDefault(); 
        await dispatch(thunkDeleteTeam(teamId)); 
        await dispatch(thunkLoadTeams()); 
        await closeModal(); 
    }
    return (
        <div className='delete-modal'>
            <h1 className='delete-title'>Delete Team</h1>
            <div className='delete-confirmation'>
                <p>Are you sure you want to delete this team? </p>
                <h5>Deleting the team will not remove previously posted information <br></br>such games/matches and their associated odds and results.</h5>
            </div>
            <div className='buttons-container'>
                <div className='cancel-delete-btns'>
                    <button className='cancel-btn' type='submit' onClick={() => closeModal()}>Cancel</button>
                    <button className='submit-btn' type='submit' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    
    )
}

export default DeleteTeam;