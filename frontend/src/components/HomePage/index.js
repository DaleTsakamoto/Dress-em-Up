import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

import * as sessionActions from '../../store/session';

import './HomePage.css';

function HomePage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

//   let logInClick = () => {
//     let path = '/login'
//     history.push(path);
//   }
  
//   let signUpClick = () => {
//     let path = '/signup'
//     history.push(path);
// }
  
const logout = (e) => {
  e.preventDefault();
  dispatch(sessionActions.logout());
  return (
    <Redirect to='/' />
  )
};
  

  return (
    <>
    <div className="homepage-main">
      <div className="homepage-buttons_holder">
          <div className="homepage-button_container">
          <button onClick={logout}>Log Out</button>
          </div>
        <div className='homepage-designers-join'>
          <p>Want to join our team of designers? <a>Help dress 'em up</a> </p>
        </div>
      </div>
      </div>
      </>
  )
}

export default HomePage;