import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

import "./CountryCapitalQuiz.css";

function CountryCapitalQuiz(props) {
  console.log("I am in CountryCapitalQuiz");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("What do you think?");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    console.log("Initial value of radio", value);
    event.preventDefault();

    if (value === props.question.capital) {
      setHelperText("You got it!");
      setError(false);
    } else if (value === "") {
      setHelperText("Please select an option.");
      setError(true);
    } else {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    }
  };

  return (
    <div>
      <div className="countrycapitalquiz">
        <div className="countrycapitalquiz__question">
          <h1>What is the capital of {props.question.name}?</h1>
        </div>
        <div className="countrycapitalquiz__answers">
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" error={error}>
              {/* <FormLabel component="legend">
              What is the capital of {props.question.name}
            </FormLabel> */}
              <RadioGroup
                aria-label={`Option${props.question.name}`}
                name={`Option${props.question.name}`}
                value={value}
                onChange={handleRadioChange}
              >
                {props.question.options.map((o) => (
                  <FormControlLabel value={o} control={<Radio />} label={o} />
                ))}
              </RadioGroup>
              <FormHelperText>{helperText}</FormHelperText>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className="countrycapitalquiz_checkanswer"
              >
                Check Answer
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CountryCapitalQuiz;
