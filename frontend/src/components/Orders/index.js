import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'
import axios from 'axios';

import * as sessionActions from '../../store/session';
import Upload from '../../imageUploader/Upload'
import Gallery from '../../imageUploader/Gallery'

import './Orders.css';

function Orders() {
  const history = useHistory()
  const dispatch = useDispatch()
  let sessionUser = useSelector(state => state.session.user);
  const userRequests = useSelector(state => state.session.requests)
  const userRecommendations = useSelector(state => state.session.recommendations)
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [image, setImage] = useState();
  const [currentImageKey, setCurrentImageKey] = useState(null);
  const id = sessionUser.id

  useEffect(() => {
    dispatch(sessionActions.searchUserRequests(id))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    dispatch(sessionActions.searchUserRecommendations(id))
    .then(() => setIsLoaded2(true))
  }, [dispatch])

  const getAWSImage = () => {
    const generateGetUrl = 'api/uploads/get-url';
    const options2 = {
      params: {
        Key: userRequests[0].image,
        ContentType: 'image/jpeg',
        expires: 31536000,
      }
    };
  
    axios.get(generateGetUrl, options2).then(res => {
      const { data: getURL } = res;
      console.log("THIS IS THE RETURNED URL", getURL)
      if (!getURL.message) {
        setCurrentImageKey(getURL)
        return getURL
      }
    });
}

  return isLoaded && isLoaded2 && (
    <div className='orders-container'>
      <div className="orders-requests-container">
        <div className="orders-request-ind">
          <h2>Request to {userRequests[0].designerFirstName} {userRequests[0].designerLastName}</h2>
          <p className='order-requests-ind-message'>Message:</p>
          <p className='order-requests-ind-message-description'>{userRequests[0].description}</p>
          <div className='orders-requests-images'>
            { console.log("THIS IS THE IMAGE!!!!!!!!", userRequests[0].image) }
          <img className='orders-request-single-image' src={currentImageKey} />
        </div>
        </div>
        <div className='orders-requests-line'></div>
      </div>
      <div className="orders-recommendations-container">
        <div className="gallery-container">
        </div>
      </div>
    </div>
  );
}

export default Orders;