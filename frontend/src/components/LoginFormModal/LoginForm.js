import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm({open}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  return (
    <div className={`pattern-diagonal-stripes-lg ${open ? 'login-form-holder-open' : 'login-form-holder-close'}`}>
        <h1 className='login-form-title'>Login</h1>
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
        </div>
        </form>
    </div>
);
}

export default LoginForm; 