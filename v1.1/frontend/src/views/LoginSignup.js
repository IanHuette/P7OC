import React, {Fragment, useState, useRef, useContext, useEffect} from 'react';
import "./../styles/views/LoginSignup.css";
import { Link, useLocation } from "react-router-dom";
import AuthContext from '../contexts/auth/AuthContext';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import checkAuth from '../helpers/check-auth';

const LoginSignup = () => {

    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const submitType = useRef('');

    const authContext = useContext(AuthContext);
    const {logUserIn, userIsLoggedIn, userData} = authContext;

    let navigate = useNavigate();

    /**
     * VÉRIFICATION SI L'USER N EST PAS CONNECTE SINON RENVOI VERS LA PAGE DE POSTS, 
     * On récupere les données utilisateur depuis le localstorage,
     * On vérifie ses données avec la fonction checkAuth auprès du backend,
     * ça nous renvoie un object qui contient la donnée utilisateur mise à jour,
     * Notamment le fait qu'il soit connecté ou pas
     * Si il est connecté on actualise le state global de l'app en utilisant useContext
     */
    useEffect(async () => {  
        const userDataFromLS = await checkAuth(userIsLoggedIn); 
        if (userDataFromLS.userIsLoggedIn) {
            logUserIn(userDataFromLS);
            navigate("/");
        }
    }, []); 

    const onUsernameChange = e => {
        setUsername(e.target.value);
    };

    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    const onEmailChange = e => {
        setEmail(e.target.value);
    };

/**
 * LOGIQUE DE CONNEXION ET D'ENREGISTREMENT D'UN COMPTE
 */
    const onSubmit = async e => {

        e.preventDefault();
        let apiResult;
        
        //  Signup logique
        if (submitType.current.value === 'SIGNUP') {
            try {
                apiResult = await axios.post("http://localhost:8080/api/auth/signup", {
                    username: username,
                    password: password,
                    email: email,
                });
                alert("Compte crée avec succès, vous pouvez vous connectez");
                navigate("/login");
            } catch (error) {
                console.log(error)
                alert("Nom d'utilisateur ou email déjà utilisé")
                return
            }
        } 
        
        // Login logique
        if (submitType.current.value === 'LOGIN') {
            try {
                apiResult = await axios.post("http://localhost:8080/api/auth/login", {
                    username: username,
                    password: password
                });
                localStorage.setItem('userData', JSON.stringify(apiResult.data.message));
                logUserIn(apiResult.data.message);
                alert(`Connexion réussie ! bienvenue ${username}`);
                navigate("/");
            } catch (error) {
                console.log(error)
                alert("Combinaison nom d'utilisateur / mot de passe incorrect")
                return;
            }
        } 
    };

    return <Fragment>
        <form onSubmit={onSubmit}>
            {location.pathname === "/signup"
                ? <h1>S'inscrire</h1>
                : <h1>Connexion</h1>
            }
            <label><b>Nom d'utilisateur</b></label>
            <div id='usernameError'></div>
            <input id="usernameForm" type="text" placeholder="Entrer le nom d'utilisateur" name="username" aria-label='username' value={username} onChange={onUsernameChange} required />
            <label><b>Mot de passe</b></label>
            <div id='passwordError'></div>
            <input id="passwordForm" type="password" placeholder="Entrer le mot de passe" name="password"  aria-label='password' value={password} onChange={onPasswordChange} required />
            {location.pathname === "/signup" && 
                <React.Fragment>
                    <label><b>Email</b></label>
                    <input id="emailForm" type="email" placeholder="Entrer votre adresse mail" name="email"  aria-label='email' value={email} onChange={onEmailChange} required />
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
