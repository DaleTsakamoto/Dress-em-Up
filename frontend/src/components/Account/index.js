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
    e.preventDefault();
    dispatch(sessionActions.logout());
    let path = '/'
    return history.push(path);
  };

  return (
    <>
      <div className="account-main">
      <button onClick={logout}>Log Out</button>
        ACCOUNT!!!!
      </div>
      </>
  )
}

export default Account;