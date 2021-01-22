import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Navigation.css'

const Navigation = () => {
  const [home, setHome] = useState(false)
  const [requestResponse, setRequestResponse] = useState(false)
  const [search, setSearch] = useState(false)
  const [account, setAccount] = useState(false)
  const sessionUser = useSelector(state => state.session.user)

  function changeColorHome() {
    setSearch(false)
    setAccount(false)
    setRequestResponse(false)
    setHome(true)
  }

  function changeColorRequest() {
    setSearch(false)
    setAccount(false)
    setHome(false)
    setRequestResponse(true)
  }

  function changeColorSearch() {
    setAccount(false)
    setHome(false)
    setRequestResponse(false)
    setSearch(true)
  }

  function changeColorAccount() {
    setHome(false)
    setRequestResponse(false)
    setSearch(false)
    setAccount(true)
  }

  return (
    <div className='navigation-container pattern-cross-dots-lg'>
      <NavLink className='navigation-navlinks' to="/">
        <div onClick={changeColorHome} className={`navigation-home-category ${home ? 'navigation-add-color' : null}`}>
          <i className="fas fa-home"></i>
          <p>Home</p>
        </div>
      </NavLink>
      <NavLink className='navigation-navlinks' to="/orders">
        <div onClick={ changeColorRequest } className={`navigation-home-category ${requestResponse ? 'navigation-add-color' : null}`}>
          <i className="fas fa-tshirt"></i>
          <p>Orders</p>
        </div>
      </NavLink>
      <NavLink className='navigation-navlinks' to="/search">
        <div onClick={ changeColorSearch } className={`navigation-home-category ${search ? 'navigation-add-color' : null}`}>
          <i className="fas fa-search"></i>
          <p>Search</p>
        </div>
      </NavLink>
      <NavLink className='navigation-navlinks' to={`/users/${sessionUser.id}`}>
        <div onClick={ changeColorAccount } className={`navigation-home-category ${account ? 'navigation-add-color' : null}`}>
          <i className="fas fa-user"></i>
          <p>Account</p>
        </div>
      </NavLink>
    </div>
  );
}

export default Navigation;