import { fetch } from './csrf'

const SET_USER = 'session/setUser'
const SET_USER_REQUESTS = 'session/setUserRequests'
const SET_USER_RECOMMENDATIONS = 'session/setUserRecommendations'
const REMOVE_USER = 'session/removeUser'

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}

const setUserRequests = (requests) => {
  return {
    type: SET_USER_REQUESTS,
    requests,
  }
}

const setUserRecommendations = (recommendations) => {
  return {
    type: SET_USER_RECOMMENDATIONS,
    recommendations,
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const searchUserRequests = (id) => async (dispatch) => {
  const res = await fetch(`/api/session/${id}/requests`, {
    method: 'GET',
  })
  dispatch(setUserRequests(res.data.requests));
  return res
}

export const searchUserRecommendations = (id) => async (dispatch) => {
  const res = await fetch(`/api/session/${id}/recommendations`, {
    method: 'GET',
  })
  dispatch(setUserRecommendations(res.data.recommendations));
  return res
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  })
  dispatch(setUser(res.data.user))
  return res;
}

export const signup = (user) => async (dispatch) => {
  const { email, username, password, firstName, lastName } = user;
  const userType = true;
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      username,
      password,
      firstName,
      lastName,
      userType
    }),
  })
  dispatch(setUser(res.data.user))
  return res;
}

export const logout = () => async (dispatch) => {
  const res = await fetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return res;
};

const initialState = { user:null, requests:null, recommendations:null }

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case SET_USER_REQUESTS:
      newState = Object.assign({}, state);
      newState.requests = action.requests;
      return newState;
    case SET_USER_RECOMMENDATIONS:
      newState = Object.assign({}, state);
      newState.recommendations = action.recommendations;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export const restoreUser = () => async dispatch => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};

export default sessionReducer;