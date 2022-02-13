import '../styles/views/Posts.css';
import Post from '../components/Post';
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import AuthContext from "../contexts/auth/AuthContext";
import {useNavigate} from "react-router-dom";
import checkAuth from '../helpers/check-auth';

const Posts = () => {

  const [posts, setPosts] = useState([]);
  const authContext = useContext(AuthContext);
  const {userIsLoggedIn, logUserIn, userData} = authContext;
  const navigate = useNavigate();

  useEffect(async () => {

    const userObj = await checkAuth(userIsLoggedIn);

    if (userObj.userIsLoggedIn) {
      const apiResponse = await axios("http://localhost:8080/api/posts");
      const postsFromApi = apiResponse.data;
      postsFromApi.sort((a, b) => {
        const splittedDateA = a.created_at.split("T");
        const splittedDateB = b.created_at.split("T");
        const formattedDateFromMySQLA = splittedDateA[0] + ' ' + splittedDateA[1].split(".000Z")[0];
        const formattedDateFromMySQLB = splittedDateB[0] + ' ' + splittedDateB[1].split(".000Z")[0];
        let c = new Date(formattedDateFromMySQLA);
        let d = new Date(formattedDateFromMySQLB);
        return d-c;
      });
      logUserIn(userObj);
      setPosts(postsFromApi);
    } else {
      navigate("/login");
    }

  }, []);




  const posttitle = 'Publications récentes';
  return (
    <div className="post-size">
      <form /*</div>onSubmit={onSubmit}*/ className='form' method="post">
          <input type="text" className="input" placeholder="Quoi de Neuf ?"></input>
          <button className='button-post'>Publier</button>
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