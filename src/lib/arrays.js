const getNthElement = (index, array) => {
  if (index >= array.length) {
    return array[index - array.length];
  }
  return array[index];
};

const arrayToCSVString = array => {
  return array.toString();
  /* return array.join() */
};

const csvStringToArray = string => {
  return string.split(',');
};

const addToArray = (element, array) => {
  array.push(element)
};

const addToArray2 = (element, array) => {
  return array.concat(element);
};

const removeNthElement = (index, array) => {
  return array.splice(index, 1);
  // at position index (number passed in to function) remove 1 element //
};

const numbersToStrings = numbers => {
  // return numbers.map(String); //
  return numbers.map(number => String(number));
};

const uppercaseWordsInArray = strings => {
  return strings.map(word => word.toUpperCase());
};

function reverseWordsInArray(strings) {
  return strings.map(word =>
    word
      .split('')
      .reverse()
      .join('')
  );
  // return strings.map(strings => [...strings].reverse().join('')); this works for special characters //
}

const onlyEven = numbers => {
  return numbers.filter(evenNumber => evenNumber % 2 === 0);
};

const removeNthElement2 = (index, array) => {
  /* return array.filter(array => array == index); */
  return array.filter((item, arrayIndex) => arrayIndex !== index);
  /* looking at everything in the array which doesn't equal index */
};

const elementsStartingWithAVowel = strings => {
  return strings.filter(string => /^[aeiou]/i.test(string));
};

const removeSpaces = string => {
  // return string.replace(/\s/g, ''); //
  return string.split(' ').join('');
};

const sumNumbers = numbers => {
  return numbers.reduce((acc, current) => acc + current);
};

const sortByLastLetter = strings => {
  // return strings.sort((a, b) => a.charCodeAt(a.length - 1) - b.charCodeAt(b.length - 1)); //
  const reverseString = item =>
    item
      .split('')
      .reverse()
      .join('');
  return strings
    .map(reverseString)
    .sort()
    .map(reverseString);
};

module.exports = {
  getNthElement,
  arrayToCSVString,
  csvStringToArray,
  addToArray,
  addToArray2,
  removeNthElement,
  numbersToStrings,
  uppercaseWordsInArray,
  reverseWordsInArray,
  onlyEven,
  removeNthElement2,
  elementsStartingWithAVowel,
  removeSpaces,
  sumNumbers,
  sortByLastLetter
};
