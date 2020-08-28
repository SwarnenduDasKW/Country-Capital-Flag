import React, { useState, useEffect, useContext } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { AnswerContext } from "./answer-context";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import "./CountryCapitalQuiz.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

function CountryCapitalQuiz(props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("What do you think?");
  const [score, setScore] = useState(0);
  const { answer, setAnswer } = useContext(AnswerContext);
  const classes = useStyles();
  //initilize the score to zero
  useEffect(() => {
    // console.log("CountryCapitalQuiz --> initial", props);
    setScore(0);
  }, []);

  // Check how you can call setHelperText from ParentComponent when Next or Previous button is clicked.
  useEffect(() => {
    setHelperText(" ");
    console.log("Answer Map Test --->>>", answer);
    console.log("CountryCapitalQuiz --> props", props);
    //Remember the previous selection.
    setValue(answer.get(props.question.name));
  }, [props]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setAnswer((x) => x.set(props.question.name, event.target.value));
    //console.log(answer);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    // console.log("Prop Question Country Name: ", props.question.name);
    // console.log("Selected Capital: ", value);

    event.preventDefault();

    if (value === props.question.capital) {
      setScore(score + 1);
      setHelperText("You got it!");
      setError(false);
    } else if (value === "" || !value) {
      setHelperText("Please select an option.");
      setError(true);
    } else {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    }
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
        {/* <img
          className="countrycapitalquiz__flag"
          alt="CountryName"
          src={props.question.flag}
        /> */}
      </div>
      <div className="countrycapitalquiz__answers">
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" error={error}>
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
        <Chip
          label={`Score: ${score}/10`}
          className="countrycapitalquiz__score"
        />
      </div>
    </div>
  );
}

export default CountryCapitalQuiz;
