import { fetch } from './csrf'

const ADD_RECOMMENDATION = 'recommendations/addRecommendation'
const UPDATE_RECOMMENDATION = 'recommendations/updateRecommendation'
const FIND_RECOMMENDATIONS = 'recommendations/findRecommendations'
const DELETE_RECOMMENDATION = 'recommendations/deleteRecommendation'
const SET_USER_RECOMMENDATIONS = 'session/setUserRecommendations'

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

const setUserRecommendations = (recommendations) => {
  return {
    type: SET_USER_RECOMMENDATIONS,
    recommendations,
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

export const recommendationAdd = (recommendation) => async (dispatch) => {
  const { userId, designerId, name, apparelChoice, description, hyperlinksArray, requestId } = recommendation;
  console.log("THIS IS THE STORE QUESTID", requestId)
  const res = await fetch(`/api/recommendations`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      designerId,
      name,
      description,
      hyperlinksArray,
      apparelChoice,
      requestId
    }),
  })
  dispatch(addRecommendation(res.data.recommendation));
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

export const searchUserRecommendations = (recommendations) => async (dispatch) => {
  const { id, userType } = recommendations;
  const res = await fetch(`/api/session/${id}/recommendations/${userType}`, {
    method: 'GET',
  })
  dispatch(findRecommendations(res.data.recommendations));
  return res
}

export const searchRecommendations = (info) => async (dispatch) => {
  const { userType, id } = info;
  const res = await fetch(`/api/recommendations/${id}/${userType}`, {
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
    case ADD_RECOMMENDATION:
      newState = Object.assign({}, state)
      if (newState.recommendations) {
        newState.recommendations[newState.recommendations.length] = action.recommendation
      } else {
        newState.recommendations[0] = action.recommendation
      }
      return newState;
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