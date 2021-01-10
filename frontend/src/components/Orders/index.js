import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

import * as sessionActions from '../../store/session';
import Upload from '../../imageUploader/Upload'
import Gallery from '../../imageUploader/Gallery'

import './Orders.css';

function Orders() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const userRequests = useSelector(state => state.session.requests)
  const userRecommendations = useSelector(state => state.session.recommendations)
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [images, setImages] = useState(null);
  const id = sessionUser.id

  useEffect(() => {
    dispatch(sessionActions.searchUserRequests(id))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    dispatch(sessionActions.searchUserRecommendations(id))
    .then(() => setIsLoaded2(true))
  }, [dispatch])
  

  return isLoaded && isLoaded2 &&(
    <div className='orders-container'>
      <div className="orders-requests-container">
        <div className="orders-request-ind">
          <h2>Request to designer.firstName designer.lastName</h2>
        </div>
      </div>
      <div className="orders-recommendations-container">
        <div className="gallery-container">
        </div>
      </div>
    </div>
  );
}

export default Orders;