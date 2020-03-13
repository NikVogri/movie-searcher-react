import axios from "axios";
import { useState, useCallback } from "react";

const useLocalFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const sendRequest = useCallback(async (url, type, body) => {
    setIsLoading(true);
    try {
      const data = await axios({
        method: type,
        url,
        data: body
      });
      const fetchedData = data.data.results;
      setIsLoading(false);
      return setData(fetchedData);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, []);

  return {
    error,
    isLoading,
    data,
    sendRequest
  };
};

export default useLocalFetch;
