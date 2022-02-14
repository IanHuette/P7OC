const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

//  ! PRIO
// TODO reactivate auth when ready
// router.get('/', auth, postCtrl.getAllPosts);
router.get('/', postCtrl.getAllPosts);
// router.post('/', auth, multer, postCtrl.createPost);
router.post('/create', postCtrl.createPost);

// SECONDARY
// TODO use multer to upload image if any time left
// router.put('/:id', auth, multer, postCtrl.modifyPost);
// TODO if any time left
// router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;