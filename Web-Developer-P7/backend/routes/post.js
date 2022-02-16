const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');

// router.get('/:id', postCtrl.getOnePost);
router.get('/', postCtrl.getAllPosts);
router.delete('/:id', postCtrl.deletePost);
router.post('/create', postCtrl.createPost);

// SECONDARY
// TODO use multer to upload image if any time left
// router.put('/:id', auth, multer, postCtrl.modifyPost);

module.exports = router;