const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const RequestError = require('../errors/AuthorizationError');
const AuthorizationError = require('../errors/AuthorizationError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictExplained = require('../errors/ConflictExplained');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new ConflictExplained('Такой пользователь уже существует в системе');
      }
      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    })
      .then((user) => { res.status(200).send({ user }); }))
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
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail()
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch(() => {
      throw new RequestError('Переданы не корректные данные пользователя');
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

module.exports = {
  createUser, login, getUser, updateProfile, updateAvatar,
};
