/**
 * Rest API to fetch data
 *
 */

import { useState } from "react";

export const requestapi = (url) => {
  const [apiReturn, setApiReturn] = useState({ data: null, loading: true });
  fetch(url)
    .then((response) => response.json())
    .then((y) => {
      setApiReturn({ data: y, loading: false });
    });
  return apiReturn;
};
