import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import OpengraphReactComponent from 'opengraph-react'

import * as sessionActions from '../../store/session';

import './HomePage.css';

function HomePage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

//   let logInClick = () => {
//     let path = '/login'
//     history.push(path);
//   }
  
//   let signUpClick = () => {
//     let path = '/signup'
//     history.push(path);
// }
  
const logout = (e) => {
  e.preventDefault();
  dispatch(sessionActions.logout());
  return (
    <Redirect to='/' />
  )
};
  

  return (
    <>
      <div className="homepage-main">
      {/* <OpengraphReactComponent  
        site='https://www.cnn.com/2021/01/06/politics/california-stimulus-check-https://bananarepublicfactory.gapfactory.com/browse/product.do?pid=652909001&grid=pds_1_5_1&rrec=true#pdp-page-contentproposal/index.html'  
        // appId=
        size='small'   
        /> */}
      </div>
      </>
  )
}

export default HomePage;