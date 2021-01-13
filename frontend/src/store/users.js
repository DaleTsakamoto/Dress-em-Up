import { fetch } from './csrf'

const FIND_USER = 'session/findUser'
const FIND_DESIGNERS = 'tasks/findDesigners'
const PURGE_DESIGNERS = 'purge/designers'

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

const purgeDesigners = () => {
  return {
    type: PURGE_DESIGNERS,
  }
}

export const searchUser = (urlId) => async (dispatch) => {
  const res = await fetch(`/api/users/${urlId}`, {
    method: 'GET',
  })
  dispatch(findUser(res.data.user));
  return res
}

export const designerPurge = () => async (dispatch) => {
  dispatch(purgeDesigners());
  return
}

export const searchDesigners = (keywordSearch) => async (dispatch) => {
  let res;
  if (!keywordSearch) {
    res = await fetch(`/api/users`, {
      method: 'GET',
    })
  } else {
    let keywordArray;
    let keywordUrl = `/api/users/?`;
    if (keywordSearch.includes(' ')) {
      keywordArray = keywordSearch.split(' ')
      for (let i = 0; i < keywordArray.length; i++) {
        if (i > 0) {
          keywordUrl += `&q${i}=${keywordArray[i]}`
        } else {
          keywordUrl += `q${i}=${keywordArray[i]}`
        }
      }
    } else {
      keywordUrl += `q0=${keywordSearch}`
    }
    console.log("STORE IS WORKING!!!!!!!!!", keywordUrl)
    res = await fetch(keywordUrl)
  }
  dispatch(findDesigners(res.data.designers));
  return res
}

const initialState = { user: null, designers: null }

const usersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case PURGE_DESIGNERS:
      newState = Object.assign({}, state)
      newState.designers = null;
      return newState;
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