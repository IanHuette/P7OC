const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {signup, login, deleteOne, checkAuth} = require('../controllers/user');

router.post('/signup', signup);
router.post('/login', login);
router.delete('/profil/:id', auth, deleteOne);
router.get('/check', checkAuth)

module.exports = router;