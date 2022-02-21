const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/auth');
const { 
    getAllComments, 
    createComment, 
    deleteComment 
} = require('../controllers/comment');

router.get('/:postId', getAllComments);
router.post('/:postId', authMiddleware, createComment);
// TODO
router.delete('/:commentId', deleteComment);

module.exports = router;
