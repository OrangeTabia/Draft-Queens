import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux'; 
import { thunkDeleteGame, thunkLoadGames } from '../../redux/games';


function DeleteGame({ gameId }) {
    const { closeModal } = useModal(); 
    const dispatch = useDispatch(); 

    const handleDelete = async (e) => {
        e.preventDefault(); 
        await dispatch(thunkDeleteGame(gameId)); 
        await dispatch(thunkLoadGames()); 
        await closeModal(); 
    }
    return (
        <>
            <h1>Delete a Game</h1>
            <p>Are you sure you want to delete this game? </p>
            <h6>Deleting the game will not remove previous information such teams and their associated odds and results.</h6>
            <div>
                <button type='submit' onClick={() => closeModal()}>Cancel</button>
                <button type='submit' onClick={handleDelete}>Delete</button>
            </div>
        </>
    )
}

export default DeleteGame;