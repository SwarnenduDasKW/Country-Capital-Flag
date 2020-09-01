import React, { useState, useEffect, useContext } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { AnswerContext } from "../contexts/answerContext";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import "../stylesheets/CountryCapitalQuiz.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

function CountryCapitalQuiz(props) {
  const [value, setValue] = useState("");
  const { answer, setAnswer } = useContext(AnswerContext);
  const classes = useStyles();

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
        <Avatar
          className={classes.large}
          alt="CountryName"
          src={props.question.flag}
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
