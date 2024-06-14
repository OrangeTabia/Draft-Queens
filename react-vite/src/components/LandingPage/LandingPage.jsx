// import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import { useModal } from "../../context/Modal"; 
import { PiBasketballLight } from "react-icons/pi";
import { PiSoccerBallFill } from "react-icons/pi";
import { MdSportsRugby } from "react-icons/md";
import FanSwapAd from '../../../images/fanswap-skinny.png'; 
import './LandingPage.css'; 

function LandingPage() {
    const { closeModal } = useModal();


    return (
        <div id='landing-container'>
            <div id='landing1-container'>
                <div className='landing-card1'>
                    <OpenModalButton
                    id='big-signup'
                    buttonText="Sign Up"
                    onItemClick={closeModal}
                    modalComponent={<SignupFormModal />}
                    />
                    {/* <button id='bet-button' onClick={handleSubmit}>BET NOW!</button> */}
                </div>
            </div>
            <div id='landing2-container'>
                <div id='landing2-sport-leagues'>
                    <div className='landing-icon-sport'>
                        <PiBasketballLight fontSize='30px'/>
                        <p>WNBA</p>
                    </div>
                    <div className='landing-icon-sport'>
                        <PiSoccerBallFill fontSize='30px'/>
                        <p>NWSL</p>
                    </div>
                    <div className='landing-icon-sport'>
                        <MdSportsRugby fontSize='30px'/>
                        <p>WPL</p>
                    </div>
                    <div className='landing-icon-sport'>
                        <PiBasketballLight fontSize='30px'/>
                        <p>CWBB</p>
                    </div>
                    <div className='landing-icon-sport'>
                        <PiSoccerBallFill fontSize='30px'/>
                        <p>Soccer<br></br>Olympics</p>
                    </div>
                    <div className='landing-icon-sport'>
                        <PiBasketballLight fontSize='30px'/>
                        <p>Basketball<br></br>Olympics</p>
                    </div>
                    <div className='landing-icon-sport'>
                        <MdSportsRugby fontSize='30px'/>
                        <p>Rugby<br></br>Olympics</p>
                    </div>
                </div>
            </div>
            <div id='landing3-container'>
                <div id='landing-card3'>
                </div>
            </div>
            <div id='fanswap-ad'>
                <a href='https://fanswap.onrender.com/' target='_blank' rel='noreferrer'><img src={FanSwapAd} alt='fanatics-ad'/></a>
            </div>
        </div>
    )
}

export default LandingPage;