import React, { useState, useEffect, useContext } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { AnswerContext } from "../contexts/answerContext";
import Avatar from "@mui/material/Avatar";
import "../stylesheets/CountryCapitalQuiz.css";


function CountryCapitalQuiz(props) {
  const [value, setValue] = useState("");
  const { answer, setAnswer } = useContext(AnswerContext);

  // Check how you can call setHelperText from ParentComponent when Next or Previous button is clicked.
  useEffect(() => {
    // console.log("Answer Map Test --->>>", answer);
    // console.log("CountryCapitalQuiz --> props", props);
    //Remember the previous selection.
    setValue(answer.get(props.question.name));

  }, [props]);

  const handleRadioChange = event => {
    setValue(event.target.value);
    setAnswer(x => x.set(props.question.name, event.target.value));
    //console.log(answer);
  };

  return (
    <div className="countrycapitalquiz">
      <div className="countrycapitalquiz__question">
        <h1>What is the capital of {props.question.name}?</h1>
      </div>
      <div className="countrycapitalquiz__avatar">
        <img
          src={props.question.flag}
          alt={props.question.name}
          style={{
            height: "150px",
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}
        />
      </div>
      <div className="countrycapitalquiz__answers">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label={`Option${props.question.name}`}
            name={`Option1${props.question.name}`}
            value={value}
            onChange={handleRadioChange}
          >
            {props.question.options.map((o, index) => (
              <FormControlLabel
                key={index}
                value={o}
                control={<Radio />}
                label={o}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>


    </div>
  );
}

export default CountryCapitalQuiz;
