import React, { useEffect, useContext } from 'react';
import axios from "axios";
import checkAuth from '../helpers/check-auth';
import AuthContext from '../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';


const Profil = () => {

  const authContext = useContext(AuthContext);
  const {userIsLoggedIn, logUserIn} = authContext;

  const navigate = useNavigate();

  useEffect(async() => {
    const userData = await checkAuth(userIsLoggedIn);
    if (userData.userIsLoggedIn) {
      logUserIn(userData);
    } else {
      navigate("/login");
    }
  }, []); 
  
  const onSubmit = () => {
    const userId = JSON.parse(localStorage.getItem("userData")).message.userId;
    console.log(userId);
    axios.post(`http://localhost:8080/api/auth/profil/${userId}`);
    // if (!window.confirm(`Voulez-vous vraiment désactiver le compte ?`)) return;
      // localStorage.clear();
  }

  return (
    <form  onSubmit={onSubmit}>
      <button>Supprimer le compte</button>
    </form>
  )
}

export default Profil