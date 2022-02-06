import React, {Fragment, useState, useRef, useContext} from 'react';
import "./../styles/views/LoginSignup.css";
import { Link, useLocation } from "react-router-dom";
import AuthContext from '../contexts/auth/AuthContext';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import validate from '../validateInfo';

const LoginSignup = () => {

    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const submitType = useRef('');

    const authContext = useContext(AuthContext);
    const {logUserIn} = authContext;

    let navigate = useNavigate();

    const onUsernameChange = e => {
        setUsername(e.target.value);
    };

    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

    const onSubmit = async e => {

        e.preventDefault();

        let apiResult;
        
        // send to correct backend route case login or signup
        if (submitType.current.value === 'SIGNUP') {
            apiResult = await axios.post("http://localhost:8080/api/auth/signup", {
                username: username,
                password: password,
                email: email,
            });
            alert("Compte crée avec succès, vous pouvez vous connectez")
            window.location.assign("/login")
        } else if (submitType.current.value === 'LOGIN') {
            apiResult = await axios.post("http://localhost:8080/api/auth/login", {
                username: username,
                password: password,
            });
            logUserIn(true);
        }

        console.log(apiResult);
        // TODO wait for the API response to see if logged in or not
        // TODO error handling

        
        navigate("/");
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
