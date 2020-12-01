const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser, login, getUser,
} = require('../controllers/users.js');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().required(),
  }),
}), login);

router.get('/users/me', celebrate({
  headers: Joi.object().keys({
    _id: Joi.string().alphanum().required().length(24),
  }),
}), getUser);

module.exports = router;
