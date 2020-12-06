const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, updateProfile, updateAvatar,
} = require('../controllers/users.js');

router.get('/users/me', getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30)
      .required(),
    about: Joi.string().trim().min(2).max(30)
      .required(),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().trim().uri(),
  }),
}), updateAvatar);

module.exports = router;
