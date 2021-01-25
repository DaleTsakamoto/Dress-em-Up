import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'

import './SplashPage.css';

function SplashPage() {
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

  return (
    <>
    <div id="overlay-1">
      <img className="homepage-dresser-door-left" src= "./images/Dresser-door-left.png" />
    </div>
    <div id="overlay-2" onLoad={() => setIsLoaded(true)}>
      <img className="homepage-dresser-door-right" src= "./images/Dresser-door-right.png" />
      </div>
      {isLoaded ?
    <div className="homepage-main">
        <div className="about_carousel">
          <div className='homepage-text-logo-container'>
            <img className="homepage-text-logo" src="./images/Text-Logo-Final.png" />
          </div>
          <div className="about_carousel_screens">
            <div id="screen-1">
            <div className="pattern-cross-dots-xl carousel-top-screen">
              <img className="homepage-enter-information" src= "./images/EnterInformation.png" />
              </div>
              <h2>Enter your Information,
                <br/>send out a request</h2>
              <p>Upload a few images and fill out a short questionairre to get the best possible gift for your or your loved one</p>
            </div>
            <div id="screen-2">
            <div className="pattern-cross-dots-xl carousel-top-screen">
              <div className="hompage-designers">
                  <img className="homepage-designer-pic" src="./images/Designer-3.png" />
                  <img className="homepage-designer-pic" src="./images/Designer-2.png" />
                  <img className="homepage-designer-pic" src="./images/Designer-1.png" />
                  <img className="homepage-designer-pic" src="./images/Designer-4.png" />
                  <img className="homepage-designer-pic" src="./images/Designer-5.png" />
                  <img className="homepage-designer-pic" src="./images/Designer-6.png" />
                </div>
              </div>
              <h2>Search designers
                  <br />for your perfect match</h2>
              <p>Connect with the perfect designer and view their profile to see their education and experience</p>
            </div>
            <div id="screen-3">
            <div className="pattern-cross-dots-xl carousel-top-screen">
              <img className="homepage-designer-rec" src= "./images/DesignerClothes.png" />
              </div>
              <h2>Let our designers
                  <br/>go to work for you</h2>
              <p>Each designer will find the best recommendations for you or your significant others and keep you updated on the status of your request.</p>
            </div>
            <div id="screen-4">
            <div className="pattern-cross-dots-xl carousel-top-screen">
              <img className="homepage-fashion-store" src= "./images/Fashion_store.png" />
              </div>
              <h2>Get clothes
                  <br/>that you'll love</h2>
              <p>Receive your recommendations and order clothes conveniently through our online platform or pick them up at a store near you</p>
            </div>
          </div>
        </div>
        <div>
          <nav className="about_carousel_circles">
            <a href="#screen-1" className="circle" />
            <a href="#screen-2" className="circle" />
            <a href="#screen-3" className="circle" />
            <a href="#screen-4" className="circle" />
          </nav>
      </div>
      <div className="homepage-buttons_holder">
          <div className="homepage-button_container">
              <LoginFormModal />
            <SignupFormModal />
        </div>
        <div className='homepage-designers-join'>
          <p>Want to join our team of designers? <a href='/designer-signup'> Help dress 'em up</a> </p>
        </div>
      </div>
        </div>
        :
        null
        }
      </>
  )
}

export default SplashPage;