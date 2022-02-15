import '../styles/views/Posts.css';
import Post from '../components/Post';
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import AuthContext from "../contexts/auth/AuthContext";
import {useNavigate} from "react-router-dom";
import checkAuth from '../helpers/check-auth';

const getPosts = async () => {
  const apiResponse = await axios("http://localhost:8080/api/posts");
  const postsFromApi = apiResponse.data;
  return postsFromApi;
}

const sortPostsByDate = (posts) => {
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
 * VÉRIFICATION SI L'USER EST BIEN CONNECTÉ, SI IL EST CONNECTÉ RENVOI LES POSTS SINON RENVOI À LA PAGE DE CONNEXION
 */
  useEffect(async () => {
    const userObj = await checkAuth(userIsLoggedIn);
    if (userObj.userIsLoggedIn) {
      let fetchedPosts = await getPosts();
      fetchedPosts = sortPostsByDate(fetchedPosts);
      logUserIn(userObj);
      setPosts(fetchedPosts);
    } else {
      navigate("/login");
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
      const user_id = userData.userData.userId;
      if(content === ''){
        console.log('Merci d\'écrire un message')
        alert("Message vide")
        return
      } else {
        apiResult = await axios.post(`http://localhost:8080/api/posts/create`, {
          content : content,
          user_id : user_id,
        });
        alert("Message posté");
        let fetchedPosts = await getPosts();
        fetchedPosts = sortPostsByDate(fetchedPosts);
        setPosts(fetchedPosts);  
      } }
      catch (error) {
        console.log(error);
        alert("Veuillez réessayer")
        return
      } 
  }


  const posttitle = 'Publications récentes';
  return (
    <div className="post-size">
      <form className='form' method="post">
          <input type="text" className="input"  placeholder="Quoi de Neuf ?" onChange={onContentChange}></input>
          <button className='button-post' onClick={onSubmitPost}>Publier</button>
      </form>
      <h2 className="h2position">{posttitle}</h2>
      <ul>
        {posts.map((post, index) => (
          // passage de propriétés à un composant enfant
          <Post key={`${post}-${index}`} content={post.content} id={post.id} userData={userData}/>
        ))}
      </ul>
    </div>
  );


};

export default Posts;