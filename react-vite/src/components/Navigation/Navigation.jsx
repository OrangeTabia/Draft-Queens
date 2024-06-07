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
        <NavLink to='/' className="middle-nav-titles">Home</NavLink>
        <NavLink to="/teams" className="middle-nav-titles">Teams</NavLink>
        <NavLink to="/games" className="middle-nav-titles">Games</NavLink>
        <NavLink to="/results" className="middle-nav-titles">Results</NavLink>
      </div>
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
