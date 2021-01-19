import { fetch } from './csrf'

const ADD_RECOMMENDATION = 'recommendations/addRecommendation'
const UPDATE_RECOMMENDATION = 'recommendations/updateRecommendation'
const FIND_RECOMMENDATIONS = 'recommendations/findRecommendations'
const DELETE_RECOMMENDATION = 'recommendations/deleteRecommendation'

const findRecommendations = (recommendations) => {
  return {
    type: FIND_RECOMMENDATIONS,
    recommendations
  }
}

const addRecommendation = (recommendation) => {
  return {
    type: ADD_RECOMMENDATION,
    recommendation,
  }
}

const updateRecommendation = (recommendation) => {
  return {
    type: UPDATE_RECOMMENDATION,
    recommendation,
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

// export const requestAdd = (request) => async (dispatch) => {
//   const { userId, images, description, designerId, apparelChoice } = request;
//   let image = images;
//   console.log("THIS IS THE STORE IMAGE", image)
//   const res = await fetch(`/api/requests/${userId}`, {
//     method: 'POST',
//     body: JSON.stringify({
//       image,
//       description,
//       designerId,
//       apparelChoice
//     }),
//   })
//   dispatch(addRequest(res.data.request));
//   return res
// }

// export const search = (user) => async (dispatch) => {
//   const { urlId } = user;
//   console.log("THE INITIAL URLID", urlId)
//   const res = await fetch(`/api/users/${urlId}/tasks`, {
//     method: 'GET',
//   })
//   dispatch(findTasks(res.data.tasks));
//   return res
// }

export const searchRecommendations = (id) => async (dispatch) => {
  const res = await fetch(`/api/recommendations/${id}`, {
    method: 'GET',
  })
  dispatch(findRecommendations(res.data.recommendations));
  return res
}

const initialState = { recommendations: null }

const recommendationsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_RECOMMENDATIONS:
      newState = Object.assign({}, state)
      newState.recommendations = action.recommendations;
      return newState;
    // case ADD_REQUEST:
    //   newState = Object.assign({}, state)
    //   if (newState.requests) {
    //     newState.requests[newState.requests.length] = action.request
    //   } else {
    //     newState.requests[0] = action.request
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

export default recommendationsReducer;