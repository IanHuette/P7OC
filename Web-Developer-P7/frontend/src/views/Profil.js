import React, { useEffect, useContext } from 'react';
import axios from "axios";
import checkAuth from '../helpers/check-auth';
import AuthContext from '../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';


const Profil = () => {

  const authContext = useContext(AuthContext);
  const {userIsLoggedIn, logUserIn, userData} = authContext;


  const navigate = useNavigate();

  useEffect(async() => {
    const userData = await checkAuth(userIsLoggedIn);
    if (userData.userIsLoggedIn) {
      logUserIn(userData);
    } else {
      navigate("/login");
    }
  }, []); 

  const onSubmit = async () => {
    if (!window.confirm(`Voulez-vous vraiment supprimer le compte ?`)) return;
    // TODO we repeat ourselves a lot with this => create a function
    const userDataFromLocalStorage = localStorage.getItem('userData');
    const userDataParsed = JSON.parse(userDataFromLocalStorage);

    const APIResponse = await axios.delete(`http://localhost:8080/api/auth/profil/${userDataParsed.userId}`, {
      headers: {
          'Authorization': 'Bearer ' + userDataParsed.token
      }
    });
    
    localStorage.clear();
    if (!APIResponse.data.success) {
      alert("Compte non existant")
    } 
    navigate("/signup");
  }
  const onSubmitLogout = async () => {
    if (!window.confirm(`Vous allez être déconnecté`)) return;
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <button>Supprimer le compte</button>
      </form>
      <form onSubmit={onSubmitLogout}>
        <button>Se déconnecter</button>
      </form>
    </div>



  )
}

export default Profil