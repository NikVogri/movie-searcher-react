import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, type) => {
  const [data, setData] = useState({
    data: null,
    error: false
  });
  useEffect(() => {
    const getData = () => {
      axios.get(
        `https://api.themoviedb.org/3${url}`)
        .then(res => setData({ data: res.data })).catch(() => setData({ error: true }));
    }
    getData();
  }, [url]);
  console.log(data.data);
  return data;
}

export default useFetch;
