import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="nav-bar">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="middle-nav">
        <NavLink to="/teams" className="middle-nav-titles">Sports</NavLink>
        <NavLink to="/games" className="middle-nav-titles">Games</NavLink>
        <NavLink className="middle-nav-titles">Results</NavLink>
      </div>
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
