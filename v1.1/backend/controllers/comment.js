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

  // TODO
  // const deleteComment = async (req, res, next) => {
  //   const postId = req.params.postId;
  //   const userId = req.query.userId;
  //   const postUserId = req.query.postUserId;
  
  //   let isModerator = false;
  
  //   const searchModerator = new Promise((accept, reject) => {
  //     con.query(
  //       "SELECT isModerator FROM users WHERE id = ?",
  //       [userId],
  //       function (err, result) {
  //         if (err) {
  //           console.error(err);
  //           reject(err);
  //         }
  //         accept(result);
  //       });
  //   });
  
  //   try {
  //     const isModeratorRes = await searchModerator;
  //     isModerator = isModeratorRes[0].isModerator == 1 ? true : false;
  //   } catch (err) {
  //     console.error(err);
  //   } 
  
  //   // pour une raison étrange, le middleware d'authentification provoque une erreur de headers pour cette route DELETE...
  //   const token = req.headers.authorization.split(' ')[1].length >= 2 ? req.headers.authorization.split(' ')[1] : ''; // extrait le token du header authorization / split pour récupérer tout après l'espace dans le header
  //   const decodedToken = jwt.verify(token, process.env.token);  // fonction verify pour décoder le token (si il n'est pas valide une erreur sera génégée)
  //   const decryptedUserId = decodedToken.userId ? decodedToken.userId : 0; // extrait de l'userID du token
  
  //   if (postUserId!= decryptedUserId && !isModerator) { 
  //     res.status(401).json(unauthorizedObj);
  //   } 
  //   // ici on est sûrs que même si un utilisateur authentifié tente d'effacer le post d'un autre user, la paire id/user_id ne matchera pas
  //   else {
  //     const deletePostQuery = new Promise((accept, reject) => {
  //       con.query(
  //         "DELETE FROM posts WHERE (id) = (?)",
  //         [postId],
  //         err => {
  //           if (err) reject(false);
  //           accept(true);
  //         }
  //       );
  //     }); 
  //     try {
  //       await deletePostQuery;
  //       res.status(200).json({message: 'Post supprimé !', success: true});
  //     } catch (err) {
  //       console.error(err);
  //       res.status(500).json({ message: serverErrorMessage });      
  //     }
  //   }
  // };

module.exports = {
    getAllComments,
    createComment,
    deleteComment
}