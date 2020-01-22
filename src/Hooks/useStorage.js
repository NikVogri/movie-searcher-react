import { useState, useEffect } from 'react';

const useStorage = () => {
  const [data, setData] = useState({favourites: null, watched: null});
  useEffect(() => {
    const getFavourites = localStorage.getItem('favourites');
    const getWatched = localStorage.getItem('watched');
    let favourites = JSON.parse(getFavourites);
    let watched = JSON.parse(getWatched);
    setData({favourites, watched});

  }, []);
  console.log(data);
  return data;
}

export default useStorage;
