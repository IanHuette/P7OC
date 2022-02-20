const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/auth');
const { getAllComments, createComment } = require('../controllers/comment');

router.get('/:postId', getAllComments);
router.post('/:postId', authMiddleware, createComment);

module.exports = router;
