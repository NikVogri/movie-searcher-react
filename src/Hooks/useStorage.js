import { useState, useEffect } from 'react';

const useStorage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getWatched = localStorage.getItem('watched');
    let watched = JSON.parse(getWatched);
    setData(watched);

  }, []);
  return data;
}

export default useStorage;
