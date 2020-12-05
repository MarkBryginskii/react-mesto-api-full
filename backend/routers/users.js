const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createUser, login, getUser,
} = require('../controllers/users.js');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().required().min(5),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().required().min(5),
  }),
}), login);

router.get('/users/me', getUser);

module.exports = router;
