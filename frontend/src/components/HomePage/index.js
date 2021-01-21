import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'

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

  let hyperlinksArray;
  let clothes;
  let random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return isLoaded && isLoaded2 &&(
    <div className="homepage-container">
      {Object.values(recommendations).map((rec, idx) => {
        {
          hyperlinksArray = rec.hyperlinks.split(',');
          clothes = rec.apparelChoice.split(',');
          clothes.pop();
          hyperlinksArray.pop();
        }
        return (
          <div key={ idx } className="homepage-container-inside">
            <div className='homepage-feed-box'>
            <img className='homepage-feed-image' src={`${designers[`${rec.designerId}`].avatar}`} />
            <div className='homepage-feed-text'>
              <p className='homepage-feed-names'>{designers[`${rec.designerId}`].firstName} {designers[`${rec.designerId}`].lastName} found clothes for {rec.userFirstName} {rec.userLastName}</p>
              <p className='homepage-feed-title'>{rec.name}</p>
              <p className='homepage-feed-description'>{rec.description}</p>
            </div>
            </div>
            <div className='homepage-feed-likes-comments'>
              {hyperlinksArray.map(function (link) {
                let item = clothes[random(0, (clothes.length - 1))]
                  return (
                    <a href={`${link}`}>
                      <img src={`../images/${item}.ico`} className='homepage-feed-icons' />
                    </a>
                  )
              })}
          </div>
            <div className={`homepage-feed-line ${(recommendations.length - 1 === idx) ? 'homepage-feed-spacer' : null}`} />
        </div>
        )
      })}
      </div>
  )
}

export default HomePage;