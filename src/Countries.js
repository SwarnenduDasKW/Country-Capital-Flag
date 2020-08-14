import React, { useEffect, useState, useContext } from "react";
import "./Countries.css";
import Country from "./Country";
import { CountryContext } from "./CountryContext";

const base_url = "https://restcountries.eu/rest/v2/all";
//const country_search_url = "https://restcountries.eu/rest/v2/name/ia";

function Countries() {
  const { countrydata, setCountrydata } = useContext(CountryContext);

  //When the component load make the API call to get the data and store it in the context
  useEffect(() => {
    getAllCountries();
  }, []);

  //Make API call and and store it in the context
  const getAllCountries = async () => {
    const response = await fetch(base_url);
    const data = await response.json();

    setCountrydata(data);
  };

  return (
    <div className="countries">
      {/* <ul>{countryList.map(x => <li>{x.name} - {x.capital} - {x.currencies[0].name}</li>)}</ul> */}

      {countrydata.map((country) => (
        <Country
          key={country.alpha2Code}
          name={country.name}
          flag={country.flag}
          capital={country.capital}
          currency={country.currencies[0].name}
        />
      ))}
    </div>
  );
}

export default Countries;
