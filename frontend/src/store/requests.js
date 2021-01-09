import { fetch } from './csrf'

const ADD_REQUEST = 'requests/addRequest'
const UPDATE_REQUEST = 'requests/updateRequest'
const FIND_REQUESTS = 'requests/findRequests'
const DELETE_REQUEST = 'requests/deleteRequest'

const findRequests = (requests) => {
  return {
    type: FIND_REQUESTS,
    requests
  }
}

const addRequest = (request) => {
  return {
    type: ADD_REQUEST,
    request,
  }
}

const updateRequests = (request) => {
  return {
    type: UPDATE_REQUEST,
    request,
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

export const requestAdd = (request) => async (dispatch) => {
  const { userId, images, description, designerId, apparelChoice } = request;
  let image = images;
  const res = await fetch(`/api/requests/${userId}`, {
    method: 'POST',
    body: JSON.stringify({
      image,
      description,
      designerId,
      apparelChoice
    }),
  })
  dispatch(addRequest(res.data.request));
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

const initialState = { requests: null }

const requestsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // case FIND_TASKS:
    //   newState = Object.assign({}, state)
    //   newState.tasks = action.tasks;
    //   return newState;
    case ADD_REQUEST:
      newState = Object.assign({}, state)
      if (newState.requests) {
        newState.requests[newState.requests.length] = action.request
      } else {
        newState.requests[0] = action.request
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

export default requestsReducer;