import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Header.css'

const Header = () => {
  const userSession = useSelector(state => state.session.user)


  return (
    <div className='header-container pattern-cross-dots-lg'>
      {/* <NavLink className='header-navlinks' to="/user">
        <div className='header-home-category'>
          <i className="fas fa-user-circle"></i>
        </div>
      </NavLink> */}
      <NavLink className='header-navlinks' to="/new-request">
        <div className='header-home-category'>
          <i className="fab fa-shopify"></i>
          <p>Request</p>
        </div>
      </NavLink>
    </div>
  );
}

export default Header;