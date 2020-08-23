import React, { useState, useMemo } from "react";
import "./App.css";
import Countries from "./Countries";
import Navbar from "./Navbar";
import Footer from "./Footer";
import QuizCountryCurrency from "./QuizCountryCurrency";
import QuizMaster from "./QuizMaster";
import { CountryContext } from "./CountryContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [countrydata, setCountrydata] = useState([]);
  const countrydataProvider = useMemo(() => ({ countrydata, setCountrydata }), [
    countrydata,
    setCountrydata,
  ]);

  return (
    <Router>
      <div className="App">
        <CountryContext.Provider value={countrydataProvider}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Countries} />
            <Route path="/quiz" exact component={QuizMaster} />
            {/* <QuizCountryCurrency /> */}
            {/* <Countries /> */}
          </Switch>
        </CountryContext.Provider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
