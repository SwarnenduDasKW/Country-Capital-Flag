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
          {countrydata.map((country) => {
            // v3.1 API structure
            const name = country.name?.common || country.name;
            const capital = Array.isArray(country.capital) ? country.capital[0] : country.capital;
            const flag = country.flags?.png || country.flag;
            const alpha3Code = country.cca3 || country.alpha3Code;
            const alpha2Code = country.cca2 || country.alpha2Code;

            // Handle currencies (v3.1 uses object with currency codes as keys)
            let currencyStr = "N/A";
            if (country.currencies) {
              const currencyCode = Object.keys(country.currencies)[0];
              if (currencyCode) {
                const curr = country.currencies[currencyCode];
                currencyStr = `${curr.name || currencyCode}${curr.symbol ? ' - ' + curr.symbol : ''}`;
              }
            }

            return (
              <Country
                key={alpha2Code}
                name={name}
                flag={flag}
                capital={capital || "N/A"}
                alpha3Code={alpha3Code}
                currency={currencyStr}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Countries;
