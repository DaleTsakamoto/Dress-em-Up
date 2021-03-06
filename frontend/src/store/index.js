import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import sessionReducer from './session';
import usersReducer from './users'
import requestsReducer from './requests'
import recommendationsReducer from './recommendations';
import ratingsReducer from './ratings'


const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  requests: requestsReducer,
  recommendations: recommendationsReducer,
  ratings: ratingsReducer,
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk)
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;