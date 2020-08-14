import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import logo from "./images/c3f2.png";
import { CountryContext } from "./CountryContext";
import Badge from "@material-ui/core/Badge";
import PublicIcon from "@material-ui/icons/Public";

const base_url = "https://restcountries.eu/rest/v2/all";
const url_country = "https://restcountries.eu/rest/v2/name/";

function Navbar() {
  const [show, handleShow] = useState(false);
  const [input, setInput] = useState("");

  const { countrydata, setCountrydata } = useContext(CountryContext);

  //Change the nav bar background color from dark blue to black on scrolling
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  useEffect(() => {
    searchCountry();
  }, [input]);

  //REST call to get the list of countries based on the search string.
  //If search strin is blank then retrieve all the countries.
  //Also set the recent search data to the context
  async function searchCountry() {
    let url = "";
    if (input === "") {
      url = base_url;
    } else {
      url = `${url_country}${input}`;
    }

    //console.log("Nav --> url:", url);
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data);
    console.log(data);
    setCountrydata(data);
  }

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="C3F-Logo" />

      <div className="nav__search">
        <input
          className="nav__searchtext"
          type="text"
          placeholder="Search for a country"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="nav__searchbutton" onClick={() => searchCountry()}>
          Search
        </button>
      </div>
      <div className="nav__badge">
        <Badge badgeContent={countrydata.length} color="error" max={999}>
          <PublicIcon className="nav__badgeicon" />
        </Badge>
      </div>
    </div>
  );
}

export { Navbar as default };
