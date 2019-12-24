import React, { useState } from 'react';
import Header from './Containers/Header/Header';
import Movies from './Components/Movies/Movies';
function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputHandler = (query) => {
    setSearchQuery(query);
  };

  return (
    <React.Fragment>
      <Header getQuery={(query) => onInputHandler(query)} />
      <Movies renderData={searchQuery} />
    </React.Fragment>
  );
}

export default App;
