const express = require('express');
const LimitingMiddleware = require('limiting-middleware');
const { types, getJokes, randomJoke, randomTen, randomSelect, jokeByType, jokeById, count, countByType } = require('./handler');

const app = express();

app.use(new LimitingMiddleware().limitByIp());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Try /random_joke, /random_ten, /jokes/random, or /jokes/ten , /jokes/random/<any-number>');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/random_joke', (req, res) => {
  res.json(randomJoke());
});

app.get('/random_ten', (req, res) => {
  res.json(randomTen());
});

app.get('/jokes/random', (req, res) => {
  res.json(randomJoke());
});

app.get("/jokes/random/:num", (req, res) => {
  let num;
  try {
    num = parseInt(req.params.num);
    if (!num) {
      res.send("The passed path is not a number.");
    } else {
      if (num > count) {
        res.send(`The passed path exceeds the number of jokes (${count}).`);
      } else {
        res.json(randomSelect(num));
      }
    }
  } catch (e) {
    return next(e);
  }
});

app.get('/jokes/ten', (req, res) => {
  res.json(randomTen());
});

app.get('/jokes/:type/random', (req, res) => {
  res.json(jokeByType(req.params.type, 1));
});

app.get('/jokes/:type/ten', (req, res) => {
  res.json(jokeByType(req.params.type, 10));
});

app.get('/jokes/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const joke = jokeById(+id);
    if (!joke) return next({ statusCode: 404, message: 'joke not found' });
    return res.json(joke);
  } catch (e) {
    return next(e);
  }
});

app.get('/types', (req, res, next) => {
  res.json(types);
})

app.get('/total/:type', (req, res, next) => {
  const jokeType = req.params.type;
  if (!["all", ...types].includes(jokeType)) {
    res.send("The passed type is not valid.");
    return;
  }
  res.json(jokeType === "all" ? count : countByType(jokeType));
})

app.get("/jokes_paginated/:type/:num/:perpage/:direction", (req, res, next) => {
  let num, perPage, direction, jokeType;
  try {
    num = parseInt(req.params.num);
    if (!num) {
      res.send("The passed path is not a number.");
      return;
    }
    if (num > count) {
      res.send(`The passed path exceeds the number of jokes (${count}).`);
      return;
    }
    perPage = parseInt(req.params.perpage);
    if (perPage <= 0) {
      res.send("The passed perpage is not a valid number.");
      return;
    }
    direction = req.params.direction;
    if (direction !== 'asc' && direction !== 'desc') {
      res.send("The passed direction is not valid. Use 'asc' or 'desc'.");
      return;
    }

    jokeType = req.params.type;
    if (!["all", ...types].includes(jokeType)) {
      res.send("The passed type is not valid.");
      return;
    }
    res.json(getJokes(num, perPage, direction, jokeType));
  } catch (e) {
    return next(e);
  }
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

