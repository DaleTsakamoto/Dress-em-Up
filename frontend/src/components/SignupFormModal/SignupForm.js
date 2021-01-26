import React, {useState} from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect} from 'react-router-dom'
import './SignupForm.css';

function SignupForm({open, hidden, setHidden}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hidden) {
      setHidden(false)
    }
    if (password === confirmPassword) {
      setErrors([]);
      return (
        dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
      )
        .catch(res => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className={`${open ? 'signup-form-holder-open' : hidden ? 'signup-form-holder-close sign-up-hide' : 'signup-form-holder-close'}`}>
      <div className='signup-form-title'>
        <h1>Sign Up</h1>
      </div>
        <form onSubmit={handleSubmit} className="signup-form">
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
        </ul>
        <div className='signup-input-container-name'>
        <div className='signup-input-holder-name'>
          <input
            className='signup-input-name'
            placeholder='First Name'
            value={firstName}
            type='text'
            onChange={ e => setFirstName(e.target.value) }
            required
            />
          <input
            className='signup-input-name'
            placeholder='Last Name'
            value={lastName}
            type='text'
            onChange={ e => setLastName(e.target.value) }
            required
          />
          </div>
          </div>
        <div className='signup-input-holder'>
          <input
            className='signup-input'
            placeholder='Email'
            value={email}
            type='email'
            onChange={ e => setEmail(e.target.value) }
            required
          />
        </div>
        <div className='signup-input-holder'>
          <input
            className='signup-input'
            placeholder='Username'
            value={username}
            type='text'
            onChange={ e => setUsername(e.target.value) }
            required
          />
        </div>
        <div className='signup-input-holder'>
          <input
            className='signup-input'
            placeholder='Password'
            value={password}
            type='password'
            onChange={ e => setPassword(e.target.value) }
            required
            />
        </div>
        <div className='signup-input-holder'>
          <input
            className='signup-input'
            placeholder='Confirm Password'
            value={confirmPassword}
            type='password'
            onChange={ e => setConfirmPassword(e.target.value) }
            required
            />
        </div>
        <div className='signup-button-holder'>
          <button type="submit" className="signup-button">Sign Up</button>
        </div>
        </form>
    </div>
);
}

export default SignupForm; 