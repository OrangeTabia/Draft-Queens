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
        <>
            <h1>Delete a Team</h1>
            <p>Are you sure you want to delete this team? </p>
            <h6>Deleting the team will not remove previous information such games/matches and their associated odds and results.</h6>
            <div>
                <button type='submit' onClick={() => closeModal()}>Cancel</button>
                <button type='submit' onClick={handleDelete}>Delete</button>
            </div>
        </>
    )
}

export default DeleteTeam;