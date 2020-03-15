import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Showcase from "./Containers/Showcase/Showcase";
import Footer from "./Components/Footer/Footer";
import Search from "./Containers/Search/Search";
import Navigation from "./Components/Navigation/Navigation";
import About from "./Containers/About/About";
import CookieWarning from "./Components/CookieWarning/CookieWarning";
import Detail from "./Containers/Detail/Detail";
import Chat from "./Containers/Chat/Chat";
import UserProfile from "./Containers/UserProfile/UserProfile";
import { loginSuccess } from "./redux/actions/actionCreator";

function App({ token, loginSuccess, userName }) {
  let routes;

  useEffect(() => {
    // get token if already authenticated from previous session.
    const data = JSON.parse(localStorage.getItem("userAuth"));
    if (data && data.expirationTime > new Date().getTime()) {
      // check if token is still valid else remove local storage
      loginSuccess(data);
    }
  }, [loginSuccess]);

  if (token) {
    routes = (
      <>
        <Switch>
          <Route path="/" exact>
            <Showcase />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/:type/:id" exact>
            <Detail />
          </Route>
          <Route path="/chat" exact>
            <Chat username={userName} />
          </Route>
          <Route path="/profile" exact>
            <UserProfile />
          </Route>
          <Redirect to="/" />
        </Switch>
      </>
    );
  } else {
    // if not authenticated
    routes = (
      <>
        <Switch>
          <Route path="/" exact>
            <Showcase />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/:type/:id" exact>
            <Detail />
          </Route>
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
  return (
    <>
      <CookieWarning />
      <BrowserRouter>
        <Navigation />
        {routes}
      </BrowserRouter>
      <Footer />
    </>
  );
}

const mapStateToProps = state => ({
  token: state.user.token,
  userName: state.user.userName
});

const mapDispatchToProps = {
  loginSuccess
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
