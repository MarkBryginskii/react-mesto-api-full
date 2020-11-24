const router = require('express').Router();
const { getCards, postCard, deleteCard } = require('../controllers/cards.js');

router.get('/cards', getCards);
router.post('/cards', postCard);
router.delete('/cards/:id', deleteCard);

module.exports = router;
