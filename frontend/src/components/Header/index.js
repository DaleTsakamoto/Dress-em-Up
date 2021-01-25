import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import NewRequestModal from '../NewRequest/index.js'

import * as userActions from '../../store/users';

import './Header.css'

const Header = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()

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