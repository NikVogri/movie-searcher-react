import React from 'react';
import Showcase from './Containers/Showcase/Showcase';
import Footer from './Components/Footer/Footer';
import Search from './Containers/Search/Search';
import Navigation from './Components/Navigation/Navigation';
import About from './Components/About/About';
import { BrowserRouter, Route } from 'react-router-dom';
import CookieWarning from './Components/CookieWarning/CookieWarning';
import Detail from './Containers/Detail/detail';
import Favourites from './Containers/Favourites/Favourites';
function App() {

  if (!localStorage.getItem('favourites')) {
    localStorage.setItem('favourites', [JSON.stringify([])]);
  }
  if (!localStorage.getItem('watched')) {
    localStorage.setItem('watched', [JSON.stringify([])]);
  }
  return (
    <React.Fragment>
      <CookieWarning />
      <BrowserRouter>
        <Navigation />
        <Route path="/" exact component={Showcase} />
        <Route path="/search" component={Search} />
        <Route path="/about" component={About} />
        <Route path="/favourites" component={Favourites} />
        <Route path="/:type/:id" component={Detail} />
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
}

export default App;
