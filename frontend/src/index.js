import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App';
import configureStore from './store'
import { restoreCSRF, fetch } from './store/csrf';
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

const loader = document.querySelector('.load-screen');
const showLoadScreen = () => loader.classList.remove('load-screen--hide');
const hideLoadScreen = () => loader.classList.add('load-screen--hide');
document.getElementById('load-screen-image-top').src = './images/clothesline-top.png'
// document.getElementById('load-screen-image-front').src = './images/load-dress.jpg'
// document.getElementById('load-screen-image-city').src = './images/cityscape.png'
document.getElementById('load-screen-loading').innerHTML = 'Loading...'

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App
          hideLoadScreen={hideLoadScreen}
          showLoadScreen={showLoadScreen}
        />
      </BrowserRouter>
    </Provider>
  )
}

setTimeout(() => 
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
  )
  , 3500);
