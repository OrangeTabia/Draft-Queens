import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux'; 
import { thunkDeleteGame, thunkLoadGames } from '../../redux/games';
import './DeleteGame.css'; 


function DeleteGame({ gameId }) {
    const { closeModal } = useModal(); 
    const dispatch = useDispatch(); 
    const currentUser = useSelector(state => state.session.user); 

    const handleDelete = async (e) => {
        e.preventDefault(); 
        await dispatch(thunkDeleteGame(gameId)); 
        await dispatch(thunkLoadGames()); 
        await closeModal(); 
    }

    if (currentUser?.role === 'bookkeeper') {
        return (
            <div className='delete-modal'>
                <h1 className='delete-title'>Delete Game</h1>
                <div className='delete-confirmation'>
                    <p>Are you sure you want to delete this game? </p>
                    <h5>Deleting the game will not remove the teams. <br></br>To remove a team, navigate to the teams page.</h5>
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

export default DeleteGame;