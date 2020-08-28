/**
 *
 * Helper functions
 *
 */

//  Get a randon integer btween min and max number inclusive
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns an array of random numbers between min and max of certain length
export function getRandomNumbersArray(rand_min, rand_max, op_arr_len) {
  var arr = [];
  let rand = 0;
  //Select "n" random countries from the list of "max" countries
  while (arr.length < op_arr_len) {
    rand = getRandomIntInclusive(rand_min, rand_max);

    //Make sure the new number is not already added
    if (arr.indexOf(rand) < 0) {
      arr.push(rand);
    }
  }
  return arr;
}

// Fisher-Yates (aka Knuth) Shuffle.
export function FisherYatesShuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//  Durstenfeld shuffle, an optimized version of Fisher-Yates:
export function DurstenfeldShuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
