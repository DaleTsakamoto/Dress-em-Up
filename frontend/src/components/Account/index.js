import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

import * as sessionActions from '../../store/session';

import './Account.css';

function Account() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [edit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState(sessionUser.firstName)
  const [lastName, setLastName] = useState(sessionUser.lastName)
  const [email, setEmail] = useState(sessionUser.email)
  const [username, setUsername] = useState(sessionUser.username)
  const [address, setAddress] = useState(sessionUser.address)
  const [city, setCity] = useState(sessionUser.city)
  const [state, setState] = useState(sessionUser.state)
  const [zipCode, setZipCode] = useState(sessionUser.zipCode)
  const [errors, setErrors] = useState([])
  const id = sessionUser.id
  
  const logout = (e) => {
    dispatch(sessionActions.logout())
    let path = '/'
    return history.push(path);
  };

  const editAccount = () => {
    setErrors([])
    setEdit(true);
  }

  const updateProfile = () => {
    if (username !== 'Demo_user' && username !== 'Demo_designer') {
      setEdit(false);
      setUsername(sessionUser.username)
      return setErrors(['You may not change the demo_user username!!'])
    }
    dispatch(sessionActions.userUpdate({ firstName, lastName, email, username, address, city, state, zipCode, id }))
      .catch(res => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    })
    setEdit(false);
    return
  }

  return (
      <div className="account-main pattern-cross-dots-lg">
        <div className='account-header-info'>
        <i className="fas fa-user-circle"></i>
          {edit ? 
          <>
            <div className='account-input-container-name'>
              <div className='account-input-holder-name'>
                <input
                  className='account-input-first-name'
                  value={firstName}
                  type='text'
                  placeholder='First Name'
                  onChange={ e => setFirstName(e.target.value) }
              />
                <input
                  className='account-input-last-name'
                  value={lastName}
                  type='text'
                  placeholder='Last Name'
                  onChange={ e => setLastName(e.target.value) }
                />
                </div>
              </div>
              <input
                className='account-input-username'
                value={username}
                type='text'
                placeholder='username'
                onChange={ e => setUsername(e.target.value) }
              />
            <p onClick={updateProfile}>Save</p>
          </>
          :
          <>
            <h1>{firstName} {lastName}</h1>
            <h2>{username}</h2>
            <p onClick={editAccount}>Edit Account</p>
          </>
        }
          <ul>
          {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
          ))}
        </ul>
        </div>
        <div className='account-places'>
          <p>Saved Emails</p>
          </div>
        <div className='account-places-home'>
        <i class="far fa-envelope"></i>
          <p className='account-places-home-header'>Primary</p>
        <div className='account-places-email'>
          {edit ? 
            <input
              className='account-input-email'
              value={email}
              type='text'
              placeholder='email'
              onChange={ e => setEmail(e.target.value) }
              />
            :
          <p>{email}</p>
        }
            </div>
        </div>
        <div className='account-places'>
          <p>Saved Locations</p>
        </div>
        <div className='account-places-home'>
          <i className="fas fa-home"></i>
          <p className='account-places-home-header'>Home</p>
          <div className='account-places-home-address'>
          {edit ?
            <>
              <input
                className='account-input-address'
                value={address}
                type='text'
                placeholder='address'
                onChange={ e => setAddress(e.target.value) }
              />
            <div className='account-input-holder-address'>
              <input
                className='account-input-city'
                value={city}
                type='text'
                placeholder='city'
              onChange={ e => setCity(e.target.value) }
              />
            <input
              className='account-input-state'
              value={state}
              type='text'
              placeholder='st'
              onChange={ e => setState(e.target.value) }
            />
            <input
              className='account-input-zipcode'
              value={zipCode}
              type='text'
              placeholder='zip'
              onChange={ e => setZipCode(e.target.value) }
            />
              </div>
              </>
          :
              <p>{address}<br />
              {city}, {state}, {zipCode}</p>
        }
            </div>
        </div>
        <div className='account-places-spacer pattern-cross-dots-lg'></div>
      <div className='account-logout' onClick={logout}><p>Log Out</p></div>
      </div>
  )
}

export default Account;