import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation'
import SplashPage from './components/SplashPage'
import HomePage from './components/HomePage'
import Orders from './components/Orders'
import Search from './components/Search'
import Account from './components/Account'
import Header from './components/Header'


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
          <SignupFormPage />
        </Route>
        <Route path="/orders">
          <Orders />
          <Navigation />
        </Route>
        <Route path="/search">
          <Search />
          <Navigation />
        </Route>
        <Route path="/account">
          <Account />
          <Navigation />
        </Route>
        <Route path="/">
          {sessionUser ? 
            <>
              <Header />
              <HomePage />
              <Navigation />
            </>
            :
            <SplashPage />
        }
        </Route>
      </Switch>
      </>
  );
}

export default App;
