import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation'
import SplashPage from './components/SplashPage'
import HomePage from './components/HomePage'


function App() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Switch>
        <Route path="/signup">
          <Navigation isLoaded={isLoaded}/>
          <SignupFormPage />
        </Route>
        <Route path="/">
          {sessionUser ? 
            <HomePage />
            :
            <SplashPage />
        }
        </Route>
      </Switch>
      </>
  );
}

export default App;
