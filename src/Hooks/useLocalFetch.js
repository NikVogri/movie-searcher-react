import axios from "axios";
import { useState, useCallback } from "react";

const useLocalFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (url, type, body) => {
    setIsLoading(true);
    console.log(url, type, body);
    const data = await axios({
      method: type,
      url,
      data: body
    })
      .then(res => {
        setIsLoading(false);
        if (!res.data.success) {
          setError(res.data.msg);
        }
        return res;
      })
      .catch(err => {
        setError(err.message);
      });
    return data;
  }, []);
  return {
    error,
    isLoading,
    sendRequest
  };
};

export default useLocalFetch;
