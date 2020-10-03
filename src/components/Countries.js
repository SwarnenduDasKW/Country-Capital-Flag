import React, { useContext } from "react";
import "../stylesheets/Countries.css";
import Country from "../components/Country";
import { CountryContext } from "../contexts/CountryContext";

function Countries() {
  const { countrydata } = useContext(CountryContext);

  return (
    <div className="countries">
      {countrydata.length === 0 ? (
        <div className="countries__norowsfound">
          <h2 className="countries__nomatchtext">
            Couldn't find countries matching your search. Please try new search.
          </h2>
        </div>
      ) : (
        //Test mode
        // <ul>
        //   {countrydata.map((x) => (
        //     <li>
        //       {x.name} - {x.capital}- {x.currencies[0].name}
        //     </li>
        //   ))}
        // </ul>
        <div className="countries__list">
          {countrydata.map((country) => (
            <Country
              key={country.alpha2Code}
              name={country.name}
              flag={country.flag}
              capital={country.capital}
              alpha3Code={country.alpha3Code}
              currency={
                country.currencies[0].name +
                " - " +
                country.currencies[0].symbol
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Countries;
