import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './NewRating.css';

import { GiLargeDress } from 'react-icons/gi';

import * as ratingActions from '../../store/ratings';
import * as recommendationActions from '../../store/recommendations';

function NewRating({open, onClose, designerId, designerName}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const ratings = useSelector(state => state.ratings.ratings)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState([])
  const [designerRating, setDesignerRating] = useState(0)
  const [hover, setHover] = useState (0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hidden, setHidden] = useState(true)
  const userId = sessionUser.id

  useEffect(() => {
    console.log("THESE ARE THE RATINGS", ratings)
    ratings.forEach((rating) => {
      if (rating.designerId === designerId && rating.userId === userId) {
        setComment(rating.comment)
        setDesignerRating(rating.designerRating)
        setHover(rating.designerRating)
      }
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("RATING BUTTON BEING TRIGGERED!!!!!")
    if (hidden) {
      setHidden(false)
    }
    dispatch(ratingActions.ratingAdd({ userId, designerId, comment, designerRating }))
      .then(() => onClose())
        .catch(res => {
          if (res.data && res.data.errors) {
            setErrors(res.data.errors)
          } else {
            return setErrors([])
          }
        })
    return errors;
  };

  return (
    <div className='new-rating-modal-container'>
    <div className={`${open ? 'new-rating-form-holder-open scale-up-center' : hidden ? 'new-rating-form-holder-close new-rating-hide' : 'new-rating-form-holder-close scale-down-center'}`}>
        <div className='new-rating-header'>
        <i class="far fa-window-close" onClick={() => {
          if (hidden) {
            setHidden(false)
          }
          onClose()
        }
        }></i>
      </div>
        <img id="new-rating-load-screen-image-top" src="../images/clothesline-top.png"/>
        <h1 className='new-rating-form-title'>Leave a Review</h1>
      <div className='new-rating-form-container-background'>
          <div className='new-rating-main-form-container'>
          <form id='new-rating-form' onSubmit={handleSubmit}
            className="new-rating-form">
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
              </ul>
              <div className="new-rating-dress-ratings-holder">
              {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <label>
                    <input
                      type="radio"
                      className='dress-ratings-radio'
                      name="rating"
                      value={index}
                      onClick={() => setDesignerRating(index)}
                      />
                      <GiLargeDress
                        className='dress-ratings'
                        color= {index <= (hover || designerRating) ? "#fef0bc" : "#DD356E"}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(designerRating)}
                      />
                    </label>
                  );
                })}
              </div>
          <div className='new-rating-textarea-holder'>
              <textarea
              name='comment'
              className='new-rating-input-description'
              placeholder={`${designerName} is fantastic because...`}
              value={comment}
              onChange={ e => setComment(e.target.value) }
              required
            />
          </div>
        <div className='new-rating-button-holder'>
                <button onClick={ (e) => handleSubmit(e) }type="submit" className="new-rating-button">Review!</button>
        </div>
            </form>
            </div>
      </div>
      {/* </div> */}
      </div>
      </div>
);
}

export default NewRating; 