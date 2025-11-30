import React, { useState, useEffect, useContext } from "react";
import "../stylesheets/Navbar.css";
import logo from "../images/c3f2.png";
import quiz_logo from "../images/quiz.png";
import { CountryContext } from "../contexts/CountryContext";
import Badge from "@mui/material/Badge";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";

const base_url = "https://restcountries.com/v3.1/all?fields=name,capital,flags,currencies,cca2,cca3";
const url_country = "https://restcountries.com/v3.1/name/";
const url_country_fields = "?fields=name,capital,flags,currencies,cca2,cca3";
//const country_search_url = "https://restcountries.com/v3.1/name/uni";

function Navbar() {
  const [show, handleShow] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { countrydata, setCountrydata } = useContext(CountryContext);

  //Change the nav bar background color from dark blue to black on scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    searchCountry();
  }, [input]);

  //REST call to get the list of countries based on the search string.
  //If search strin is blank then retrieve all the countries.
  //Also set the recent search data to the context
  function searchCountry() {
    let url = "";
    if (input === "") {
      url = base_url;
    } else {
      url = `${url_country}${input}${url_country_fields}`;
    }

    // Exapmle of Async-Await call
    // console.log("Nav --> url:", url);
    // const response = await fetch(url);
    // const data = await response.json();
    // console.table(data);
    // console.log(data);
    // setCountrydata(data);

    fetch(url)
      .then((response) => response.json())
      .then(
        (data) => {
          setIsLoaded(true);
          //console.log("Navbar --> data: ", data);
          if (!data.length) {
            console.log("Navbar --> fetch. No data found");
            setCountrydata([]);
          } else {
            // Filter to ensure the common name actually contains the search term
            // (API matches official names and native names too, e.g. "United Mexican States" for "can")
            const filteredData = data.filter(country => {
              const commonName = country.name.common || country.name;
              return commonName.toLowerCase().includes(input.toLowerCase());
            });

            // Sort data alphabetically by name
            filteredData.sort((a, b) => {
              const nameA = a.name.common || a.name;
              const nameB = b.name.common || b.name;
              return nameA.localeCompare(nameB);
            });
            setCountrydata(filteredData);
          }
        },
        (error) => {
          console.log("Navbar --> error: ", error);
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <Link to="/">
        <img className="nav__logo" src={logo} alt="C3F-Logo" />
      </Link>
      <div className="nav__search">
        <input
          className="nav__searchtext"
          type="text"
          placeholder="Search for a country"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </div>
      <div className="nav__badge">
        <Badge badgeContent={countrydata.length} color="error" max={999}>
          <PublicIcon className="nav__badgeicon" />
        </Badge>
      </div>
      <Link to="/quiz">
        <img className="nav__quizlogo" src={quiz_logo} alt="quiz-logo" />
      </Link>
    </div>
  );
}

export { Navbar as default };
