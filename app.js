const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cardsRouters = require('./routers/cards');
const usersRouters = require('./routers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5f9dc04d4b5549e44778b077',
  };

  next();
});

app.use('/', usersRouters);
app.use('/', cardsRouters);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
