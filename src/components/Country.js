import React from "react";
import "../stylesheets/Country.css";

function Country(props) {
  return (
    <div className="country">
      <img className="country__flag" src={props.flag} alt={props.name} />
      <h1 className="country__name">{props.name}</h1>
      <h1 className="country__capital">{props.capital}</h1>
      <h1 className="country__currency">{props.currency}</h1>
    </div>
  );
}

export default Country;
