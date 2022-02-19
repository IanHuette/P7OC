const jwt = require('jsonwebtoken');

const unauthorizedObj = {
    message: 'Vous n\êtes pas autorisé à consulter cette ressource',
    success: false
};

/**
 * VÉRIFIE QUE DANS LA REQUETE IL Y A UN USER ID PUIS COMPARE LE USER ID AVEC LE TOKEN JWT
 */
const authMiddleware = (req, res, next) => { // vérifie si le token envoyé est valable et si l'user id correspond bien
  try {
    const token = req.headers.authorization.split(' ')[1]; // extrait le token du header authorization / split pour récupérer tout après l'espace dans le header
    const decodedToken = jwt.verify(token, process.env.token);  // fonction verify pour décoder le token (si il n'est pas valide une erreur sera génégée)
    const userId = decodedToken.userId; // extrait de l'userID du token
    // si la requête contient un ID utilisateur, nous le comparons à celui extrait du token
    let authed = false;
    ["body", "params", "query"].forEach(reqPart => {
        if (req[reqPart] != undefined && req[reqPart].userId == userId) { 
            /**
             * on fait en sorte d'avoir un user id de référence pour futur usage dans les contrôleurs
             * afin de comparer le user id de la ressource à CRUD (create read update delete) avec cet id
             */
            authed = true;
            req.body.userIdRef = userId;
            next();
        }
    });
    // si la requête ne contient jamais le user id, on n'autorise pas la suite
    if (!authed) res.status(401).json(unauthorizedObj);
  } catch(err) {
    console.error(err);
    res.status(401).json(unauthorizedObj);
  }
};

const getUserDataResponse = (userId, username) => {
    return {
        statusCode: 200,
        message: {
            userId: userId,
            username: username,
            token: jwt.sign(
                { userId: userId },
                process.env.TOKEN,
                { expiresIn: '24h' }
            )
        },
        success: true
    };
}

module.exports = {
    authMiddleware,
    getUserDataResponse,
    unauthorizedObj
};