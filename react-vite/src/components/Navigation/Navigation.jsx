import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import DraftQueensHomeLogo from '../../../images/draftqueens-home-logo.png';
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav-bar">
      <div>
        <NavLink to="/"><img src={DraftQueensHomeLogo} id='home-logo'></img></NavLink>
      </div>
      <div className="middle-nav">
        <NavLink to='/' id='home-nav'>Home</NavLink>
        <div className='dropdown-content'>
          <NavLink to="/teams" id='teams-nav'>Teams</NavLink>
          <NavLink to="/games" id='games-nav'>Games</NavLink>
          <NavLink to="/results" id='results-nav'>Results</NavLink>
        </div>
      </div>
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
