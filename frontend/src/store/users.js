import { fetch } from './csrf'

const FIND_USER = 'session/findUser'
const FIND_DESIGNERS = 'tasks/findDesigners'

const findDesigners = (designers) => {
  return {
    type: FIND_DESIGNERS,
    designers
  }
}

const findUser = (user) => {
  return {
    type: FIND_USER,
    user
  }
}

export const searchUser = (urlId) => async (dispatch) => {
  const res = await fetch(`/api/users/${urlId}`, {
    method: 'GET',
  })
  dispatch(findUser(res.data.user));
  return res
}



export const searchDesigners = (coords) => async (dispatch) => {
  const { lat, lng } = coords;
  const res = await fetch(`/api/users`, {
    method: 'POST',
    body: JSON.stringify({
      lat,
      lng
    }),
  })
  dispatch(findDesigners(res.data.users));
  return res
}

const initialState = { user: null }

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_USER:
      newState = Object.assign({}, state)
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
}

export default usersReducer;