import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CountryContext } from "./CountryContext";
import { AnswerContext } from "./answer-context";
import Countries from "./Countries";
import Navbar from "./Navbar";
import Footer from "./Footer";
import QuizMaster from "./QuizMaster";
import "./App.css";

function App() {
  const [countrydata, setCountrydata] = useState([]);
  const countrydataProvider = useMemo(() => ({ countrydata, setCountrydata }), [
    countrydata,
    setCountrydata,
  ]);

  const [answer, setAnswer] = useState(new Map());
  const answerProvider = useMemo(() => ({ answer, setAnswer }), [
    answer,
    setAnswer,
  ]);

  return (
    <Router>
      <div className="App">
        <CountryContext.Provider value={countrydataProvider}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Countries} />
            <AnswerContext.Provider value={answerProvider}>
              <Route path="/quiz" exact component={QuizMaster} />
            </AnswerContext.Provider>
          </Switch>
        </CountryContext.Provider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
