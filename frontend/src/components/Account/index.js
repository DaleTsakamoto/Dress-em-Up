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
  
  const logout = (e) => {
    dispatch(sessionActions.logout());
    let path = '/'
    return history.push(path);
  };

  return (
    <>
      <div className="account-main">
        <div className='account-header-info'>
          <i className="fas fa-user-circle"></i>
          <h1>{sessionUser.firstName} {sessionUser.lastName}</h1>
          <p>Edit Account</p>
        </div>
        <div className='account-places pattern-cross-dots-lg'>
          <p>Saved Locations</p>
        </div>
        <div className='account-places-home'>
          <i className="fas fa-home"></i>
          <p className='account-places-home-header'>Home</p>
          {sessionUser.address ? 
            <div className='account-places-home-address'>
              <p>{sessionUser.address}<br />
              {sessionUser.city}, {sessionUser.state}, {sessionUser.zipCode}</p>
            </div>
            :
            null
        }
        </div>
        <div className='account-places-spacer pattern-cross-dots-lg'></div>
        <div className='account-logout' onClick={logout}><p>Log Out</p></div>
        <div className='account-bottom pattern-cross-dots-lg'></div>
      </div>
    </>
  )
}

export default Account;