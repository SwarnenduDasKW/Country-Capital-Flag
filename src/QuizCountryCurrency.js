import AllCountries from "./data/AllCountries.json";
// import AllCountriesLite from "./data/AllCountriesLight.json";
import {
  getRandomNumbersArray,
  getRandomIntInclusive,
  FisherYatesShuffle,
} from "./Utilities";

function QuizCountryCurrency() {
  const noOfQuestions = 10;
  let allCountriesWithIndex = [];
  let quizCountries = [];

  console.log("AllCountriesLite", AllCountries.length);

  //Populate an array with index
  //Check if this step is necessary
  //Maybe this can be removed later
  if (AllCountries.length > 0) {
    let counter = 0;
    AllCountries.map((c) => {
      //Only copy countries with capital
      if (c.name && c.capital && c.flag) {
        counter++;
        allCountriesWithIndex.push({
          id: counter,
          name: c.name,
          capital: c.capital,
          flag: c.flag,
        });
      }
      return allCountriesWithIndex;
    });
  } else {
    return null;
  }

  //Get 10 random countries from the list and populate in an array
  let countryCount = allCountriesWithIndex.length;
  // console.log("QuizCountryCurrency - no of countries", countryCount);
  // console.log("QuizCountryCurrency - no of countries", allCountriesWithIndex);

  if (countryCount > 0) {
    //Get a list of "n" numbers
    const random_array = getRandomNumbersArray(1, countryCount, noOfQuestions);
    // console.log("QuizCountryCurrency --> RandomArray", random_array);

    random_array.map((a) => {
      var find_country = allCountriesWithIndex.find((f) => f.id === a);

      quizCountries.push({
        id: find_country.id,
        name: find_country.name,
        capital: find_country.capital,
        flag: find_country.flag,
        options: [],
      });
    });

    // console.log("QuizCountryCurrency --> quizCountries", quizCountries);
    let arr_options = [];
    var rand250 = 0;
    //Build the options for answers
    quizCountries.forEach((element) => {
      while (arr_options.length < 3) {
        rand250 = getRandomIntInclusive(1, countryCount);

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

      // console.log(
      //   "QuizCountryCurrency --> arr_options after shuffle",
      //   arr_options
      // );
      let arr_cap = [];

      arr_options.map((o) => {
        var find_country = allCountriesWithIndex.find((f) => f.id === o);
        // console.log(
        //   "QuizCountryCurrency --> find_country.capital",
        //   find_country.capital
        //);
        arr_cap.push(find_country.capital);
      });

      element.options = arr_cap.slice();
      //reset for the next quiz
      arr_cap.length = 0;
      arr_options.length = 0;
      //console.log("Quiz --> final element", element);
    });

    // console.log("QuizCountryCurrency --> final countries", quizCountries);
  }

  return quizCountries;
}

export default QuizCountryCurrency;
