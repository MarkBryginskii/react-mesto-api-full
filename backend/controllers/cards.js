const Card = require('../models/card.js');

const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(next);
};

const postCard = (req, res, next) => {
  Card.create({ owner: req.user._id, ...req.body })
    .then((card) => { res.status(200).send(card); })
    .catch(() => {
      throw new RequestError('Ошибка создание карточки');
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    .orFail()
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new RequestError('Переданны не корректные данные');
      } else if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Нет карточки с таким id');
      }
    })
    .catch(next);
};

module.exports = { getCards, postCard, deleteCard };
