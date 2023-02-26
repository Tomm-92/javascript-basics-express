const express = require('express');
const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');
const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');
const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement2,
} = require('./lib/arrays');

const app = express();

app.use(express.json());

// STRINGS

app.get('/strings/hello/:string', (req, res) => {
  res.json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { length } = req.query;
  const { string } = req.params;

  if (length) {
    res.status(200).json({ result: firstCharacters(string, length) });
  }
  res.status(200).json({ result: firstCharacter(string) });
});

// NUMBERS

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }
  res.status(200).json({ result: add(a, b) });
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }
  res.status(200).json({ result: subtract(b, a) });
});

// MULTIPLY

app.post('/numbers/multiply', (req, res) => {
  let { a, b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (typeof a === 'string' || typeof b === 'string') {
    a = parseInt(a, 10);
    b = parseInt(b, 10);
  }

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  res.status(200).json({ result: multiply(a, b) });
});

// DIVIDE

app.post('/numbers/divide', (req, res) => {
  let { a, b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (typeof a === 'string' || typeof b === 'string') {
    a = parseInt(a, 10);
    b = parseInt(b, 10);
  }

  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  }

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  res.status(200).json({ result: divide(a, b) });
});

// REMAINDER

app.post('/numbers/remainder', (req, res) => {
  let { a, b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (typeof a === 'string' || typeof b === 'string') {
    a = parseInt(a, 10);
    b = parseInt(b, 10);
  }

  if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  }

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }

  res.status(200).json({ result: remainder(a, b) });
});

// BOOLEANS

app.post('/booleans/negate', (req, res) => {
  res.status(200).json({ result: negate(req.body.value) });
});

app.post('/booleans/truthiness', (req, res) => {
  res.status(200).json({ result: truthiness(req.body.value) });
});

app.get('/booleans/is-odd/:number', (req, res) => {
  const number = parseInt(req.params.number, 10);

  if (Number.isNaN(number)) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  }
  res.status(200).json({ result: isOdd(number) });
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const { character } = req.params;
  if (character.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }
  res.status(200).json({ result: startsWith(character, req.params.string) });
});

// Arrays

app.post('/arrays/element-at-index/:index', (req, res) => {
  res.status(200).json({ result: getNthElement(req.params.index, req.body.array) });
});

app.post('/arrays/to-string', (req, res) => {
  res.status(200).json({ result: arrayToCSVString(req.body.array) });
});

app.post('/arrays/append', (req, res) => {
  res.status(200).json({ result: addToArray2(req.body.value, req.body.array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  res.status(200).json({ result: elementsStartingWithAVowel(req.body.array) });
});

app.post('/arrays/remove-element', (req, res) => {
  res.status(200).json({ result: removeNthElement2(req.query.index, req.body.array) });
});

module.exports = app;
