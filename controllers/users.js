const User = require('../models/user.js');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: `Ошибка на сервере - ${err.message}` });
    });
};

const getUserById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .orFail()
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданны не корректные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

const postUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      res.status(400).send({ message: `Ошибка создание пользователя - ${err.message}` });
    });
};

module.exports = { getUsers, getUserById, postUser };
