import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CountryContext } from "../contexts/CountryContext";
import { AnswerContext } from "../contexts/answerContext";
import Countries from "../components/Countries";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuizLevel from "../components/QuizLevel";
import "../stylesheets/App.css";

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="app_container">
          <Router>
            <CountryContext.Provider value={countrydataProvider}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Countries />} />
                <Route
                  path="/quiz"
                  element={
                    <AnswerContext.Provider value={answerProvider}>
                      <QuizLevel />
                    </AnswerContext.Provider>
                  }
                />
              </Routes>
            </CountryContext.Provider>
          </Router>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
