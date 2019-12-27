import React from 'react';
import Showcase from './Containers/Showcase/Showcase';
import Footer from './Components/Footer/Footer';
import Search from './Containers/Search/Search';
import Navigation from './Components/Navigation/Navigation';
import Favourites from './Containers/Favourites/Favourites';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navigation />
        <Route path="/" exact component={Showcase} />
        <Route path="/search" component={Search} />
        <Route path="/favourites" component={Favourites} />
        {/* <Route path="/about" component={Showcase} />  */}
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
}

export default App;
