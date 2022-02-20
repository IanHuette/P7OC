const con = require('../database');
const { unauthorizedObj } = require('../middleware/auth');
const jwt = require("jsonwebtoken");

const serverErrorMessage = "Une erreur est survenue, veuillez réessayer plus tard.";

/**
 * AFFICHER TOUTES LES POSTS
 */
const getAllPosts = async (req, res, next) => {
  const getAllPostsQuery = new Promise((accept, reject) => {
    con.connect(function(err) {
      if (err) {
        console.error(err);
        reject(err);
      }
      con.query("SELECT * FROM posts", function (err, result, fields) {
        if (err) {
          console.error(err);
          reject(err);
        }
        accept(result);
      });
    });    
  });
  try {
    posts = await getAllPostsQuery;
    res.status(200).json({message: posts, success: true});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: serverErrorMessage, success: false});
  }
};

/**
 * AFFICHER UN POST
 */
const getOnePost = async (req, res, next) => {
  const postId = req.params.postId;
  const getOnePostQuery = new Promise((accept, reject) => {
    con.query("SELECT * FROM posts WHERE id = ?",[postId], function (err, result, fields) {
      if (err) {
        console.error(err);
        reject(err);
      }
      accept(result);
    });
  });
  try {
    post = await getOnePostQuery;
    res.status(200).json({message: post, success: true});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: serverErrorMessage, success: false});
  }
}

/**
 * CRÉER UN POST
 */
const createPost = async (req, res, next) => {
  const {content, userId} = req.body;

  if(userId != req.body.userIdRef) {
    res.status(401).json(unauthorizedObj);
  } else {
    const createPostQuery = new Promise( (accept, reject) => {
      con.query(
        `INSERT INTO posts (content, user_id) VALUES (?, ?)`,
        [content, userId],
        err => {
          if (err) {
            console.error(err);
            reject(err)
          };
          accept(true);
        },
      )
    });
  
    try {
      await createPostQuery;
      res.status(201).json({message: 'Post crée !', success: true});
    } catch (err) {
      console.error(err);
      res.status(500).json({message: serverErrorMessage, success: false});
    }
  }
};

/**
 * SUPPRIMER UN POST
 */
const deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.query.userId;
  const postUserId = req.query.postUserId;

  let isModerator = false;

  const searchModerator = new Promise((accept, reject) => {
    con.query(
      "SELECT isModerator FROM users WHERE id = ?",
      [userId],
      function (err, result) {
        if (err) {
          console.error(err);
          reject(err);
        }
        accept(result);
      });
  });

  try {
    const isModeratorRes = await searchModerator;
    isModerator = isModeratorRes[0].isModerator == 1 ? true : false;
  } catch (err) {
    console.error(err);
  } 

  // pour une raison étrange, le middleware d'authentification provoque une erreur de headers pour cette route DELETE...
  const token = req.headers.authorization.split(' ')[1].length >= 2 ? req.headers.authorization.split(' ')[1] : ''; // extrait le token du header authorization / split pour récupérer tout après l'espace dans le header
  const decodedToken = jwt.verify(token, process.env.token);  // fonction verify pour décoder le token (si il n'est pas valide une erreur sera génégée)
  const decryptedUserId = decodedToken.userId ? decodedToken.userId : 0; // extrait de l'userID du token

  if (postUserId!= decryptedUserId && !isModerator) { 
    res.status(401).json(unauthorizedObj);
  } 
  // ici on est sûrs que même si un utilisateur authentifié tente d'effacer le post d'un autre user, la paire id/user_id ne matchera pas
  else {
    const deletePostQuery = new Promise((accept, reject) => {
      con.query(
        "DELETE FROM posts WHERE (id) = (?)",
        [postId],
        err => {
          if (err) reject(false);
          accept(true);
        }
      );
    }); 
    try {
      await deletePostQuery;
      res.status(200).json({message: 'Post supprimé !', success: true});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: serverErrorMessage });      
    }
  }
};

 /**
 * MODIFIER UN POST
 */
const updatePost = async (req, res, next) => {
  const {content, userId} = req.body; 
  const postId = req.params.postId;

  // pour une raison étrange, le middleware d'authentification provoque une erreur pour cette route DELETE...
  const token = req.headers.authorization.split(' ')[1].length >= 2 ? req.headers.authorization.split(' ')[1] : ''; // extrait le token du header authorization / split pour récupérer tout après l'espace dans le header
  const decodedToken = jwt.verify(token, process.env.token);  // fonction verify pour décoder le token (si il n'est pas valide une erreur sera génégée)
  const decryptedUserId = decodedToken.userId ? decodedToken.userId : 0; // extrait de l'userID du token

  if(userId != decryptedUserId) {
    res.status(401).json(unauthorizedObj);
  }

  const updatePostQuery = new Promise((accept, reject) => {
    con.query(
      "UPDATE posts SET content = (?) WHERE (id, user_id) = (?,?)",
      [content, postId, userId],
      err => {
        if (err) reject(false);
        accept(true);
      },
    );
  });
  try {
    await updatePostQuery;
    res.status(200).json({message: 'Post modifié !', success: true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: serverErrorMessage });
  }
};

module.exports = {
    getAllPosts,
    getOnePost,
    updatePost,
    createPost,
    deletePost
};