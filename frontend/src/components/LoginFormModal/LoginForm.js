import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm({ open, hidden, setHidden }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hidden) {
      setHidden(false)
    }
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  const demoUser = () => {
    let credential = 'Demo_user'
    let password = 'password'
    return dispatch(sessionActions.login({
    credential, password
    }))
  }

  const demoDesigner = () => {
    let credential = 'Demo_designer'
    let password = 'password'
    return dispatch(sessionActions.login({
    credential, password
    }))
  }

  return (
    <div className={`pattern-diagonal-lines-xl ${open ? 'login-form-holder-open' : hidden ? 'login-form-holder-close login-hide' : 'login-form-holder-close'}`}>
      <div className='login-form-title'>
        <h1>Login</h1>
      </div>
        <form onSubmit={handleSubmit} className="login-form">
          <ul>
              {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
              ))}
          </ul>
        <div className='login-input-holder'>
          <input 
              type="text"
              value={credential}
              placeholder='Username or Email'
              onChange={(e) => setCredential(e.target.value)}
              required
              className="login-input"
          />
        </div>
        <div className='login-input-holder'>
                <input 
                    type="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
        </div>
        <div className='login-button-holder'>
          <button type="submit" className="login-button">Log In</button>
          <button className='login-form-demo-user-button' onClick={demoUser} type='button'>Demo User Log In</button>
          <button className='login-form-demo-designer-button' onClick={demoDesigner} type='button'>Demo Designer Log In</button>
        </div>
        </form>
    </div>
);
}

export default LoginForm; 