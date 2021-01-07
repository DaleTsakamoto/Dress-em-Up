import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

import * as sessionActions from '../../store/session';

import './Search.css';

function Search() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  

  return (
    <>
      <div className="search-main">
        SEARCH PAGE!!!!
      </div>
      </>
  )
}

export default Search;