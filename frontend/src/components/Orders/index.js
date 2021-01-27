import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

import { Modal } from '../../context/Modal';
import NewRecommendation from '../NewRecommendation/NewRecommendation';

import * as sessionActions from '../../store/session';
import * as recommendationActions from '../../store/recommendations';
import * as requestActions from '../../store/requests';
import Upload from '../../imageUploader/Upload'
import Gallery from '../../imageUploader/Gallery'

import './Orders.css';

function Orders() {
  const history = useHistory()
  const dispatch = useDispatch()
  let sessionUser = useSelector(state => state.session.user);
  const userRequests = useSelector(state => state.requests.requests)
  const userRecommendations = useSelector(state => state.recommendations.recommendations)
  const [showModal, setShowModal] = useState(false); 
  const [requestId, setRequestId] = useState(); 
  const [userId, setUserId] = useState(); 
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);

  const componentIsMounted = useRef(true)
  const id = sessionUser.id
  const userType = sessionUser.userType

  useEffect(() => {
    dispatch(recommendationActions.searchRecommendations({ id, userType }))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    dispatch(requestActions.searchRequests({ id, userType }))
    .then(() => setIsLoaded2(true))
  }, [dispatch])

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    }
  }, [])

  const createRecommendation = (e) => {
    let idArray = e.target.parentElement.id.split('-')
    setRequestId(parseInt(idArray[2], 10))
    setUserId(parseInt(idArray[3], 10))
    setShowModal(true)

    // console.log(document.getElementById("myLI").parentElement.nodeName;
  }

  let hyperlinksArray;
  let clothes;
  let random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return isLoaded && isLoaded2 &&(
    <>
    <div className='orders-container'>
      <h1 className='orders-main-header'></h1>
      <div className="orders-requests-container">
        <div className='orders-requests-header-container pattern-cross-dots-lg'>
            <h1 className='orders-requests-header'>Requests</h1>
        </div>
        {userRequests ? Object.values(userRequests).map((req, idx) => {
          return(
        <>
              <div className="orders-request-ind" id={`orders-request-${req.id}-${req.userId}`} key={req.id}>
                {userType ? 
                <h2>Request to {req.designerFirstName} {req.designerLastName}</h2>
                  :
                  <h2>Request from {req.userFirstName} {req.userLastName}</h2>
                }
                <p className='order-requests-ind-message'>Message:</p>
                <p className='order-requests-ind-message-description'>{req.description}</p>
                <div className='orders-requests-images'>
                  <div className='orders-requests-images-container'>
                  {Array.isArray(req.imageUrl)
                    ?
                    req.imageUrl.map((img, idx) => {
                      return (
                        <img key={ idx }className='orders-request-single-image' src={img} />
                      )
                    })
                    :
                    <img className='orders-request-single-image' src={req.imageUrl} />
                }
                </div>
                {!userType ? 
                  <div className='orders-requests-create-modal'onClick={(e) => createRecommendation(e)}>Recommend</div>
                  :
                  null
                }
                </div>
          </div>
          <div className='orders-requests-line'></div>
        </>
          )
        })
        :
        null
      }
      </div>
      <div className="orders-recommendations-container">
        <div className='orders-recommendations-header-container pattern-cross-dots-lg'>
          <h1 className='orders-recommendations-header'>Recommendations</h1>
        </div>
        {Object.values(userRecommendations).map((rec, idx) => {
        {
          hyperlinksArray = rec.hyperlinks.split(',');
          clothes = rec.apparelChoice.split(',');
          clothes.pop();
          hyperlinksArray.pop();
        }
          return (
          <>
          <div key={ idx } className='orders-recommendations-feed'>
            <div className='orders-recommendations-feed-box'>
              <div className='orders-recommendations-feed-text'>
                {userType ? 
                <p className='orders-recommendations-feed-names'>{rec.designerFirstName} {rec.designerLastName} recommended clothes for you!</p>
                  :
                <p className='orders-recommendations-feed-names'>You recommended clothes for {rec.userFirstName} {rec.userLastName}!</p>  
                }
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
      {!sessionUser.userType ?
        <Modal open={showModal} onClose={() => setShowModal(false)} >
          <NewRecommendation open={showModal} onClose={() => setShowModal(false)} setRequestId={setRequestId} setUserId={ setUserId } requestId={requestId} userId={ userId}/>
        </Modal>
        :
        null
      }
    </>
    // </div>
  );
}

export default Orders;