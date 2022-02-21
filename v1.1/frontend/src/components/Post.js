import '../styles/components/Post.css';
import React, { useState, useEffect, Fragment } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";


// composant chargé de l'affichage d'un seul post
const Post = props => {

  const {post, userData, removePostFromList} = props;

  const [isEdit, setIsEdit] = useState(false);
  const [postContent, setPostContent] = useState(post.content);
  const [username, setUsername] = useState('');

  useEffect(async () => {
    setUsername(await getUsername())
  }, [])

  /**
   * SUPPRESSION D'UN POST
   */
  const onClickDelete = async () => {
    if (!window.confirm(`Voulez-vous vraiment supprimer le post ?`)) return;
    let postRemoved = false;
    try {
      const APIResponse = await axios.delete(`http://localhost:8080/api/posts/${post.id}?userId=${userData.userData.userId}&postUserId=${post.user_id}`,{
        headers: {
          'Authorization': 'Bearer ' + userData.userData.token
        }
      });
      postRemoved = APIResponse.data.success;
    } catch (err) {
      console.error(err)
    }
    if (!postRemoved) {
      alert("Vous ne pouvez pas supprimer ce post !");
    } else {
      removePostFromList(post, userData.userData.userId);
    }
  }

  /**
   * MODIFICATION D'UN POST
   */

  const onToggleEditionMode = () => {
    setIsEdit(true);
  }
    
  

  const onCancelUpdate = () => {
    setIsEdit(false);
  }

  const onContentChange = e => {
    setPostContent(e.target.value);
  };

  const onValidateUpdate = async () => {
    if (post.user_id !== userData.userData.userId) {
      alert("Vous ne pouvez pas modifier ce post !");
      setPostContent(post.content);
      setIsEdit(false);
    } else {
      axios.put(`http://localhost:8080/api/posts/${post.id}`, {
        content : postContent,
        userId : post.user_id,
      }, {headers: {
        'Authorization': 'Bearer ' + userData.userData.token
      }})
      .then(res => {alert("Post modifié !");})
      .catch(err => {alert("Problème de notre côté, nous n'avons pas pu mettre à jour votre post");})
      .finally(() => {
        setIsEdit(false);
      });
    }
  } 

 const getUsername = async () => {
    const apiResponse = await axios.get(`http://localhost:8080/api/auth/${post.user_id}`);
    let fetchedUsername = apiResponse.data.message[0].username;
    return fetchedUsername;
 }


 const getPostId = post.id

 const params = { 
  pathname: `comments/postid=${getPostId}=${username}`, 
  state: {post} 
 }
  const dateForFront = new Date(post.created_at);
  const dateFR = dateForFront.toLocaleString("fr-FR")
// En utilisant le state local de l'app on a un 'interrupteur' qui va mettre le composant en mode edition ou pas, en mode edition on affiche un input
  return <Fragment>
    {isEdit 
      ? <p><input type="text" value={postContent} onChange={onContentChange}/>&nbsp;
          <span className='testdesign'>
            <i className="fa-solid fa-check" onClick={onValidateUpdate}></i>
            <i className="fa-solid fa-ban" onClick={onCancelUpdate}></i>
          </span>
        </p>
      : <li className="newpost">{username} a posté le {dateFR} <i onClick={onToggleEditionMode} className="fa-solid fa-pen-to-square" />
          <i onClick={onClickDelete} className="fa-solid fa-trash-can" /><br></br>{postContent}<br></br>
          <Link to ={params} >Commentaire</Link>
        </li>
    }
  </Fragment>
};

export default Post;