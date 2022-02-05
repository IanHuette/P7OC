import React, {Fragment, useState, useRef, useContext} from 'react';
import "./../styles/views/LoginSignup.css";
import { Link, useLocation } from "react-router-dom";
import AuthContext from '../contexts/auth/AuthContext';
import {useNavigate} from "react-router-dom";

const LoginSignup = () => {

    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const submitType = useRef('');

    const authContext = useContext(AuthContext);
    const {logUserIn} = authContext;

    let navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();

        // TODO send to correct backend route case login or signup
        console.log(submitType.current.value);
        // TODO wait for the API response to see if logged in or not
        // TODO error handling

        logUserIn(true);
        navigate("/");
    };

    const onUsernameChange = e => {
        setUsername(e.target.value);
    };
    
    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

    return <Fragment>
        <form onSubmit={onSubmit}>
            {location.pathname === "/signup"
                ? <h1>S'inscrire</h1>
                : <h1>Connexion</h1>
            }
            <label><b>Nom d'utilisateur</b></label>
            <input type="text" placeholder="Entrer le nom d'utilisateur" name="username" value={username} onChange={onUsernameChange} required />
            <label><b>Mot de passe</b></label>
            <input type="password" placeholder="Entrer le mot de passe" name="password" value={password} onChange={onPasswordChange} required />
            {location.pathname === "/signup" && 
                <React.Fragment>
                    <label><b>Email</b></label>
                    <input type="email" placeholder="Entrer votre adresse mail" name="email" value={email} onChange={onEmailChange} required />
                </React.Fragment>
            }
            {location.pathname === "/signup"
                ? <React.Fragment><input type="submit" ref={submitType} id='submit' value='SIGNUP'/>Vous avez déjà un compte ? <Link to ="../login">Se connecter</Link></React.Fragment> 
                : <React.Fragment><input type="submit" ref={submitType} id='submit' value='LOGIN'/>Vous n'avez pas encore de compte ? <Link to ="../signup">S'inscrire</Link></React.Fragment>
            }
        </form>
    </Fragment>

};


export default LoginSignup;
