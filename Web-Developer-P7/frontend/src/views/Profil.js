import React, { useEffect, useContext } from 'react';
import axios from "axios";
import checkAuth from '../helpers/check-auth';
import AuthContext from '../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';


const Profil = () => {

  const authContext = useContext(AuthContext);
const {userIsLoggedIn, logUserIn, userData} = authContext;


  const navigate = useNavigate();

  /**
 * VÉRIFICATION SI L'USER EST BIEN CONNECTÉ SINON RENVOYÉ À LA PAGE DE CONNEXION
 */
  useEffect(async() => {
    const userData = await checkAuth(userIsLoggedIn);
    if (userData.userIsLoggedIn) {
      logUserIn(userData);
    } else {
      navigate("/login");
    }
  }, []); 

  /**
 * SUPPRESSION D'UN COMPTE 
 */
  const onDeleteAccount = () => {

    if (!window.confirm(`Voulez-vous vraiment supprimer le compte ?`)) return;
    const userDataFromLocalStorage = localStorage.getItem('userData');
    const userDataParsed = JSON.parse(userDataFromLocalStorage);

    axios.delete(`http://localhost:8080/api/auth/profil/32`, {
      headers: {
          'Authorization': 'Bearer ' + userDataParsed.token
      }
    })
    .then(res => {
      if (!res.data.success) {
        alert("Compte non existant")
      }
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de la supression du compte");
    })
    .finally(() => {
      localStorage.clear();
      navigate("/signup");
    });
  }

  /**
 * DÉCONNECTION D'UN COMPTE
 */
  const onLogout = async () => {
    if (!window.confirm(`Vous allez être déconnecté`)) return;
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <button onClick={onDeleteAccount}>Supprimer le compte</button>
      <button onClick={onLogout}>Se déconnecter</button>
    </div>



  )
}

export default Profil