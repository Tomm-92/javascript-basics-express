const express = require('express');
const {
  sayHello,
  uppercase,
  lowercase,
  firstCharacter,
  firstCharacters,
} = require('./lib/strings');

const { add, subtract, multiply, divide } = require('./lib/numbers');

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
  req.query.length
    ? res.status(200).json({ result: firstCharacters(req.params.string, req.query.length) })
    : res.status(200).json({ result: firstCharacter(req.params.string) });
});

app.get('/strings/n-characters/:string', (req, res) => {
  const n = req.query.length;
  res.status(200).json({ result: nCharacters(req.params.string, n) });
});

/* app.get('/strings/n-characters/:string', (req, res) => {
  const n = req.query.length;
  res.status(200).json({ result: nCharacters(req.params.string, n) });
}); */

// NUMBERS

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: add(a, b) });
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: subtract(b, a) });
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

/* app.post('/numbers/multiply', (req, res) => {
  const { a } = req.body;

  const { b } = req.body;
  const aIsNum = typeof a === 'number';
  const bIsNum = typeof b === 'number';

  // const aIsNum = Number.isNaN(a);
  // const bIsNum = Number.isNaN(b);

  // console.log(`${aIsNum} : aIsNum ${bIsNum} :bIsNum`);

  if (!aIsNum || !bIsNum) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else return res.status(200).json({ result: multiply(a, b) });
}); */

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

module.exports = app;
