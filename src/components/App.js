import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CountryContext } from "../contexts/CountryContext";
import { AnswerContext } from "../contexts/answerContext";
import Countries from "../components/Countries";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuizLevel from "../components/QuizLevel";
import "../stylesheets/App.css";

function App() {
  const [countrydata, setCountrydata] = useState([]);
  const countrydataProvider = useMemo(() => ({ countrydata, setCountrydata }), [
    countrydata,
    setCountrydata
  ]);

  const [answer, setAnswer] = useState(new Map());
  const answerProvider = useMemo(() => ({ answer, setAnswer }), [
    answer,
    setAnswer
  ]);

  return (
    <div className="App">
      <div className="app_container">
        <Router>
          <CountryContext.Provider value={countrydataProvider}>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Countries} />
              <AnswerContext.Provider value={answerProvider}>
                <Route path="/quiz" exact component={QuizLevel} />
              </AnswerContext.Provider>
            </Switch>
          </CountryContext.Provider>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
