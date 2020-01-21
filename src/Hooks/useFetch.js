import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, type) => {
  const [data, setData] = useState({
    loading: true,
    data: null,
    error: false
  });
  useEffect(() => {
    const getData = () => {
      axios.get(
        `https://api.themoviedb.org/3${url}`)
        .then(res => setData({ data: res.data, loading: false })).catch(() => setData({ error: true, loading: false }));
    }
    getData();
  }, [url]);
  return data;
}

export default useFetch;
