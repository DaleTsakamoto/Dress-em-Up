import { fetch } from './csrf'

const ADD_RATING = 'requests/addRating'
const UPDATE_RATINGS = 'requests/updateRatings'
const FIND_RATINGS = 'requests/findRatings'
const DELETE_RATINGS = 'requests/deleteRatings'

const findRatings = (ratings) => {
  return {
    type: FIND_RATINGS,
    ratings
  }
}

const addRating = (rating) => {
  return {
    type: ADD_RATING,
    rating,
  }
}

const updateRatings = (rating) => {
  return {
    type: UPDATE_RATINGS,
    rating,
  }
}

export const ratingAdd = (rating) => async (dispatch) => {
  const { designerId, userId, designerRating } = rating
  const res = await fetch(`/api/ratings/`, {
    method: 'POST',
    body: JSON.stringify({
      designerRating,
      designerId,
      userId,
    }),
  })
  if (!res.data) {
    console.log("THE RES IS NOTHING!!!!!!!")
    return
  }
  console.log("RETURENED DATA FROM THE STORE!!!!!!!!", Object.keys(res.data.ratingUpdate)[0])
  dispatch(addRating(res.data.ratingUpdate));
  return res
}

export const searchRatings = () => async (dispatch) => {
  const res = await fetch(`/api/ratings`)
  // console.log("THIS IS WHAT RATINGS LOOK LIKE!!?!?!", res.data.ratings)
  dispatch(findRatings(res.data.ratings));
  return res
}

// export const search = (user) => async (dispatch) => {
//   const { urlId } = user;
//   console.log("THE INITIAL URLID", urlId)
//   const res = await fetch(`/api/users/${urlId}/tasks`, {
//     method: 'GET',
//   })
//   dispatch(findTasks(res.data.tasks));
//   return res
// }

const initialState = { ratings: null }

const ratingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_RATINGS:
      newState = Object.assign({}, state)
      newState.ratings = action.ratings;
      return newState;
    case ADD_RATING:
      return { ratings: {...state.ratings, ...action.rating }}
      // console.log("IST IT POSSIBLE TO CONOSLSE LOG HERE!?!?!??!?!??!?", newState.ratings['5'])
      // for (let key in newState.ratings) {
        // console.log("THIS IS A NEWSTATE", key)
        // if (key === Object.keys(action.rating)[0]) {
        //   console.log("OK IS THIS WORKING NOW!?!?!?!", action.rating[key])
          // newState.ratings[action.rating.designerId] = action.rating
        // } else {
        //   newState.ratings[key] = newState.ratings[key]
        // }
      // }
      // return newState;
    // case UPDATE_TASK:
    //   newState = Object.assign({}, state)
    //   console.log(newState.tasks)
    //   for (let i = 0; i < newState.tasks.length; i++){
    //     let task = newState.tasks[i]
    //     console.log(action.task.id)
    //     if (task.id === action.task.id) {
    //       console.log("IT'S WORKING!!!!", action.task.id)
    //       task = action.task
    //     };
    //   }
    //   return newState;
    default:
      return state;
  }
}

export default ratingsReducer;