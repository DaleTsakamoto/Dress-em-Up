import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  const [isLoaded3, setIsLoaded3] = useState(false);
  const [image, setImage] = useState();
  const [currentImageKey, setCurrentImageKey] = useState([]);
  const componentIsMounted = useRef(true)
  const id = sessionUser.id

  useEffect(() => {
    dispatch(sessionActions.searchUserRequests(id))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    dispatch(sessionActions.searchUserRecommendations(id))
    .then(() => setIsLoaded2(true))
  }, [dispatch])

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    }
  }, [])

  // useEffect(() => {
  //   let testArray = [];
  //   const getAWSImage = async () => {
  //     Object.values(userRequests).map((req, idx) => {
  //         console.log("THIS IS THE IMAGE EACH TIME", req.image)
  //         const generateGetUrl = 'api/uploads/get-url';
  //         const options2 = {
  //           params: {
  //             Key: req.image,
  //             ContentType: 'image/jpeg',
  //             expires: 31536000,
  //           }
  //         };
    
  //         axios.get(generateGetUrl, options2).then(res => {
  //           const { data: getURL } = res;
  //           console.log("THIS IS THE RETURNED URL", getURL)
  //           if (!getURL.message && componentIsMounted.current) {
  //             setCurrentImageKey([getURL, ...currentImageKey])
  //             testArray.push(getURL)
  //             // console.log("THIS IS THE CURRENTIMAGEKEY", currentImageKey)
  //             return getURL
  //           }
  //         });
  //       })
  //     }
  //   if (userRequests) {
  //       console.log(userRequests)
  //       getAWSImage()
  //         .then(() => {
  //           setIsLoaded3(true)
  //           console.log("THIS IS THE TEST ARRAY!!@)!*434", testArray)
  //         }
  //         )
  //     }
  // }, [userRequests])
  
  // let renderImages = async () => {
  //   Object.values(userRequests).map( async (req, idx) => {
  //     // await getAWSImage(req.image)
  //     return(
  //   <>
  //     <div className="orders-request-ind" key={idx }>
  //       <h2>Request to {req.designerFirstName} {req.designerLastName}</h2>
  //       <p className='order-requests-ind-message'>Message:</p>
  //       <p className='order-requests-ind-message-description'>{req.description}</p>
  //       <div className='orders-requests-images'>
  //         { console.log("THIS IS THE IMAGE!!!!!!!!", req.image) }
  //       <img className='orders-request-single-image' src={currentImageKey} />
  //       </div>
  //     </div>
  //     <div className='orders-requests-line'></div>
  //   </>
  //   )})
  // }

  let hyperlinksArray;
  let clothes;
  let random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return isLoaded && isLoaded2 &&(
    <div className='orders-container'>
      <h1 className='orders-main-header'>Orders</h1>
      <div className="orders-requests-container">
        <div className='orders-requests-header-container pattern-cross-dots-lg'>
          <h1 className='orders-requests-header'>Requests</h1>
        </div>
        {userRequests ? Object.values(userRequests).map((req, idx) => {
          // getAWSImage(req.image)
          return(
        <>
          <div className="orders-request-ind" key={idx}>
            <h2>Request to {req.designerFirstName} {req.designerLastName}</h2>
            <p className='order-requests-ind-message'>Message:</p>
            <p className='order-requests-ind-message-description'>{req.description}</p>
            <div className='orders-requests-images'>
            <img className='orders-request-single-image' src={req.imageURL} />
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
          <div className='orders-recommendations-feed'>
            <div key={ idx } className='orders-recommendations-feed-box'>
            <div className='orders-recommendations-feed-text'>
              <p className='orders-recommendations-feed-names'>{rec.designerFirstName} {rec.designerLastName} recommended clothes for you!</p>
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
    // </div>
  );
}

export default Orders;