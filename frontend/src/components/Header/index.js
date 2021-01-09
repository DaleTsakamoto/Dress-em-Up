import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import NewRequestModal from '../NewRequest/index.js'

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
      <NewRequestModal />
    </div>
  );
}

export default Header;