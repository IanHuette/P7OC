const con = require('../database');
const { unauthorizedObj } = require('../middleware/auth');
const jwt = require("jsonwebtoken");

const serverErrorMessage = "Une erreur est survenue, veuillez réessayer plus tard.";


const getAllComments = async (req, res, next) => {
    const postId = req.params.postId// récupérer le postId dans la requete
    const getAllCommentsQuery = new Promise((accept, reject) => {
        con.connect(function(err) {
          if (err) {
            console.error(err);
            reject(err);
          }
          con.query(`SELECT c.id, u.username, c.comment, c.created_at 
            FROM comments c
            JOIN users u ON u.id = c.user_id 
            WHERE c.post_id = ?
            `, [postId],
           function (err, result, fields) {
            if (err) {
              console.error(err);
              reject(err);
            }
            accept(result);
          });
        });    
      });
      try {
        comments = await getAllCommentsQuery;
        res.status(200).json({message: comments, success: true});
      } catch (err) {
        console.error(err);
        res.status(500).json({message: serverErrorMessage, success: false});
      }
}
/**
 * CRÉER UN COMMENTAIRE
 */
 const createComment = async (req, res, next) => {
   console.log(req.body)
    const {comment, userId} = req.body;
    const postId = req.params.postId;
    console.log(postId)
    if(userId != req.body.userIdRef) {
      res.status(401).json(unauthorizedObj);
    } else {
      const createCommentQuery = new Promise( (accept, reject) => {
        con.query(
          `INSERT INTO comments (comment, user_id, post_id) VALUES (?, ?, ?)`,
          [comment, userId, postId],
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
        await createCommentQuery;
        res.status(201).json({message: 'Commentaire crée !', success: true});
      } catch (err) {
        console.error(err);
        res.status(500).json({message: serverErrorMessage, success: false});
      }
    }
  };

module.exports = {
    getAllComments,
    createComment
}