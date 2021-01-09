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
      <div className='homepage-feed'>
        <p className='homepage-feed-names'>{designers['3'].firstName} {designers['3'].lastName} found clothes for { recommendations[0].userFirstName} { recommendations[0].userLastName}</p>
      </div>
      </div>
  )
}

export default HomePage;