import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

import * as sessionActions from '../../store/session';
import * as userActions from '../../store/users'

import './designerProfile.css';

function DesignerProfile() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const userRecommendations = useSelector(state => state.users.recommendations)
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
  const id = sessionUser.id
  const currentId = parseInt(window.location.pathname.split('/')[2]);
  
  useEffect(() => {
    dispatch(userActions.searchUser(currentId))
    .then(() => setIsLoaded(true))
  }, [dispatch])
  
  // useEffect(() => {
  //   let id = currentId
  //   dispatch(sessionActions.searchUserRecommendations(id))
  //   .then(() => setIsLoaded2(true))
  // }, [dispatch])

  useEffect(() => {
    dispatch(userActions.searchProfileRecommendations(currentId))
    .then(() => setIsLoaded2(true))
  }, [dispatch])

  const logout = (e) => {
    dispatch(sessionActions.logout())
    let path = '/'
    return history.push(path);
  };

  const editAccount = () => {
    setErrors([])
    setEdit(true);
  }

  const updateProfile = () => {
    if (username !== 'Demo_user' && username !== 'Demo_designer') {
      setEdit(false);
      setUsername(sessionUser.username)
      return setErrors(['You may not change the demo_user username!!'])
    }
    dispatch(sessionActions.userUpdate({ firstName, lastName, email, username, address, city, state, zipCode, id }))
      .catch(res => {
      if (res.data && res.data.errors) setErrors(res.data.errors);
    })
    setEdit(false);
    return
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
          {/* <img src='./images/fashion-designer-desk.jpg' /> */}
          <img src='https://dress-em-up.s3-us-west-1.amazonaws.com/designers/background-profile/05e08f55-bb29-4002-a865-47bd55f96075.jpg'/>
        </div>
        <div className='designer-profile-profile-avatar'>
          {user.avatar ?
            <img src={user.avatar} />
            :
            <i className="fas fa-user-circle"></i>
          }
          </div>
          {edit ? 
          <>
            <div className='designer-profile-input-container-name'>
              <div className='designer-profile-input-holder-name'>
                <input
                  className='designer-profile-input-first-name'
                  value={firstName}
                  type='text'
                  placeholder='first'
                  onChange={ e => setFirstName(e.target.value) }
              />
                <input
                  className='designer-profile-input-last-name'
                  value={lastName}
                  type='text'
                  placeholder='last'
                  onChange={ e => setLastName(e.target.value) }
                />
                </div>
              </div>
              <input
                className='designer-profile-input-username'
                value={username}
                type='text'
                placeholder='username'
                onChange={ e => setUsername(e.target.value) }
              />
            <p onClick={updateProfile}>Save</p>
          </>
          :
          <div className='designer-profile-header-info'>
            <h1>{user.firstName} {user.lastName}</h1>
            <h2>{user.username}</h2>
            <h2>Walden University</h2>
            {currentId === id ? 
              <p onClick={editAccount}>Edit Account</p>
              :
              null 
          }
          </div>
        }
          <ul>
          {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
          ))}
        </ul>
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
        {/* <div className='designer-profile-places-spacer'></div> */}
      <div className='designer-profile-logout' onClick={logout}><p>Log Out</p></div>
      </div>
  )
}

export default DesignerProfile;