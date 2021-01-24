import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './NewRecommendation.css';

import * as requestActions from '../../store/requests';
import * as userActions from '../../store/users';
import * as recommendationActions from '../../store/recommendations';

function NewRecommendation({open, onClose, userId}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const designers = useSelector(state => state.users.newRequest)
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [apparelChoice, setApparelChoice] = useState([])
  const [hyperlinksArray, setHyperlinksArray] = useState(['', '', ''])
  // const [designerId, setDesignerId] = useState(null)
  const [errors, setErrors] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [hidden, setHidden] = useState(true)
  const designerId = sessionUser.id

//   useEffect(() => {
//     dispatch(userActions.searchNewRequestDesigners())
//       .then((res) => {
//         setDesignerId(Object.values(res.data.designers)[0].id)
//       })
//       .then(() => setIsLoaded(true))
// }, [dispatch])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (hidden) {
      setHidden(false)
    }
    dispatch(recommendationActions.recommendationAdd({ userId, description, designerId, apparelChoice, hyperlinksArray }))
        .catch(res => {
          if (res.data && res.data.errors) {
            setErrors(res.data.errors)
          } else {
            return setErrors([])
          }
        })
      .then(() => submitClear())
    return errors;
  };

  const checkedApparel = (e) => {
    if (e.target.checked) {
      setApparelChoice([...apparelChoice, e.target.name])
    } else {
      apparelChoice.splice(apparelChoice.indexOf(e.target.name), 1)
    }
  }


  const submitClear = () => {
    setHyperlinksArray(['', '', ''])
    setName('')
    setDescription('')
    setApparelChoice([])
    onClose()
  }

  return(
    <div className={`${open ? 'new-recommendation-form-holder-open' : hidden ? 'new-recommendation-form-holder-close new-recommendation-hide' : 'new-recommendation-form-holder-close'}`}>
        <div className='new-recommendation-header'>
        <i class="fas fa-arrow-left" onClick={() => {
          if (hidden) {
            setHidden(false)
          }
          onClose()
        }
        }></i>
      </div>
      <h1 className='new-recommendation-form-title'>New Recommendation</h1>
      <div className='pattern-cross-dots-lg new-recommendation-form-container-background'>
          <h1 className='new-recommendation-form-subtitle-2'>More Details</h1>
          <div className='new-recommendation-main-form-container'>
          <form onSubmit={handleSubmit}
            className="new-recommendation-form">
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
        </ul>
          <div className='new-recommendation-name-holder'>
            <input
              name='name'
              className='signup-input-name'
              placeholder='Name'
              value={name}
              onChange={ e => setName(e.target.value) }
              required
            />
            </div>
          <div className='new-recommendation-hyperlinks-holder'>
            <input
              className='signup-input-hyperlinks'
              placeholder='hyperlink'
              value={hyperlinksArray[0]}
              type='text'
              onChange={ e => setHyperlinksArray[0](e.target.value) }
              required
            />
            <input
              className='signup-input-hyperlinks'
              placeholder='hyperlink'
              value={hyperlinksArray[1]}
              type='text'
              onChange={ e => setHyperlinksArray[1](e.target.value) }
              required
            />
            <input
              className='signup-input-hyperlinks'
              placeholder='optional hyperlink'
              value={hyperlinksArray[2]}
              type='text'
              onChange={ e => setHyperlinksArray[2](e.target.value) }
            />
          </div>
          <div className='new-recommendation-textarea-holder'>
            <label id='description-label' htmlFor='description'>Description</label>
              <textarea
              name='description'
              className='signup-input-description'
              placeholder='Give more details'
              value={description}
              onChange={ e => setDescription(e.target.value) }
              required
            />
          </div>
          <h2 className='new-recommendation-clothing-type'>Type of Clothing</h2>
            <div className='new-recommendation-input-holder'>
              <div className='new-recommendation-input-holder-ind'>
                <label htmlFor='outerwear'>Outerwear</label>
                <input
                  onChange={e => checkedApparel(e)}
                  name='outerwear'
                  type='checkbox'
                />
              </div>
              <div className='new-recommendation-input-holder-ind'>
                <label htmlFor='dress'>Dress</label>
                <input
                  onChange={e => checkedApparel(e)}
                  name='dress'
                  type='checkbox'
                />
              </div>
              <div className='new-recommendation-input-holder-ind'>
                <label htmlFor='pants'>Pants</label>
                <input
                onChange={e => checkedApparel(e)}
                name='pants'
                type='checkbox'
                />
              </div>
              <div className='new-recommendation-input-holder-ind'>
                <label htmlFor='shirt'>Shirt</label>
                <input
                  onChange={e => checkedApparel(e)}
                  name='shirt'
                  type='checkbox'
                />
              </div>
              <div className='new-recommendation-input-holder-ind'>
                <label htmlFor='other'>Other</label>
                <input
                  onChange={e => checkedApparel(e)}
                  name='other'
                  type='checkbox'
                />
              </div>
        </div>
        <div className='new-recommendation-button-holder'>
          <button type="submit" className="new-recommendation-button">Send Recommendation</button>
        </div>
            </form>
            </div>
      </div>
      {/* </div> */}
      </div>
);
}

export default NewRecommendation; 