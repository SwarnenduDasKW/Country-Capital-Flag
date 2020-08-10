import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "./images/c3f2.png";
import SearchIcon from "@material-ui/icons/Search";
import Countries from "./Countries";
import Requestapi from "./requestapi";

const url_country = "https://restcountries.eu/rest/v2/name/";

function Navbar() {
  const [show, handleShow] = useState(false);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("India");
  const [countryList, setcountryList] = useState([]);

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
    getCountriesBySearch();
  }, [search]);

  const getCountriesBySearch = async () => {
    const response = await fetch(`${url_country}${search}`);
    const data = await response.json();

    console.table(data);
    setcountryList(data);
  };

  const performSearch = (event) => {
    console.log("Search Text: ", input);
    setSearch(input);
  };

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
        <button
          className="nav__searchbutton"
          type="submit"
          onClick={performSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export { Navbar as default };
