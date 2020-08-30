import React, { useState, useEffect, useContext } from "react";
import CountryCapitalQuiz from "../components/CountryCapitalQuiz";
import Button from "@material-ui/core/Button";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import { AnswerContext } from "../contexts/answerContext";
import getCountryListForQuiz from "../components/getCountryListForQuiz";
import "../stylesheets/QuizMaster.css";

function QuizMaster({ level }) {
  const [id, setId] = useState(0);
  const [quizCountries] = useState(getCountryListForQuiz(level));
  const { answer } = useContext(AnswerContext);

  //Clear the previous answers when the quiz page is loaded
  useEffect(() => {
    answer.clear();
  }, []);

  return (
    <div className="quizmaster">
      <div className="quizmaster__questions">
        <Button
          className="quizmaster__prev"
          variant="contained"
          color="secondary"
          startIcon={<FastRewindIcon />}
          onClick={() => setId(id - 1)}
          disabled={id === 0}
        >
          previous
        </Button>
        <CountryCapitalQuiz question={quizCountries[id]} />
        <Button
          className="quizmaster__next"
          variant="contained"
          color="secondary"
          startIcon={<FastForwardIcon />}
          disabled={id === quizCountries.length - 1}
          onClick={() => setId(id + 1)}
        >
          next
        </Button>
      </div>
    </div>
  );
}

export default QuizMaster;
