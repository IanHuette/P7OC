import React, {Fragment} from 'react';
import "./../styles/Login.css";
import { Link } from "react-router-dom"; 

const Login = () => (
    <Fragment>
        <form action="verification.php" method="POST">
            <h1>Connexion</h1>
            <label><b>Nom d'utilisateur</b></label>
            <input type="text" placeholder="Entrer le nom d'utilisateur" name="username" required />
            <label><b>Mot de passe</b></label>
            <input type="password" placeholder="Entrer le mot de passe" name="password" required />
            <input type="submit" id='submit' value='LOGIN' />
                Vous n'avez pas encore de compte ? <Link to ="../signup"> S'inscrire</Link>
        </form>
    </Fragment>
);


export default Login;
