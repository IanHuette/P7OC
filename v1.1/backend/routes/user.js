const express = require('express');
const router = express.Router();

const {signup, login, deleteOne, checkAuth} = require('../controllers/user');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, checkAuth);
router.post('/signup', signup);
router.post('/login', login);
router.delete('/profile/:userId', authMiddleware, deleteOne);

module.exports = router;