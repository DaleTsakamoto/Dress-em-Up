import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import * as sessionActions from '../../store/session';
import * as userActions from '../../store/users';
import * as recommendationActions from '../../store/recommendations';

import './HomePage.css';

function HomePage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const recommendations = useSelector(state => state.recommendations.recommendations);
  const designers = useSelector(state => state.users.designers);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);

  useEffect(() => {
      dispatch(userActions.searchDesigners())
        .then(() => setIsLoaded(true))
  }, [dispatch])
  
  useEffect(() => {
    let id = sessionUser.id
    dispatch(recommendationActions.searchRecommendations(id))
      .then(() => setIsLoaded2(true))
},[dispatch])

//   let logInClick = () => {
//     let path = '/login'
//     history.push(path);
//   }
  
//   let signUpClick = () => {
//     let path = '/signup'
//     history.push(path);
// }

  

  return isLoaded && isLoaded2 &&(
    <div className="homepage-container">
      {Object.values(recommendations).map((rec, idx) => {
        return (
        <>
          <div className='homepage-feed-box'>
            <img className='homepage-feed-image' src={`${designers[`${rec.designerId}`].avatar}`} />
            <div className='homepage-feed-text'>
              <p className='homepage-feed-names'>{designers[`${rec.designerId}`].firstName} {designers[`${rec.designerId}`].lastName} found clothes for {rec.userFirstName} {rec.userLastName}</p>
              <p className='homepage-feed-title'>{rec.name}</p>
              <p className='homepage-feed-description'>{rec.description}</p>
            </div>
            </div>
            <div className='homepage-feed-likes-comments'>
              <img src='../images/dress-stand.ico' className='homepage-feed-dress' />
          </div>
          <div className='homepage-feed-line' />
        </>
        )
      })}
      </div>
  )
}

export default HomePage;