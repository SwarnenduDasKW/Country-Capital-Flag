import React, { useEffect, useState } from "react";

const base_url = "https://restcountries.eu/rest/v2/";
const url_all = "https://restcountries.eu/rest/v2/all";
const url_country = "https://restcountries.eu/rest/v2/name/ia";

function Requestapi() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(url_country)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>{console.log("RequestApi --> ", { items })}</div>
      //   <ul>
      //     {items.map((item) => (
      //       <li key={item.name}>{item.name}</li>
      //     ))}
      //   </ul>
    );
  }
}

export default Requestapi;
