import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Showcase from "./Containers/Showcase/Showcase";
import Footer from "./Components/Footer/Footer";
import Search from "./Containers/Search/Search";
import Navigation from "./Components/Navigation/Navigation";
import About from "./Containers/About/About";
import CookieWarning from "./Components/CookieWarning/CookieWarning";
import Detail from "./Containers/Detail/detail";
// import MyList from "./Containers/MyList/MyList";
import UserProfile from "./Containers/UserProfile/UserProfile";

function App({ token }) {
  let routes;
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
          {/* <Route path="/my-list" exact>
            <MyList />
          </Route> */}
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
  token: state.user.token
});

export default connect(mapStateToProps)(App);
