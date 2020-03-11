import { useState, useCallback } from "react";

const useStorage = () => {
  const [data, setData] = useState([]);

  const addToLocalStorage = useCallback((key, data) => {
    localStorage.setItem(key, data);
  }, []);

  const getFromlocalStorage = useCallback(key => {
    const data = localStorage.getItem(key);
    setData(data);
  }, []);

  return { data, addToLocalStorage, getFromlocalStorage };
};

export default useStorage;
