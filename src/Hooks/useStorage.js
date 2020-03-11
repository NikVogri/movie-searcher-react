import { useState, useCallback } from "react";

const useStorage = () => {
  const [data, setData] = useState(null);

  const addToLocalStorage = useCallback((key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const getFromlocalStorage = useCallback(key => {
    const data = JSON.parse(localStorage.getItem(key));
    setData(data);
  }, []);

  const removeFromLocalStorage = useCallback(key => {
    localStorage.removeItem(key);
    setData(null);
  }, []);

  return {
    data,
    addToLocalStorage,
    getFromlocalStorage,
    removeFromLocalStorage
  };
};

export default useStorage;
