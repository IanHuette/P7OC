import '../styles/views/Posts.css';
import Post from '../components/Post';
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import AuthContext from "../contexts/auth/AuthContext";
import {useNavigate} from "react-router-dom";
import checkAuth from '../helpers/check-auth';

  /**
 * LOGIQUE D'AFFICHAGE DES POSTS
 */
const getPosts = async (userData) => {
  console.log(userData);
  const apiResponse = await axios("http://localhost:8080/api/posts?userId="+userData.userId, {headers: {
    'Authorization': 'Bearer ' + userData.token
  }});
  let postsFromApi = apiResponse.data;
  postsFromApi = sortPostsByDate(postsFromApi.message);
  return postsFromApi;
}

  /**
 * LOGIQUE DE TRI PAR DATE DES POSTS CHRONOLOGIQUE
 */
const sortPostsByDate = (posts) => {
  console.log(posts)
  posts.sort((a, b) => {
    const splittedDateA = a.created_at.split("T");
    const splittedDateB = b.created_at.split("T");
    const formattedDateFromMySQLA = splittedDateA[0] + ' ' + splittedDateA[1].split(".000Z")[0];
    const formattedDateFromMySQLB = splittedDateB[0] + ' ' + splittedDateB[1].split(".000Z")[0];
    let c = new Date(formattedDateFromMySQLA);
    let d = new Date(formattedDateFromMySQLB);
    return d-c;
  });
  return posts;
}

const Posts = () => {

  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const authContext = useContext(AuthContext);
  const {userIsLoggedIn, logUserIn, userData} = authContext;
  const navigate = useNavigate();

    /**
     * VÉRIFICATION SI L'USER EST BIEN CONNECTÉ SINON RENVOYER À LA PAGE DE CONNEXION
     */
     useEffect(async () => {  
      const userDataFromLS = await checkAuth(userIsLoggedIn);
      if (!userDataFromLS.userIsLoggedIn) {
          navigate("/login");
      } else {
        // Une fois qu'on a récupéré les posts depuis l'API on met à jour le state local du composant avec useState (fonction setPosts)
        const fetchedPosts = await getPosts(userDataFromLS.userData);
        setPosts(fetchedPosts);
        logUserIn(userDataFromLS);
      }
    }, []); 

  const onContentChange = e => {
    setContent(e.target.value)
  }

  /**
 * LOGIQUE DE CRÉATION D'UN POST 
 */
  const onSubmitPost = async e => {
    e.preventDefault();
    let apiResult;
    try {
      const userId = userData.userData.userId;
      if(content === ''){
        alert("Message vide")
        return
      } else {
        apiResult = await axios.post(`http://localhost:8080/api/posts`, {
            content : content,
            userId : userId
        }, {headers: {
          'Authorization': 'Bearer ' + userData.userData.token
        }});
        alert("Message posté");
        let fetchedPosts = await getPosts(userData.userData);
        setPosts(fetchedPosts);  
      } }
      catch (error) {
        console.log(error);
        alert("Veuillez réessayer")
        return
      } 
  }

  const posttitle = 'Publications récentes';

  /**
 * LOGIQUE D'UPDATE DU STATE POUR AFFICHER DYNAMIQUEMENT LA SUPPRESSION D'UN POST
 */
  const removePostFromList = (postToRemove, userId) => {
    console.log(postToRemove, userId);
    if (postToRemove.user_id !== userId) return false;
    const newPostsList = posts.filter(post => post.id != postToRemove.id);
    setPosts(newPostsList);
  }

  return (
    <div className="post-size">
      <form className='form' method="post">
          <input aria-label='publication' type="text" className="input"  placeholder="Quoi de Neuf ?" onChange={onContentChange}></input>
          <button className='button-post' onClick={onSubmitPost}>Publier</button>
          
      </form>
      <h2 className="h2position">{posttitle}</h2>
      <ul>
        {/* On fait une boucle en utilisant la fonction map qui retourne un sous-composant Post pour chaque post, 
            A chaque sous composant on passe des données qui nous permettront d'identifier chaque post depuis le sous composant
        */}
        {posts.map((post) => {
          // On a besoin d'identifer chaque post de manière unique avec une clef sinon le tri par date fonctionne mal
          return <Post key={post.id} post={post} userData={userData} removePostFromList={removePostFromList}/>;
        })}
      </ul>
    </div>
  );


};

export default Posts;