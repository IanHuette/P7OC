import React, { useEffect, useContext } from 'react';
import axios from "axios";
import "./../styles/views/Profil.css";
import AuthContext from '../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../helpers/check-auth';


const Profil = () => {

  const authContext = useContext(AuthContext);
  const {userIsLoggedIn, logUserIn, userData} = authContext;


  const navigate = useNavigate();

    /**
     * VÉRIFICATION SI L'USER EST BIEN CONNECTÉ SINON RENVOYEr À LA PAGE DE CONNEXION
     */
    useEffect(async () => {  
      const userDataFromLS = await checkAuth(userIsLoggedIn);
      if (!userDataFromLS.userIsLoggedIn) {
          logUserIn(userDataFromLS);
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

    axios.delete(`http://localhost:8080/api/auth/profile/${userDataParsed.userId}`, {
      headers: {
          'Authorization': 'Bearer ' + userDataParsed.token
      }
    })
    .then(res => {
      if (!res.data.success) {
        alert("Erreur lors de la suppression du compte")
      } else {
        alert("Compte supprimé")
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
    <div className='btnoption'>
      <button className='btndelete' onClick={onDeleteAccount}>Supprimer le compte</button>
      <button className='btnlogout' onClick={onLogout}>Se déconnecter</button>
    </div>



  )
}

export default Profil