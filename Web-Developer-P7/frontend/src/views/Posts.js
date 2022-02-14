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

  const onSubmitPost = async e => {
    e.preventDefault();
    let apiResult;
    try {
      // TODO make sure we get the user id
      const user_id = userData.userData.userId;
      // TODO send post request with content / user_id (cf. LoginSignup)
      if(content === ''){
        //error + return
        console.log('Merci d\'écrire un message')
        alert("Message vide")
        return
      } else {
        apiResult = await axios.post(`http://localhost:8080/api/posts/create`, {
          content : content,
          user_id : user_id,
        });
        // TODO make sure latest post appears on top of the list
        alert("Message posté");
        let fetchedPosts = await getPosts();
        fetchedPosts = sortPostsByDate(fetchedPosts);
        setPosts(fetchedPosts);  
      } }
      catch (error) {
        console.log(error);
        // TODO feedback to user in case failure
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
          <Post key={`${post}-${index}`} content={post.content}/>
        ))}
      </ul>
    </div>
  );

};

export default Posts;