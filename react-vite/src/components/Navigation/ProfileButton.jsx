import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const featureComingSoon = (e) => {
    e.preventDefault();
    window.alert('Feature coming soon!'); 
  }

  return (
    <>
      <button id="menu-item" onClick={toggleMenu}>
        <span><CgProfile fontSize="20px" color='#f76900'/></span> 
        {user && <span id="username">{user.username}</span>}
        <span><IoMdArrowDropdown fontSize="20px" color='#f76900'/></span>
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="dropdown-items">
              <div id='welcome-user'>Welcome, {user.username}!</div>
              <div id='welcome-email'>{user.email}</div>
              <Link to='/teams/new' className="dropdown-item">Create a Team</Link>
              <Link to='/games/new' className="dropdown-item">Create a Game</Link>
              <Link to='/odds/new' className="dropdown-item">Create Odds</Link>
              <Link onClick={featureComingSoon} className="dropdown-item">Add Game Results</Link>
              <div className="dropdown-item" onClick={logout}>Log Out</div>
            </div>
          ) : (
            <div className="login-logout-buttons">
              <OpenModalMenuItem
                id="login-button"
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                id="signup-button"
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
