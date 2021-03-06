import { fetch } from './csrf'
import axios from 'axios';

const SET_USER = 'session/setUser'
const SET_USER_DESIGNERS = 'session/setUserDesigners'
const REMOVE_USER = 'session/removeUser'

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}

const setUserDesigners = (designers) => {
  return {
    type: SET_USER_DESIGNERS,
    designers,
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const searchUserDesigners = (id) => async (dispatch) => {
  const res = await fetch(`/api/session/${id}/designers`, {
    method: 'GET',
  })
  dispatch(setUserDesigners(res.data.designers));
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
  const { email, username, password, firstName, lastName, active, description, resume } = user;
  let userType;
  if (active === false) {
    userType = false
  } else {
    userType = true
  }
  const res = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      email,
      username,
      password,
      firstName,
      lastName,
      userType,
      active,
      description,
      resume
    }),
  })
  dispatch(setUser(res.data.user))
  return res;
}

export const userUpdate = (user) => async (dispatch) => {
  const { email, username, firstName, lastName, address, city, state, zipCode, id, education } = user;
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      education,
      email,
      username,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode
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

const initialState = { user:null, designers:null }

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case SET_USER_DESIGNERS:
      newState = Object.assign({}, state);
      newState.designers = action.designers;
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