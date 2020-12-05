const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, postCard, deleteCard } = require('../controllers/cards.js');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().trim().uri(),
  }),
}), postCard);

router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

module.exports = router;
