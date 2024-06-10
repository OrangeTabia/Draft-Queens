import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validations, setValidations] = useState({}); 
  const [hasSubmitted, setHasSubmitted] = useState(false); 
  const { closeModal } = useModal();

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  useEffect(() => {
    const validations = {};
    if (!email) validations.email = 'Email is required';
    if (!validateEmail(email)) validations.email = 'Invalid email format'; 
    if (!password) validations.password = 'Please enter a password';
    setValidations(validations);
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true); 

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

const handleDemoUser = () => {
  setEmail('demo1@gmail.com')
  setPassword('password')
}

  return (
    <div className='login-modal'>
      <h1 className='login-title'>Log In</h1>
      <form id='login-form' onSubmit={handleSubmit}>
        <div>
          {hasSubmitted && errors.email && <p className='form-errors'>{errors.email}</p>}
          {hasSubmitted && errors.password && <p className='form-errors'>{errors.password}</p>}
        </div>
        <div className='login-input'>
          <label>Email</label>
          <input
            className='login-form-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>{hasSubmitted && validations.email && <p className='form-errors'>{validations.email}</p>}</div>
        <div className='login-input'>
          <label>Password</label>
          <input
            className='login-form-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>{hasSubmitted && validations.password && <p className='form-errors'>{validations.password}</p>}</div>
        <div className='login-buttons'>
          <button id='login-btn' type="submit">Log In</button>
            <button
            onClick={handleDemoUser}
            type="submit"
            id='demo-btn'
            >
              Demo User
            </button>
        </div>
      </form>
      <div id='signup-link-container'>
        <span>Don&apos;t have an account?</span>
        <span><Link to='/signup' id='signup-link' onClick={closeModal}> Sign Up</Link></span>
      </div>
    </div>
  );
}

export default LoginFormModal;
