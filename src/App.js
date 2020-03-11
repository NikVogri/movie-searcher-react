import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Showcase from "./Containers/Showcase/Showcase";
import Footer from "./Components/Footer/Footer";
import Search from "./Containers/Search/Search";
import Navigation from "./Components/Navigation/Navigation";
import About from "./Containers/About/About";
import CookieWarning from "./Components/CookieWarning/CookieWarning";
import Detail from "./Containers/Detail/detail";
import Chat from "./Containers/Chat/Chat";
import UserProfile from "./Containers/UserProfile/UserProfile";
import { loginSuccess } from "./redux/actions/actionCreator";
import { ChatkitProvider, TokenProvider } from "@pusher/chatkit-client-react";

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

  const tokenProvider = new TokenProvider({
    url:
      "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/5bd72a76-5295-4426-a96c-3de983e02130/token"
  });

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
            <ChatkitProvider
              instanceLocator={"v1:us1:5bd72a76-5295-4426-a96c-3de983e02130"}
              tokenProvider={tokenProvider}
              userId={userName}
            >
              <Chat />
            </ChatkitProvider>
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
