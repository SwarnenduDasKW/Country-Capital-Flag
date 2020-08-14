import React, { useState, useMemo } from "react";
import "./App.css";
import Countries from "./Countries";
import Navbar from "./Navbar";
import { CountryContext } from "./CountryContext";

function App() {
  const [countrydata, setCountrydata] = useState([]);
  const countrydataProvider = useMemo(() => ({ countrydata, setCountrydata }), [
    countrydata,
    setCountrydata,
  ]);

  return (
    <div className="App">
      <CountryContext.Provider value={countrydataProvider}>
        <Navbar />
        <Countries />
      </CountryContext.Provider>
    </div>
  );
}

export default App;
