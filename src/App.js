import React from 'react';
import Header from './Containers/Header/Header';
import Showcase from './Containers/Showcase/Showcase';
// import Movies from './Components/Movies/Movies';
function App() {
  // const [searchQuery, setSearchQuery] = useState('');

  // const onInputHandler = (query) => {
  //   setSearchQuery(query);
  // };

  return (
    <React.Fragment>
      <Header />
      <Showcase />
      {/* <Movies renderData={searchQuery} /> */}
    </React.Fragment>
  );
}

export default App;
