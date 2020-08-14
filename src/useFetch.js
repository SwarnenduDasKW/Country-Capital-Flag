import { useState, useEffect } from "react";

export const useFetchJson = (url) => {
  const [apiReturn, setApiReturn] = useState({ data: null, loading: true });
  useEffect(() => {
    fetch(url)
      .then((x) => x.json())
      .then((y) => {
        setApiReturn({ data: y, loading: false });
      });
  }, [url]);

  return apiReturn;
};
