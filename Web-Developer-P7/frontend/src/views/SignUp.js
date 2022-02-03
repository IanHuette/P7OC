import React, {Fragment} from 'react';
import "./../styles/SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => (
    <Fragment>
        <form action="verification.php" method="POST">
            <h1>S'inscrire</h1>
            <label><b>Nom d'utilisateur</b></label>
            <input type="text" placeholder="Entrer le nom d'utilisateur" name="username" required />
            <label><b>Mot de passe</b></label>
            <input type="password" placeholder="Entrer le mot de passe" name="password" required />
            <input type="submit" id='submit' value='SIGNUP'/>
                Vous avez déjà un compte ?<Link to ="../login"> Se connecter</Link>
        </form>
    </Fragment>
);


export default SignUp;
