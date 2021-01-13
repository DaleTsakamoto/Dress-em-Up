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
  const userDesigners = useSelector(state => state.session.designers)
  const [keywordSearch, setKeywordSearch] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);
  let id = sessionUser.id;

  useEffect(() => {
    dispatch(sessionActions.searchUserDesigners(id))
  },[])

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
        <div className='search-results-title pattern-cross-dots-lg'>
          <h2>Results</h2>
        </div>
        {designersSearch ?
            Object.values(designersSearch).map((person, idx) => {
      return (
        <div key={idx} className='search-my-designers-individual'>
        <NavLink className='search-my-designers-navlinks' to={`/users/${person.id}`}>
          <div className='search-my-designers-header'>
          <img className='search-my-designers-image' src={person.avatar} />
            <div className='search-my-designers-name-rating'>
              <h1 className='search-my-designers-name'>{person.firstName} {person.lastName}</h1>
              <div className='search-my-designers-ratings-container'>
                <img id='search-my-designers-ratings-1' src='../images/Dress.png' />
                <img id='search-my-designers-ratings-2' src='../images/Dress.png' />
                <img id='search-my-designers-ratings-3' src='../images/Dress.png' />
                <img id='search-my-designers-ratings-4' src='../images/Dress.png' />
                <img id='search-my-designers-ratings-5' src='../images/Dress.png' />
              </div>
            </div>
          </div>
        </NavLink>
      </div>
      )
    })
          :
          null
      }
      </div>
      <div className='search-my-designers-container'>
        <div className='search-my-designers-title pattern-cross-dots-lg'>
          <h1>My Designers</h1>
        </div>
        {userDesigners ?
            Object.values(userDesigners).map((person, idx) => {
              return (
                <div key={idx} className='search-my-designers-individual'>
                  <NavLink className='search-my-designers-navlinks' to={`/users/${person.designerId}`}>
                    <div className='search-my-designers-header'>
                      <img className='search-my-designers-image' src={person.designerAvatar} />
                      <div className='search-my-designers-name-rating'>
                        <h1 className='search-my-designers-name'>{person.designerFirstName} {person.designerLastName}</h1>
                        <div className='search-my-designers-ratings-container'>
                          <img id='search-my-designers-ratings-1' src='../images/Dress.png' />
                          <img id='search-my-designers-ratings-2' src='../images/Dress.png' />
                          <img id='search-my-designers-ratings-3' src='../images/Dress.png' />
                          <img id='search-my-designers-ratings-4' src='../images/Dress.png' />
                          <img id='search-my-designers-ratings-5' src='../images/Dress.png' />
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              )
            })
          :
          null}
      </div>
      <div className='search-margin-spacer'></div>
    </div>
  )
}

export default Search;