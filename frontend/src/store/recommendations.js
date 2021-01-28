import { fetch } from './csrf'

const ADD_RECOMMENDATION = 'recommendations/addRecommendation'
const FIND_RECOMMENDATIONS = 'recommendations/findRecommendations'

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

export const recommendationAdd = (recommendation) => async (dispatch) => {
  const { userId, designerId, name, apparelChoice, description, hyperlinksArray, requestId } = recommendation;
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
    default:
      return state;
  }
}

export default recommendationsReducer;