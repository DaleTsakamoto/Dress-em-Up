import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'
import { GiLargeDress } from 'react-icons/gi';

import * as sessionActions from '../../store/session';
import * as userActions from '../../store/users'
import * as ratingActions from '../../store/ratings'

import './Search.css';

function Search() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const designersSearch = useSelector(state => state.users.designers);
  const userDesigners = useSelector(state => state.session.designers)
  const designerRatings = useSelector(state => state.ratings.ratings)
  const [keywordSearch, setKeywordSearch] = useState('')
  const [isLoaded, setIsLoaded] = useState(false);
  let id = sessionUser.id;

  useEffect(() => {
    dispatch(userActions.designerPurge())
    dispatch(sessionActions.searchUserDesigners(id))
    dispatch(ratingActions.searchRatings())
    .then(() => setIsLoaded(true))
  }, [dispatch])
  
  // useEffect(() => {
  //   console.log("THE RATINGS USE EFFECT IS WORKING!!")
  //   dispatch(ratingActions.searchRatings(2))
  // },[])

  // useEffect(() => {
  //   dispatch(userActions.designerPurge())
  //   .then(setIsLoaded(true))
  // },[])

  // const addRating = (e) => {
  //   let designerRating;
  //   if (e.target.classList[1] === 'ratings-0') {
  //     designerRating = 1;
  //   } else if (e.target.classList[1] === 'ratings-1'){
  //     designerRating = 2;
  //   } else if (e.target.classList[1] === 'ratings-2') {
  //     designerRating = 3;
  //   } else if (e.target.classList[1] === 'ratings-3') {
  //     designerRating = 4;
  //   } else {
  //     designerRating = 5;
  //   }
  //   // console.log("THIS IS THE TARGET!!!!?!?!?!", e.target.parentNode.classList[0].slice(3))
  //   const designerId = parseInt(e.target.parentNode.classList[0].slice(3))
  //   let userId = id
  //   designerRating = parseInt(designerRating)
  //   let designer = { userId, designerId, designerRating }
  //   dispatch(ratingActions.ratingAdd(designer))
  // }

  // const halfRatings = (num) => {
  //   return (Math.round(num * 2) / 2).toFixed(1)
  // }

  let currentRating;
  const renderRatings = (num) => {
    let finalRatings =[]
    currentRating = Math.round(num)
    // if (currentRating % 1 === 0) {
      for (let i = 0; i < currentRating; i++) {
        finalRatings.push(<img className={`rate ratings-${i}`} src='../images/Dress-color.png' />)
      }
    // } else {
    //   for (let i = 0; i < Math.floor(currentRating); i++) {
    //     finalRatings.push(<img onClick={ (e) => addRating(e) } className={`rate ratings-${i}`} src='../images/Dress-color.png' />)
    //   }
    //     finalRatings.push(<img onClick={ (e) => addRating(e) } className={`rate ratings-${Math.floor(currentRating)}`} id='search-my-designers-ratings-half-dress' src='../images/Dress-half-color.png' />)
    // }
    for (let j = 0; j < (5 - Math.ceil(currentRating)); j++) {
      finalRatings.push(<img className={`rate ratings-${j + Math.ceil(currentRating)}`} src='../images/Dress.png' />)
    }
    return finalRatings;
  }

  const renderRatings2 = (num) => {
    let finalRatings =[]
    currentRating = Math.round(num)
    // if (currentRating % 1 === 0) {
      for (let i = 0; i < currentRating; i++) {
        finalRatings.push(<img className={`ratings-${i}`} src='../images/Dress-color.png' />)
      }
    // } else {
    //   for (let i = 0; i < Math.floor(currentRating); i++) {
    //     finalRatings.push(<img onClick={ (e) => addRating(e) } className={`rate ratings-${i}`} src='../images/Dress-color.png' />)
    //   }
    //     finalRatings.push(<img onClick={ (e) => addRating(e) } className={`rate ratings-${Math.floor(currentRating)}`} id='search-my-designers-ratings-half-dress' src='../images/Dress-half-color.png' />)
    // }
    for (let j = 0; j < (5 - Math.ceil(currentRating)); j++) {
      finalRatings.push(<img className={`ratings-${j + Math.ceil(currentRating)}`} src='../images/Dress.png' />)
    }
    return finalRatings;
  }

  const activateSearch = () => {
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
            if (person.active) {
              return (
                <div key={idx} className='search-my-designers-individual'>
                  <NavLink className='search-my-designers-navlinks' to={`/users/${person.id}`}>
                    <div className='search-my-designers-header'>
                      <img className='search-my-designers-image' src={person.avatar} />
                      <div className='search-my-designers-name-rating'>
                        <h1 className='search-my-designers-name'>{person.firstName} {person.lastName}</h1>
                        <div className={`did${designerRatings[`${person.id}`].designerId} search-my-designers-ratings-container`}>
                          {renderRatings2(designerRatings[`${person.id}`].avgRating)}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                </div>
              )
            }
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
                      <div className={`did${designerRatings[`${person.designerId}`].designerId} search-my-designers-ratings-container`}>
                        {renderRatings(designerRatings[`${person.designerId}`].avgRating)}
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