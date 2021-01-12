import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import NewRequestModal from '../NewRequest/index.js'

import * as userActions from '../../store/users';

import './Header.css'

const Header = () => {
  const userSession = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  // const [designerId, setDesignerId] = useState(null)
  // const [isLoaded, setIsLoaded] = useState(false)

  // useEffect(() => {
  //   dispatch(userActions.searchDesigners())
  //     .then((res) => {
  //       console.log("THIS IS THE RES!!??!!?!?!?!??!", res)
  //       setDesignerId(Object.values(res.data.designers)[0].id)
  //     })
  //     .then(() => setIsLoaded(true))
  // }, [])

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