const Post = require('../sqlmodels/post');
const fs = require('fs');

const con = require('../database');

const User = require("../sqlmodels/user");

// TODO remove dead code

/**
 * AFFICHER TOUTES LES POSTS
 */
const getAllPosts = (req, res, next) => {

  if (process.env.USED_DATABASE === "MongoDB") {
    // TODO method find on Post model
    Post.find() 
    .then(posts => res.status(200).json(posts)) 
    .catch(error => res.status(400).json({ error }));
  }

  else if (process.env.USED_DATABASE === "MySQL"){

    // TODO this SQL logic should not exist in controller but in model
    con.connect(function(err) {
      if (err) {
        res.status(500).json({ message: "something wrong, please try again later" });
      }
      con.query("SELECT * FROM posts", function (err, result, fields) {
        if (err) res.status(500).json({ message: "something wrong, please try again later" });
        res.status(200).json(result);
      });
    });

  }
};

/**
 * CRÉER UNE POST
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

/**
 * MODIFIER UNE POST
 */

const modifyPost = (req, res, next) => {
  if (process.env.USED_DATABASE === "MongoDB") {
  const postObject = req.file ?
  {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body }
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post modifié !'}))
    .catch(error => res.status(400).json({ error }));
  }
  else if (process.env.USED_DATABASE === "MySQL"){

  }
};

/**
 * SUPPRIMER UNE POST
 */
const deletePost = (req, res, next) => {
  if (process.env.USED_DATABASE === "MongoDB") {
    Post.findOne({ _id : req.params.id })
    .then(post => {
      const filename = post.imageUrl.split("/images/")[1]
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({_id : req.params.id})
        .then(res.status(200).json({ message: "Post supprimée" }))
        .catch(error => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }))
  }
  else if (process.env.USED_DATABASE === "MySQL"){
    const sqlDeletePost = //REQUETE SQL VERS POSTS
    con.query(sql, (err, result) => {
      if(err) {
        res.status(404).json({ error });
        throw err;
      }
      res.status(200).json(result);
    })
  }
};

module.exports = {
    getAllPosts,
    createPost
    // modifyPost,
    // deletePost
};