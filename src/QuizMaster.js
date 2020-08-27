import React, { useState, useEffect, useContext } from "react";
import "./QuizMaster.css";
import CountryCapitalQuiz from "./CountryCapitalQuiz";
import Button from "@material-ui/core/Button";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import { AnswerContext } from "./answer-context";

function QuizMaster() {
  const { answer } = useContext(AnswerContext);

  const [countrylist] = useState([
    {
      id: 237,
      name: "Ukraine",
      capital: "Kiev",
      options: ["Kiev", "New Delhi", "Tallinn", "Gaborone"],
    },
    {
      id: 215,
      name: "Sudan",
      capital: "Khartoum",
      options: ["King Edward Point", "Khartoum", "St. Peter Port", "Bucharest"],
    },
    {
      id: 150,
      name: "Montenegro",
      capital: "Podgorica",
      options: ["Podgorica", "Moscow", "Bern", "Dublin"],
    },
    {
      id: 19,
      name: "Bangladesh",
      capital: "Dhaka",
      options: ["Dakar", "Dhaka", "Washington, D.C.", "Moroni"],
    },
    {
      id: 2,
      name: "Åland Islands",
      capital: "Mariehamn",
      options: ["Mariehamn", "Andorra la Vella", "Roseau", "Mogadishu"],
    },
    {
      id: 193,
      name: "Saint Pierre and Miquelon",
      capital: "Saint-Pierre",
      options: ["Saint-Pierre", "Bishkek", "Funafuti", "Brussels"],
    },
    {
      id: 162,
      name: "Niger",
      capital: "Niamey",
      options: ["Jamestown", "Niamey", "Stockholm", "Manila"],
    },
    {
      id: 177,
      name: "Philippines",
      capital: "Manila",
      options: ["Plymouth", "Manila", "Basseterre", "Mogadishu"],
    },
    {
      id: 105,
      name: "India",
      capital: "New Delhi",
      options: ["New Delhi", "Beijing", "Madrid", "Washington, D.C."],
    },
    {
      id: 203,
      name: "Singapore",
      capital: "Singapore",
      options: ["Philipsburg", "Guatemala City", "Singapore", "Banjul"],
    },
  ]);

  const [id, setId] = useState(0);

  //Clear the previous answers when the quiz page is loaded
  useEffect(() => {
    answer.clear();
  }, []);

  return (
    <div className="quizmaster">
      <div className="quizmaster__questions">
        {/* <AnswerContext.Provider value={answerProvider}> */}
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
        <CountryCapitalQuiz question={countrylist[id]} />
        <Button
          className="quizmaster__next"
          variant="contained"
          color="secondary"
          startIcon={<FastForwardIcon />}
          disabled={id === countrylist.length - 1}
          onClick={() => setId(id + 1)}
        >
          next
        </Button>
        {/* </AnswerContext.Provider> */}
      </div>
    </div>
  );
}

export default QuizMaster;
