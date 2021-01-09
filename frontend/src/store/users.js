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



export const searchDesigners = () => async (dispatch) => {
  console.log("STORE IS WORKING!!!!!!!!!")
  const res = await fetch(`/api/users`, {
    method: 'GET',
  })
  dispatch(findDesigners(res.data.designers));
  console.log("STORE RES!!!!", res)
  return res
}

const initialState = { user: null, designers: null }

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_USER:
      newState = Object.assign({}, state)
      newState.user = action.user;
      return newState;
    case FIND_DESIGNERS:
      newState = Object.assign({}, state)
      newState.designers = action.designers;
      return newState;
    default:
      return state;
  }
}

export default usersReducer;