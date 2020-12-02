const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const RequestError = require('../errors/RequestError');
const AuthorizationError = require('../errors/AuthorizationError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    })
      .then((user) => { res.status(200).send(user); })
      .catch(() => {
        throw new RequestError('Ошибка создание пользователя');
      }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(() => {
      throw new AuthorizationError('Ошибка авторизации');
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail()
    .then((user) => res.status(200).send({ user }))
    .catch(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

module.exports = {
  createUser, login, getUser,
};