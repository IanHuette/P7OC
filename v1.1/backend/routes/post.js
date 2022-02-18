const express = require('express');
const router = express.Router();

const {getAllPosts, deletePost, createPost, updatePost} = require("../controllers/post");
const { authMiddleware } = require('../middleware/auth');

// voir les postes du réseau social d'entreprise ne doit pouvoir se faire que si on est connecté, c'est ici le cas car le auth middleware a été set dans app.js
router.get('/', authMiddleware, getAllPosts); 
router.post('/', authMiddleware, createPost);
router.delete('/:postId', deletePost);
router.put('/:postId', updatePost)

module.exports = router;