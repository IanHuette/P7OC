// TODO in the models only keep the constructor with properties

class User {

    constructor(email, password, username) {
      this.email = email;
      this.password = password;
      this.username = username;
    }
    
    // TODO find
    // find() {
    //   con.connect(function(err) {
    //     con.query("SELECT * FROM users", function (err, result, fields) {
    //       if (err) return false;
    //       return result;
    //     });
    //   }); 
    // }

    // save() { 
    //     let userSavedOK = false;
    //     // TODO save user in SQL using this function, this method should implement failures
    //     con.connect(function(err) {
    //       con.query("CREATE * FROM users", function (err, result, fields) {
    //         if (err) return false;
    //         return result;
    //       });
    //     }) 
    //     return userSavedOK;
    // }

    // findOne() { 
    //   let userFoundOK = false;
    //   // TODO save user in SQL using this function, this method should implement failures
    //   return userFoundOK;
    // }

    // deleteOne() { 
    //   let userDeletedOK = false;
    //   // TODO save user in SQL using this function, this method should implement failures
    //   return userFoundOK;
    // }
};

module.exports = User;

// TODO save the user using my SQL and return the response the same way
/**
 * 
 * if synchronous =>
 *  if (user.save()) {res.status(201).json({ message: 'Utilisateur créé !' })} else {res.status(400).json({ error; "problem while saving user" })}
 * 
 * if Promise =>
 *  .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
 *  .catch(error => res.status(400).json({ error }));
 */
// const sqlSave = "INSERT INTO users SET ?";
// con.query(sqlSave, sqlUser, (err, result) => {
//   if (err) {
//     res.status(400).json({ err });
//     throw err;
//   }
//     else {
//       res.status(201).json({ message: 'User enregistrée'});
//     }
// });