import { fetch } from './csrf'

const ADD_REQUEST = 'requests/addRequest'
const UPDATE_REQUEST = 'requests/updateRequest'
const FIND_REQUESTS = 'requests/findRequests'
// const FIND_REQUEST = 'requests/findRequest'
const DELETE_REQUEST = 'requests/deleteRequest'

const findRequests = (requests) => {
  return {
    type: FIND_REQUESTS,
    requests
  }
}

// const findRequest = (request) => {
//   return {
//     type: FIND_REQUEST,
//     request
//   }
// }

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
  const { userId, imagesArray, description, designerId, apparelChoice } = request;
  let image = imagesArray;
  console.log("THIS IS THE STORE AND THE IMAGES ARRAY!?!?!", image)
  let isCompleted = false
  const res = await fetch(`/api/requests/${userId}`, {
    method: 'POST',
    body: JSON.stringify({
      isCompleted,
      image,
      description,
      designerId,
      apparelChoice
    }),
  })
  dispatch(addRequest(res.data.request));
  return res
}

// export const searchRequest = (request) => async (dispatch) => {
//   const { image } = request;
//   console.log("THE INITIAL IMAGE", image)
//   const res = await fetch(`/api/requests/${image}`, {
//     method: 'GET',
//   })
//   dispatch(findRequest(res.data.request));
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