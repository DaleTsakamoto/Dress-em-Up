import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Modal } from '../../context/Modal';
import NewRating from '../NewRating/NewRating';

import * as userActions from '../../store/users'
import * as ratingActions from '../../store/ratings'

import './designerProfile.css';

function DesignerProfile() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const userRating = useSelector(state => state.ratings.rating)
  const ratings = useSelector(state => state.ratings.ratings)
  const user = useSelector(state => state.users.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const id = sessionUser.id
  const currentId = parseInt(window.location.pathname.split('/')[2]);
  


  useEffect(() => {
    dispatch(userActions.searchUser(currentId))
    dispatch(ratingActions.searchRating(currentId))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  const returnHome = () => {
    history.push('/');
  }

  let currentRating;
  const renderRating = (num) => {
    let finalRatings =[]
    currentRating = Math.round(num)
      for (let i = 0; i < currentRating; i++) {
        finalRatings.push(<img alt='dress rating' className={`rate ratings-${i}`} src='../images/Dress-color.png' />)
      }
    for (let j = 0; j < (5 - Math.ceil(currentRating)); j++) {
      finalRatings.push(<img alt='dress rating' className={`rate ratings-${j + Math.ceil(currentRating)}`} src='../images/Dress-clear.png' />)
    }
    return finalRatings;
  }

  return isLoaded && (
    <div className="designer-profile-main pattern-cross-dots-lg">
        {user.userType ? returnHome() : null}
      <div className='designer-profile-header'>
        <div className='designer-profile-header-background'>
          <img alt='user avatar' src='https://dress-em-up.s3-us-west-1.amazonaws.com/designers/background-profile/05e08f55-bb29-4002-a865-47bd55f96075.jpg'/>
        </div>
        <div className='designer-profile-profile-avatar'>
          {user.avatar ?
            <img alt='user avatar' src={user.avatar} />
            :
            <i className="fas fa-user-circle"></i>
          }
          </div>
        <div className='designer-profile-header-info'>
          {sessionUser.userType ?
          <div className="designer-profile-ratings-container add-cursor" onClick={() => setShowModal(true)}>
              <span class="designer-profile-ratings-container__hover" onClick={() => setShowModal(true)}>Leave a Review</span>
            {userRating ? renderRating(userRating.avgRating) : null}
          </div> 
          :
          <div className="designer-profile-ratings-container">
            {userRating ? renderRating(userRating.avgRating) : null}
          </div> 
          }
            <h1>{user.firstName} {user.lastName}</h1>
            <h2>{user.username}</h2>
          <h2>{ user.education }</h2>
          </div>
        </div>
        <div className='designer-profile-recent-requests-title'>
          <p>Reviews</p>
      </div>
      <div className='designer-profile-recent-requests'>
      <div className="designer-profile-container">
        {Object.values(ratings).map((rating, idx) => {
          return (
          <div key={ idx }>
          <div className='designer-profile-feed'>
          <div className='designer-profile-feed-box'>
            <img className='designer-profile-users-image' src={rating.userAvatar} />
            <div className='designer-profile-feed-text'>
                <p className='designer-profile-feed-names'>{rating.userFirstName} {rating.userLastName.slice(0, 1).toUpperCase()}.</p>
                <div className="designer-profile-ratings-container-ind">
                  {renderRating(rating.designerRating)}
                </div>
              <p className='designer-profile-feed-description'>{rating.comment}</p>
            </div>
            </div>
        </div>
              <div className={`designer-profile-feed-line ${(ratings.length - 1 === idx) ? 'designer-profile-feed-spacer' : null}`} />
              </div>
        )
      })}
        </div>
      </div>
      {sessionUser.userType ?
        <Modal open={showModal} onClose={() => setShowModal(false)} >
          <NewRating open={showModal} onClose={() => setShowModal(false)} designerId={currentId} designerName={ user.firstName }/>
        </Modal>
        :
        null
      }
      </div>
  )
}

export default DesignerProfile;