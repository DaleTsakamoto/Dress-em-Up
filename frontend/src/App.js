import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from './components/Navigation'
import SplashPage from './components/SplashPage'
import HomePage from './components/HomePage'
import Orders from './components/Orders'
import Search from './components/Search'
import Account from './components/Account'
import Header from './components/Header'
import DesignerSignup from './components/DesignerSignup'
import DesignerProfile from './components/DesignerProfile'


function App({ hideLoadScreen, showLoadScreen }) {
  useEffect(hideLoadScreen, []);
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded &&(
    <>
      <Switch>
        <Route path="/designer-signup">
        {sessionUser ? 
            <>
              <Header />
              <HomePage />
              <Navigation />
            </>
            :
            <DesignerSignup />
        }
        </Route>
        <Route path="/orders">
          <Header />
            <Orders />
          <Navigation />
        </Route>
        <Route path="/search">
          <Header />
          <Search />
          <Navigation />
        </Route>
        {sessionUser ? 
        <Route path='/account'>
          <Header />
          <Account />
          <Navigation />
          </Route>
          :
          null
          
        }
        <Route path={`/users/:id`}>
          <>
            <Header />
            <DesignerProfile />
            <Navigation />
          </>
        </Route>
        <Route path="/">
          {sessionUser ? 
            <>
              <Header />
              <HomePage showLoadScreen={showLoadScreen}/>
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
