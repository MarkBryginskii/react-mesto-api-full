const Card = require('../models/card.js');

const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: `Ошибка на сервере - ${err.message}` });
    });
};

const postCard = (req, res) => {
  Card.create({ owner: req.user._id, ...req.body })
    .then((card) => { res.status(200).send(card); })
    .catch((err) => {
      res.status(400).send({ message: `Ошибка создание карточки - ${err.message}` });
    });
};

const deleteCard = (req, res) => {
  Card.findOneAndDelete({ _id: req.params.id })
    .orFail()
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданны не корректные данные' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};

module.exports = { getCards, postCard, deleteCard };
