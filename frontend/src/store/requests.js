import { fetch } from './csrf'

const ADD_REQUEST = 'requests/addRequest'
const UPDATE_REQUEST = 'requests/updateRequest'
const FIND_REQUESTS = 'requests/findRequests'

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

const updateRequest = (request) => {
  return {
    type: UPDATE_REQUEST,
    request,
  }
}

export const requestUpdate = (requestId) => async (dispatch) => {
  const res = await fetch(`/api/requests/`, {
    method: 'PUT',
    body: JSON.stringify({
      requestId
    }),
  })
  dispatch(updateRequest(res.data.request));
  return res
}

export const requestAdd = (request) => async (dispatch) => {
  const { userId, imagesArray, description, designerId, apparelChoice } = request;
  let image = imagesArray;
  let isCompleted = false
  const res = await fetch(`/api/requests/`, {
    method: 'POST',
    body: JSON.stringify({
      isCompleted,
      image,
      description,
      designerId,
      apparelChoice,
      userId
    }),
  })
  dispatch(addRequest(res.data.request));
  return res
}

export const searchRequests = (info) => async (dispatch) => {
  const {id, userType} = info
  const res = await fetch(`/api/requests/${id}/${userType}`, {
    method: 'GET',
  })
  dispatch(findRequests(res.data.requests));
  return res
}

const initialState = { requests: null }

const requestsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_REQUESTS:
      newState = Object.assign({}, state)
      newState.requests = action.requests;
      return newState;
    case ADD_REQUEST:
      newState = Object.assign({}, state)
      if (newState.requests) {
        newState.requests[newState.requests.length] = action.request
      } else {
        newState.requests[0] = action.request
      }
      return newState;
    case UPDATE_REQUEST:
      newState = Object.assign({}, state)
      for (let i = 0; i < newState.requests.length; i++){
        let request = newState.requests[i]
        if (request.id === action.request.requestId) {
          request.isCompleted = action.request.isCompleted
        };
      }
      return newState;
    default:
      return state;
  }
}

export default requestsReducer;