import React, { useEffect, useState } from "react";
import "./Countries.css";
import Country from "./Country";
import Requestapi from "./requestapi";

const base_url = "https://restcountries.eu/rest/v2/all";
const country_search_url = "https://restcountries.eu/rest/v2/name/ia";

function Countries({ data_passed }) {
  const [countryList, setcountryList] = useState([]);

  useEffect(() => {
    // if (data_passed.length === 0) {
    console.log("data_passed", data_passed);
    getAllCountries();
    // } else setcountryList(data_passed);
    //makeApicall();
  }, [data_passed]);

  const getAllCountries = async () => {
    const response = await fetch(country_search_url);
    const data = await response.json();

    setcountryList(data);
  };

  // const makeApicall = () => {
  //   console.log("Countries --> ", countryList);
  // };
  //console.table(countryList);
  return (
    <div className="countries">
      {/* <ul>{countryList.map(x => <li>{x.name} - {x.capital} - {x.currencies[0].name}</li>)}</ul> */}
      {countryList.map((country) => (
        <Country
          key={country.alpha2Code}
          name={country.name}
          flag={country.flag}
          capital={country.capital}
        />
      ))}
    </div>
  );
}

export default Countries;
