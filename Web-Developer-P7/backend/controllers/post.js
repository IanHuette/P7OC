const con = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
    const content = req.body.content;
    const user_id = req.body.user_id;
    //const user_name = req.body.user_name;

  try {
    const createMySQLQuery = new Promise( (accept, reject) => {
      con.query(`INSERT INTO posts (content, user_id) VALUES (?, ?)`,
      [content, user_id],
        err => {
          if (err) return reject(false);
          accept(true);
        },
      )
    });
    createMySQLQuery.then(result => res.status(201).json({message: 'Post crée !', success: true}))
  } catch (err) {
    console.error(err);
    reject(err);
  }
};

/**
 * SUPPRIMER UN POST
 */
const deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decryptedToken = jwt.verify(token, process.env.TOKEN);
  const userId = decryptedToken.userId;
  const postId = req.params.id


  try {
    const deleteMySQLQuery = new Promise( (acc, rej) => {
      con.query(
        "DELETE FROM posts WHERE (id, user_id) = (?,?)",
        [postId, userId],
        err => {
          if (err) return rej(false);
          acc(true);
        },
      );
    });
    deleteMySQLQuery.then(result => res.status(201).json({message: 'Post supprimé !', success: true}))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "something wrong, please try again later" });
    })
  } catch (err) {
    console.error(err);
  }
  res.status(200).json({message:"POST DELETED", success: true});
};

 /**
 * MODIFIER UN POST
 */
const modifyPost = (req, res, next) => {
  const token = req.body.headers.Authorization.split(' ')[1];
  let decryptedToken = false;
  let userId;
  let postId;
  try {
    decryptedToken = jwt.verify(token, process.env.TOKEN);
    userId = decryptedToken.userId;
    postId = req.params.id
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }

  if(decryptedToken) {
    const content = req.body.content; 
    try {
      const modifyMySQLQuery = new Promise( (acc, rej) => {
        con.query(
          "UPDATE posts SET content = (?) WHERE (id, user_id) = (?,?)",
          [content, postId, userId],
          err => {
            if (err) return rej(false);
            acc(true);
          },
        );
      });
      modifyMySQLQuery.then(result => res.status(200).json({message: 'Post modifié !', success: true}))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "something wrong, please try again later" });
      })
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = {
    getAllPosts,
    modifyPost,
    createPost,
    deletePost
};