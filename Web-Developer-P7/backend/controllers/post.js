const con = require('../database');

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
 * AFFICHER UN POST
 */
const getOnePost = (req, res, next) => {
  con.connect(function(err) {
    if (err) {
      res.status(500).json({ message: "something wrong, please try again later" });
    }
    con.query("SELECT id FROM posts", function (err, result, fields) {
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
  const postId = '' // récupérer le post Id

  try {
    const deleteMySQLQuery = new Promise( (accept, reject) => {
      con.query(
        "DELETE FROM posts WHERE (id, user_id) = (?,?)",
        [postId, userId],
        async (err, result) => {
          if (err) reject(err);
          if (result.length < 1) {
           accept({
             statusCode: 404,
             message: "Post inexistant !",
             success: false
           });
          }
        }
      );
    });
    deleteMySQLQuery.then(result => {
      res.status(result.statusCode).json({message: result.message, success: result.success});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: errorMessage500 });
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({message:"UNAUTHORIZED", success: false});
  }
  res.status(200).json({message:"POST DELETED", success: true});
}

module.exports = {
    getAllPosts,
    getOnePost,
    createPost,
    deletePost
};