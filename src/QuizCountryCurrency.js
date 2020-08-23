import React, { useContext, useState } from "react";
import "./QuizCountryCurrency.css";
import { CountryContext } from "./CountryContext";
import {
  getRandomNumbersArray,
  getRandomIntInclusive,
  FisherYatesShuffle,
} from "./Utilities";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CountryCapitalQuiz from "./CountryCapitalQuiz";

function QuizCountryCurrency() {
  const { countrydata } = useContext(CountryContext);
  //console.table("countrydata", countrydata);
  let country_arr = [];
  let quiz_countries = [];
  //If the context has data then proceed
  if (countrydata.length > 0) {
    //Copy the country data to a temporary array with index

    let counter = 0;
    countrydata.map((c) => {
      counter++;
      //Only copy countries with capital
      if (c.capital) {
        //console.log("Quiz -- No capital", c.name);

        country_arr.push({
          id: counter,
          name: c.name,
          capital: c.capital,
        });
      }
      return country_arr;
    });

    let quiz_country_count = country_arr.length;
    let no_of_questions = 10;
    //console.log("Quiz - country_arr", country_arr);
    console.log("Quiz - no of countries", quiz_country_count);

    if (quiz_country_count > 0) {
      //Select random "n" countries for the quiz
      const random_array = getRandomNumbersArray(
        1,
        quiz_country_count,
        no_of_questions
      );
      console.log("Quiz --> RandomArray", random_array);

      random_array.map((a) => {
        var find_country = country_arr.find((f) => f.id === a);

        quiz_countries.push({
          id: find_country.id,
          name: find_country.name,
          capital: find_country.capital,
          options: [],
        });
      });

      console.log("Quiz --> quiz_countries", quiz_countries);
      let arr_options = [];
      var rand250 = 0;
      //Build the options for answers
      quiz_countries.forEach((element) => {
        while (arr_options.length < 3) {
          rand250 = getRandomIntInclusive(1, quiz_country_count);

          //Make sure the new number is not already added
          //And the option should not be the element itself. It will be added later.
          if (arr_options.indexOf(rand250) < 0 && element !== rand250) {
            arr_options.push(rand250);
          }
        }
        //Add the correct answer
        arr_options.push(element.id);

        //Shuffle the answer so that it's not always at the 4th position
        FisherYatesShuffle(arr_options);

        // console.log("Quiz --> arr_options after shuffle", arr_options);
        let arr_cap = [];

        arr_options.map((o) => {
          var find_country = country_arr.find((f) => f.id === o);
          //console.log("Quiz --> find_country", find_country.capital);
          arr_cap.push(find_country.capital);
        });
        element.options = arr_cap.slice();
        //reset for the next quiz
        arr_cap.length = 0;
        arr_options.length = 0;
        //console.log("Quiz --> final element", element);
      });

      console.log("Quiz --> final countries", quiz_countries);
    }
  }

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [id, setId] = useState(0);

  return (
    <div className="quizcountrycurrency">
      <h1>Country Capital Quiz</h1>

      <div>
        <ul>
          {quiz_countries.map((x) => (
            <li>{JSON.stringify(x)}</li>
          ))}
        </ul>
        {/* <button onClick={() => setId(id + 1)}>Next</button> */}
        {/* <CountryCapitalQuiz quiz={quiz_countries[id]} /> */}
      </div>
    </div>
  );
}

export default QuizCountryCurrency;
