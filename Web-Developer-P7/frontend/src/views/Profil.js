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
    const userId = localStorage.getItem('userData');
    axios.delete(`http://localhost:8080/api/auth/profil/${userId}`, {
      headers: {
          'Authorization': 'Bearer ' + userData.token
      }
    });
    // localStorage.clear();
    // navigate("/signup");

  }

  return (
    <form  onSubmit={onSubmit}>
      <button>Supprimer le compte</button>
    </form>
  )
}

export default Profil