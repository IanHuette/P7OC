import React, { useState, useEffect, useContext } from 'react'
import axios from "axios";

import AuthContext from "../contexts/auth/AuthContext";
import {useNavigate} from "react-router-dom";
import checkAuth from '../helpers/check-auth';




const getPost = async () => {
  let params = window.location.href
  let url = new URL(params)
  let postId = url.pathname.split("=")[1];

    const apiResponse = await axios.get(`http://localhost:8080/api/posts/${postId}`);
    let fetchedPost = apiResponse.data.message[0].content;
    return fetchedPost
}

const sortCommentsByDate = (comments) => {
  console.log(comments);
  comments.sort((a, b) => {
    const splittedDateA = a.created_at.split("T");
    const splittedDateB = b.created_at.split("T");
    const formattedDateFromMySQLA = splittedDateA[0] + ' ' + splittedDateA[1].split(".000Z")[0];
    const formattedDateFromMySQLB = splittedDateB[0] + ' ' + splittedDateB[1].split(".000Z")[0];
    let c = new Date(formattedDateFromMySQLA);
    let d = new Date(formattedDateFromMySQLB);
    return d-c;
  });
  return comments;
}

const getComments = async (userData) => {
  let params = window.location.href
  let url = new URL(params)
  let postId = url.pathname.split("=")[1];
  const apiResponse = await axios.get(`http://localhost:8080/api/comments/${postId}`, {headers: {
    'Authorization': 'Bearer ' + userData.token
  }});
  let commentsFromApi = apiResponse.data;
  commentsFromApi = sortCommentsByDate(commentsFromApi.message);
  return commentsFromApi;
}

const getUsernameFromParams = () => {
  let params = window.location.href
  let url = new URL(params)
  let username = url.pathname.split("=")[2];
  return username;
}

const PostComment = () => {
    const [post, setPost] = useState('');
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [currentPostUsername, setCurrentPostUsername] = useState('');
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const {userIsLoggedIn, logUserIn, userData} = authContext;

    useEffect(async () => {
      const userDataFromLS = await checkAuth(userIsLoggedIn);
      if (!userDataFromLS.userIsLoggedIn) {
          navigate("/login");
      } else {
        // Une fois qu'on a récupéré les posts depuis l'API on met à jour le state local du composant avec useState (fonction setPosts)
        const fetchedComment = await getComments(userDataFromLS.userData);
        setComments(fetchedComment);
        setPost(await getPost())
        setCurrentPostUsername(getUsernameFromParams())
        logUserIn(userDataFromLS);
      }
      }, [])
      const onCommentChange = e => {
        setComment(e.target.value)
      }

      const onSubmitComment = async e => {
        e.preventDefault();
        let params = window.location.href
        let url = new URL(params)
        let postId = url.pathname.split("=")[1];
        let apiResult;
        try {
          const userId = userData.userData.userId;
          if(comment === ''){
            alert("Message vide")
            return
          } else {
            apiResult = await axios.post(`http://localhost:8080/api/comments/${postId}`, {
                comment : comment,
                userId : userId
            }, {headers: {
              'Authorization': 'Bearer ' + userData.userData.token
            }});
            alert("Commentaire posté");
            let fetchedPost = await getComments(userData.userData);
            setComments(fetchedPost);  
          } }
          catch (error) {
            console.log(error);
            alert("Veuillez réessayer")
            return
          } 
      }
    




    // TODO

    const removeCommentFromList = (commentToRemove, userId) => {
      if (commentToRemove.user_id !== userId && !userData.userData.isModerator) return false;
      const newCommentsList = comments.filter(cmt => cmt.id != commentToRemove.id);
      setComments(newCommentsList);
    }
 
    const onClickDelete = async (cmt) => {
      if (!window.confirm(`Voulez-vous vraiment supprimer le commentaire ?`)) return;
      let commentRemoved = false;
      try {
        const APIResponse = await axios.delete(`http://localhost:8080/api/comments/${cmt.id}?userId=${userData.userData.userId}&commentUserId=${cmt.user_id}`,{
          headers: {
            'Authorization': 'Bearer ' + userData.userData.token
          }
        });
        commentRemoved = APIResponse.data.success;
      } catch (err) {
        console.error(err)
      }
      if (!commentRemoved) {
        alert("Vous ne pouvez pas supprimer ce commentaire !");
      } else {
        removeCommentFromList(cmt, userData.userData.userId);
      }
    }


  return (
    <div id="container">
      <div className="post-size">
        <h2 className='h2position'>Post de {currentPostUsername}</h2>
          <ul>
              <li className='newpost'>{post}</li>
          </ul>
          <h1 className='h2position'>Commentaire</h1>
          <form className='form' method="post">
            <input aria-label='publication' type="text" className="input"  placeholder="Poster un commentaire" onChange={onCommentChange}></input>
            <button className='button-post' onClick={onSubmitComment}>Publier</button>
        </form>
          {comments.map((cmt) => {
            const dateForFront = new Date(cmt.created_at);
            const dateFR = dateForFront.toLocaleString("fr-FR");
            return <li key={cmt.id} 
            removeCommentFromList={removeCommentFromList}
             className='newpost'>{cmt.username} a posté le {dateFR} <i 
            onClick={() => onClickDelete(cmt)} 
            className="fa-solid fa-trash-can" /><br></br>{cmt.comment}</li>;
          })}
        </div>
    </div>
  )
}

export default PostComment