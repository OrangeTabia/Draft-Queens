import { useState, useEffect } from "react";
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


  useEffect(() => {
    const validations = {};
    if (!email) validations.email = 'Email is required';
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
    <>
      <h1>Log In</h1>
      <form id='login-form' onSubmit={handleSubmit}>
        <div>
          {hasSubmitted && errors.email && <p className='form-errors'>{errors.email}</p>}
          {hasSubmitted && errors.password && <p className='form-errors'>{errors.password}</p>}
        </div>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div>{hasSubmitted && validations.email && <p className='form-errors'>{validations.email}</p>}</div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div>{hasSubmitted && validations.password && <p className='form-errors'>{validations.password}</p>}</div>
        <button type="submit">Log In</button>
        <button
        onClick={handleDemoUser}
        type="submit"
        >
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
