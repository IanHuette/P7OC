const bcrypt = require('bcrypt');
const con = require("../database");
const { getUserDataResponse, unauthorizedObj } = require('../middleware/auth');

const serverErrorMessage = "Une erreur est survenue, veuillez réessayer plus tard.";
const userNotFoundObj = {
  statusCode: 404,
  message: "Utilisateur non trouvé !",
  success: false  
}


/**
 * VERIFIE QUE L'ID PASSÉ DANS LE JWT CORRESPOND BIEN A L'ID REQUETÉ
 */
const checkAuth = async (req, res, next) => {

  const loginQuery = new Promise( (accept, reject) => {
    con.query(
      "SELECT id, username FROM users WHERE id = ?",
      [req.body.userIdRef],
      async (err, result) => {
        if (err) 
          reject(err);
        if (result.length < 1) {
          // on retourne une réponse 404 si l'utilisateur n'a pas été trouvé en bdd
          accept(userNotFoundObj);
        } else {
          // comportement si on a trouvé un utilisateur
          const userIdFromQueryResult = result[0].id;
          const usernameFromQueryResult = result[0].username;
          accept(getUserDataResponse(userIdFromQueryResult, usernameFromQueryResult));
        }
      }
    );
  });

  try {
    const loginResult = await loginQuery;
    res.status(loginResult.statusCode).json({message: loginResult.message, success: loginResult.success});
  } catch (err) {
    console.error(err);
    res.status(401).json({message:'Vous n\êtes pas autorisé à consulter cette ressource', success: false});
  } 
};

/**
 * ENREGISTREMENT D'UN COMPTE
 */
const signup = async (req, res, next) => {

  const {username, email, password} = req.body;

  // récupérer le hash du password qu'envoie l'utilisateur
  let hash = '';
  try {
    hash = await bcrypt.hash(password, 10);
  } catch (error) {
    console.error("prob with bcrypt");
    console.error(error);
    res.status(500).json({message:serverErrorMessage, success: false});
  }

  const signUpQuery = new Promise((acc, rej) => {
    con.query(
      "INSERT INTO users (username, password, email) VALUES (?,?,?)",
      [username, hash, email],
        err => {
            if (err) return rej(false);
            acc(true);
        },
    );
  });

  try {
    await signUpQuery;
    res.status(201).json({message: 'Compte créé !', success: true});
  } catch (error) {
    console.error("prob with mysql");
    res.status(500).json({ message: serverErrorMessage, success: false });
  }
};

/**
 * CONNEXION D'UN COMPTE
 */
const login = async (req, res, next) => {
  const {username, password} = req.body;

  const loginQuery = new Promise( (accept, reject) => {
    con.query(
      "SELECT password,id FROM users WHERE username = ?",
      [username],
      async (err, result) => {
        if (err) 
          reject(err);
        if (result.length < 1) {
          // on retourne une réponse 404 si l'utilisateur n'a pas été trouvé en bdd
          accept(userNotFoundObj);
        } else {
          // comportement si on a trouvé un utilisateur
          const userIdFromQueryResult = result[0].id;
          const hashFromQueryResult = result[0].password;
          // on veut comparer le hash depuis la requête avec celui obtenu depuis la base de données
          try {
            const hashComparison = await bcrypt.compare(password, hashFromQueryResult);
            if (!hashComparison) {
              throw new Error("passwords dont match");
            }
            accept(getUserDataResponse(userIdFromQueryResult, username));
          } catch (err) {
            reject(err);
          }
        }
      }
    );
  });

  try {
    const loginResult = await loginQuery;
    res.status(loginResult.statusCode).json({message: loginResult.message, success: loginResult.success});
  } catch (err) {
    console.error(err);
    res.status(401).json({message:'Vous n\êtes pas autorisé à consulter cette ressource', success: false});
  } 
};

/**
 * SUPPRESSION D'UN COMPTE
 */
const deleteOne = async (req, res, next) => {
  const userId = req.params.userId;
  
  if (userId != req.body.userIdRef) {
    res.status(401).json(unauthorizedObj);
  } else {
    const deleteAccountQuery = new Promise((accept, reject) => {
      con.query(
        "DELETE FROM users WHERE id = ?",
        [userId],
        (err, result) => {
          if (err) reject(err);
          if (result.length < 1) {
            accept(userNotFoundObj);
          }
          accept({
            statusCode: 200,
            message: "Compte supprimé",
            success: true
          });
        }
      );
    });
  
    try {
      const result = await deleteAccountQuery;
      res.status(result.statusCode).json({message: result.message, success: result.success});
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: serverErrorMessage });
    }
  }
}

const getOneUser = async (req, res, next) => {
  const userId = req.params.userId;
console.log(userId);
  const getOneUserQuery = new Promise((accept, reject) => {
    con.query(
      "SELECT username FROM users WHERE id = ?", 
      [userId], function (err, result, fields) {
        if (err) {
          console.error(err);
          reject(err);
        }
        accept(result);
      }
    )
  });
  try {
    oneUser = await getOneUserQuery;
    res.status(201).json({message: oneUser, success: true});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: serverErrorMessage, success: false});
  }
}

module.exports = {
  signup,
  login,
  deleteOne,
  getOneUser, 
  checkAuth
};