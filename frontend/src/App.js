import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation'
import HomePage from './components/HomePage'
import Test from './components/TestPage'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Switch>
      <Route path="/test">
          <Test isLoaded={isLoaded}/>
        </Route>
        <Route path="/signup">
          <Navigation isLoaded={isLoaded}/>
          <SignupFormPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      </>
  );
}

export default App;
