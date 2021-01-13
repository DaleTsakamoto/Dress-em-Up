import { fetch } from './csrf'

const ADD_RATINGS = 'requests/addRatings'
const UPDATE_RATINGS = 'requests/updateRatings'
const FIND_RATINGS = 'requests/findRatings'
const DELETE_RATINGS = 'requests/deleteRatings'

const findRatings = (ratings) => {
  return {
    type: FIND_RATINGS,
    ratings
  }
}

const addRatings = (ratings) => {
  return {
    type: ADD_RATINGS,
    ratings,
  }
}

const updateRatings = (ratings) => {
  return {
    type: UPDATE_RATINGS,
    ratings,
  }
}

// export const taskUpdate = (task) => async (dispatch) => {
//   const { taskId, urlId, name, userId } = task
//   const res = await fetch(`/api/users/${urlId}/tasks`, {
//     method: 'PATCH',
//     body: JSON.stringify({
//       taskId,
//       urlId,
//       userId,
//       name
//     }),
//   })
//   dispatch(updateTask(res.data.task));
//   return res
// }

export const searchRatings = () => async (dispatch) => {
  const res = await fetch(`/api/ratings`)
  console.log("RESPONSE FROM THE RATINGS BACKEND!!?!?!?!??!?!?!?", res);
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
    // case ADD_RATINGS:
    //   newState = Object.assign({}, state)
    //   if (newState.ratings) {
    //     newState.ratings[newState.ratings.length] = action.ratings
    //   } else {
    //     newState.ratings[0] = action.ratings
    //   }
    //   return newState;
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