import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

import * as sessionActions from '../../store/session';
import * as userActions from '../../store/users'

import './Search.css';

function Search() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const designersSearch = useSelector(state => state.users.designers);
  const [keywordSearch, setKeywordSearch] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(userActions.designerPurge())
    .then(setIsLoaded(true))
  },[])

  const activateSearch = () => {
    console.log(keywordSearch)
    dispatch(userActions.searchDesigners(keywordSearch))
  }

  return isLoaded &&(
    <div className='search-container pattern-cross-dots-lg'>
      <div className="search-bar-container">
          <h1 className='search-bar-title'>Search for a Designer</h1>
        <div className="search-bar">
          <input
          onChange={(e) => setKeywordSearch(e.target.value)}
          className="search-bar-keyword"
          placeholder="Sally Jameson"
            name="keywordSearch" />
          <button onClick={activateSearch} className="search-button">
            <i className="fas fa-search search-magnify" />
          </button>
        </div>
          <h2 className='search-results-title'>Results</h2>
        {designersSearch ?
            Object.values(designersSearch).map((person, idx) => {
      return (
        <div key={idx} className='results-container__body__local'>
            <NavLink className='navlinks' to={`/users/${person.id}`}>
              <div className='results-local-header'>
                <img className='results-local-header__image' src={person.avatar} />
                <h1 className='results-local-username'>{person.firstName} {person.lastName.slice(0, 1).toUpperCase()}.</h1>
              </div>
            </NavLink>
            <div className='results-local-user__bio'>{person.bio}</div>
        </div>
      )
    })
          :
          null
      }
      </div>
      <div className="search-bar-spacer"></div>
      <h1 className='search-my-designers-header'>My Designers</h1>
        <div></div>
    </div>
  )
}

export default Search;