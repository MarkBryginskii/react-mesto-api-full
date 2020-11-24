const router = require('express').Router();
const { getUsers, getUserById, postUser } = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', postUser);

module.exports = router;
