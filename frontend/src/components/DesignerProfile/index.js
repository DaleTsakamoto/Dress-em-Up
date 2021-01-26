import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'
import { GiLargeDress } from 'react-icons/gi';

import * as sessionActions from '../../store/session';
import * as userActions from '../../store/users'
import * as ratingActions from '../../store/ratings'

import './designerProfile.css';

function DesignerProfile() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const userRecommendations = useSelector(state => state.users.recommendations)
  const userRating = useSelector(state => state.ratings.rating)
  const user = useSelector(state => state.users.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [edit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState(sessionUser.firstName)
  const [lastName, setLastName] = useState(sessionUser.lastName)
  const [email, setEmail] = useState(sessionUser.email)
  const [username, setUsername] = useState(sessionUser.username)
  const [address, setAddress] = useState(sessionUser.address)
  const [city, setCity] = useState(sessionUser.city)
  const [state, setState] = useState(sessionUser.state)
  const [zipCode, setZipCode] = useState(sessionUser.zipCode)
  const [errors, setErrors] = useState([])
  const [dress, setDress] = useState(0)
  const [hover, setHover] = useState (0)
  const id = sessionUser.id
  const currentId = parseInt(window.location.pathname.split('/')[2]);
  
  useEffect(() => {
    dispatch(userActions.searchUser(currentId))
    dispatch(ratingActions.searchRating(currentId))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    dispatch(userActions.searchProfileRecommendations(currentId))
    .then(() => setIsLoaded2(true))
  }, [dispatch])

  let currentRating;
  const renderRating = (num) => {
    let finalRatings =[]
    currentRating = Math.round(num)
      for (let i = 0; i < currentRating; i++) {
        finalRatings.push(<img className={`rate ratings-${i}`} src='../images/Dress-color.png' />)
      }
    for (let j = 0; j < (5 - Math.ceil(currentRating)); j++) {
      finalRatings.push(<img className={`rate ratings-${j + Math.ceil(currentRating)}`} src='../images/Dress.png' />)
    }
    console.log("THESE ARE THE FINAL RATINGS", finalRatings)
    return finalRatings;
  }

  let hyperlinksArray;
  let clothes;
  let random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return isLoaded && isLoaded2 &&(
      <div className="designer-profile-main pattern-cross-dots-lg">
      <div className='designer-profile-header'>
        <div className='designer-profile-header-background'>
          <img src='https://dress-em-up.s3-us-west-1.amazonaws.com/designers/background-profile/05e08f55-bb29-4002-a865-47bd55f96075.jpg'/>
        </div>
        <div className='designer-profile-profile-avatar'>
          {user.avatar ?
            <img src={user.avatar} />
            :
            <i className="fas fa-user-circle"></i>
          }
          </div>
        <div className='designer-profile-header-info'>
          <div className="designer-profile-ratings-container">
          {userRating ? renderRating(userRating.avgRating) : null}
            </div> 
            <h1>{user.firstName} {user.lastName}</h1>
            <h2>{user.username}</h2>
          <h2>{ user.education }</h2>
          </div>
        </div>
        <div className='designer-profile-recent-requests-title'>
          <p>Recent Recommendations</p>
      </div>
      <div className='designer-profile-recent-requests'>
      <div className="orders-recommendations-container">
        {Object.values(userRecommendations).map((rec, idx) => {
        {
          hyperlinksArray = rec.hyperlinks.split(',');
          clothes = rec.apparelChoice.split(',');
          clothes.pop();
          hyperlinksArray.pop();
        }
          return (
          <>
          <div className='orders-recommendations-feed'>
            <div key={ idx } className='orders-recommendations-feed-box'>
            <div className='orders-recommendations-feed-text'>
              <p className='orders-recommendations-feed-names'>{user.firstName} {user.lastName} recommended clothes for { rec.userFirstName } { rec.userLastName }!</p>
              <p className='orders-recommendations-feed-title'>{rec.name}</p>
              <p className='orders-recommendations-feed-description'>{rec.description}</p>
            </div>
            </div>
            <div className='orders-recommendations-feed-likes-comments'>
              {hyperlinksArray.map(function (link) {
                let item = clothes[random(0, (clothes.length - 1))]
                  return (
                    <a href={`${link}`}>
                      <img src={`../images/${item}.ico`} className='orders-recommendations-feed-icons' />
                    </a>
                  )
              })}
          </div>
        </div>
              <div className={`orders-recommendations-feed-line ${(userRecommendations.length - 1 === idx) ? 'orders-recommendations-feed-spacer' : null}`} />
              </>
        )
      })}
        </div>
      </div>
      </div>
  )
}

export default DesignerProfile;




// {[...Array(5)].map((star, index) => {
//   index += 1;
//   return (
//     <label>
//     <input
//       type="radio"
//       className='dress-ratings-radio'
//       name="rating"
//       value={index}
//       onClick={() => setDress(index)}
//       />
//       <GiLargeDress
//         className='dress-ratings'
//         color= {index <= (hover || dress) ? "#DD356E" : "lightgrey"}
//         onMouseEnter={() => setHover(index)}
//         onMouseLeave={() => setHover(dress)}
//       />
//     </label>
//   );
// })}