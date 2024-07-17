import './Footer.css'; 
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer id='footer-container'>
            <div id='top-footer'>
                <p id='developed-by'>Developed By</p>
                <p id='developer'>Tabia Ye</p>
                <div id='dev-links'>
                    <a href='https://www.linkedin.com/in/tabiaye/' target='_blank' rel='noreferrer'><FaLinkedin /></a>
                    <a href='https://github.com/OrangeTabia' target='_blank' rel='noreferrer'><FaGithub /></a>
                </div>
            </div>

            <div id='bottom-footer'>
                <p className='gamble-warning'>Gambling Problem? Call 1-800-GAMBLER or 877-8-HOPENY/text HOPENY (467369) (NY). Help is available for problem gambling. Call (888) 789-7777 or visit ccpg.org(CT).</p>
                <p className='gamble-warning'>Must be at least 18 years or older. Higher age limits may apply in some states. Paid contests not available while physically located in HI, ID, LA (select parishes) MT, NV, OR and WA. For entertainment purposes only. Winning a contest on DraftQueens depends on knowledge and exercise of skill. Available to play for free. Void where prohibited. Eligibility restrictions apply.</p>
                <p id='copyright'>&copy;&nbsp;2024 DraftQueens</p>
            </div>
        </footer>
    )
}

export default Footer;