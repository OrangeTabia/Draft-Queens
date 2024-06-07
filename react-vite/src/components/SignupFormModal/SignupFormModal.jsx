import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!username) validations.username = 'Username is required';
    if (username.length < 3) validations.username = 'Username must be at least 3 characters'; 
    if (!password) validations.password = 'Password is required';
    if (password.length < 8) validations.password = 'Password must be at least 8 characters'; 
    if (confirmPassword.length < 8) validations.password = 'Password must be at least 8 characters';
    setValidations(validations); 
  }, [email, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className='signup-modal'>
      <h1 className='login-title'>Sign Up</h1>
      {hasSubmitted && errors.server && <p className='form-errors'>{errors.server}</p>}
      <form id='signup-form' onSubmit={handleSubmit}>
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
        <div>
          {hasSubmitted && errors.email && <p className='form-errors'>{errors.email}</p>}
          {hasSubmitted && validations.email && <p className='form-errors'>{validations.email}</p>}
        </div>
        <div className='login-input'>
          <label>Username</label>
          <input
            className='login-form-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          {hasSubmitted && errors.username && <p className='form-errors'>{errors.username}</p>}
          {hasSubmitted && validations.username && <p className='form-errors'>{validations.username}</p>}
        </div>
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
        <div>
          {hasSubmitted && errors.password && <p className='form-errors'>{errors.password}</p>}
          {hasSubmitted && validations.password && <p className='form-errors'>{validations.password}</p>}
        </div>
        <div className='login-input'>
          <label>Confirm Password</label>
          <input
            className='login-form-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          {hasSubmitted && errors.confirmPassword && <p className='form-errors'>{errors.confirmPassword}</p>}
          {hasSubmitted && validations.confirmPassword && <p className='form-errors'>{validations.confirmPassword}</p>}
        </div>
        <button id='signup-btn' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
