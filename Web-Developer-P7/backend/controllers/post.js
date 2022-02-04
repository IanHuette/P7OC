const Post = require('../sqlmodels/post');
const fs = require('fs');

const con = require('../database');

const User = require("../sqlmodels/user");

// TODO remove dead code

/**
 * AFFICHER TOUTES LES POSTS
 */
const getAllPosts = (req, res, next) => {
  con.connect(function(err) {
    if (err) {
      res.status(500).json({ message: "something wrong, please try again later" });
    }
    con.query("SELECT * FROM posts", function (err, result, fields) {
      if (err) res.status(500).json({ message: "something wrong, please try again later" });
      res.status(200).json(result);
    });
  });
  };

/**
 * CRÉER UN POST
 */
const createPost = (req, res, next) => {
  if (process.env.USED_DATABASE === "MongoDB") {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistrée !'}))
        .catch(error => {
            console.log(json({ error }));
            res.status(400).json({ error });
        });
  }
  else if (process.env.USED_DATABASE === "MySQL"){

  }
};


module.exports = {
    getAllPosts,
    createPost
};