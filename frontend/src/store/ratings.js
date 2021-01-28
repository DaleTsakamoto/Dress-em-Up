import { fetch } from './csrf'

const ADD_RATING = 'requests/addRating'
const FIND_RATING = 'requests/findRating'
const FIND_RATINGS = 'requests/findRatings'

const findRatings = (ratings) => {
  return {
    type: FIND_RATINGS,
    ratings
  }
}

const findRating = (rating) => {
  return {
    type: FIND_RATING,
    rating
  }
}

const addRating = (ratingAvg, rating) => {
  return {
    type: ADD_RATING,
    ratingAvg,
    rating
  }
}

export const ratingAdd = (rating) => async (dispatch) => {
  const { designerId, userId, designerRating, comment } = rating
  const res = await fetch(`/api/ratings/`, {
    method: 'POST',
    body: JSON.stringify({
      designerRating,
      designerId,
      userId,
      comment,
    }),
  })
  if (!res.data) {
    return
  }
  dispatch(addRating(res.data.ratingAvg, res.data.rating));
  return res
}

export const searchRatings = () => async (dispatch) => {
  const res = await fetch(`/api/ratings`)
  dispatch(findRatings(res.data.ratings));
  return res
}

export const searchRating = (id) => async (dispatch) => {
  const res = await fetch(`/api/ratings/${id}`)
  dispatch(findRating(res.data.rating[0]));
  dispatch(findRatings(res.data.ratings));
  return res
}

const initialState = { ratings: null, rating: null }

const ratingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_RATINGS:
      newState = Object.assign({}, state)
      newState.ratings = action.ratings;
      return newState;
    case FIND_RATING:
      newState = Object.assign({}, state)
      newState.rating = action.rating;
      return newState;
    case ADD_RATING:
      newState = Object.assign({}, state)
      let changed = false;
      for (let i = 0; i < newState.ratings.length; i++){
        let rating = newState.ratings[i]
        if (rating.designerId === action.rating.designerId && rating.userId === action.rating.userId) {
          newState.ratings[i].designerRating = action.rating.designerRating
          newState.ratings[i].id = action.rating.id
          newState.ratings[i].comment = action.rating.comment
          changed = true
        } 
      }
      if (!changed) {
        newState.rating.designerRating = action.rating.designerRating
        newState.rating.id = action.rating.id
        newState.rating.comment = action.rating.comment
        newState.ratings = [...state.ratings, action.rating ] 
      }
      newState.rating = action.ratingAvg
      return newState
    default:
      return state;
  }
}

export default ratingsReducer;