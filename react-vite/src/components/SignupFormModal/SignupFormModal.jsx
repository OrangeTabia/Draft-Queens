import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useNavigate, Link } from "react-router-dom";

import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [validations, setValidations] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitClass, setSubmitClass] = useState("form-submit");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const setSubmitDisabledStatus = (disabled) => {
    (disabled)
      ? setSubmitClass("form-submit disabled")
      : setSubmitClass("form-submit");
    setSubmitDisabled(disabled);
  };

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  const getValidations = useCallback(() => {
    const newValidations = {};

    if (!username) {
      newValidations.username = "Username is required";
    } else if (username.length < 3 || username.length > 50) {
      newValidations.username = "Username must be more than 3 characters and less than 50 characters";
    }
    if (!email) {
      newValidations.email = "Email is required";
    } else if (!validateEmail(email)) {
      newValidations.email = "Invalid Email Format";
    } else if (email.length > 100) {
      newValidations.email = "Email must be less than 100 characters"; 
    }
    if (password.length < 8 || password.length > 255) {
      newValidations.password = "Password must be at least 8 characters and less than 255 characters";
    }
    if (password !== confirmPassword) {
      newValidations.confirmPassword = "Confirm password must match password";
    }

    return newValidations;
  }, [username, email, password, confirmPassword]);


  useEffect(() => {
    if (!hasSubmitted) return;
    const newValidations = getValidations();
    setSubmitDisabledStatus(Object.keys(newValidations).length > 0);
    setValidations(newValidations);
  }, [hasSubmitted, getValidations]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasSubmitted) {
      setHasSubmitted(true);
      const newValidations = getValidations();
      if (Object.keys(newValidations).length) return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        username,
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/");
    }
  };

  return (
    <div id='signup-modal'>
      <h1 id='signup-title'>Sign Up</h1>
      {validations.server && <p>{validations.server}</p>}
      <form
        onSubmit={handleSubmit}
        id="signup-form"
      >
        <div className='signup-input'>
          <label htmlFor="username">Username</label>
          <input
            // id="username"
            className="signup-form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          {validations.username && (
            <p className="form-errors">{validations.username}</p>
          ) || errors.username && (
            <p className="form-errors">{errors.username}</p>
          )}
        </div>

        <div className='signup-input'>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="signup-form-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          {validations.email && (
            <p className="form-errors">{validations.email}</p>
          ) || errors.email && (
            <p className="form-errors">{errors.email}</p>
          )}
        </div>

        <div className='signup-input'>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="signup-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          {errors.password && (
            <p className="form-errors">{errors.password}</p>
          ) || validations.password && (
            <p className="form-errors">{validations.password}</p>
          )}
        </div>

        <div className='signup-input'>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            className="signup-form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          {validations.confirmPassword && (
            <p className="form-errors">{validations.confirmPassword}</p>
          )}
        </div>

        <button
          className={submitClass}
          id='signup-btn'
          type="submit"
          disabled={submitDisabled}
        >
          Sign Up
        </button>
      </form>
      <div id='login-link-container'>
        <span>Already have an account?</span>
        <span><Link to='/login' id='login-link' onClick={closeModal}> Log In</Link></span>
      </div>
    </div>
  );
}

export default SignupFormModal;