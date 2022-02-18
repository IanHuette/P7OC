import '../styles/components/Post.css';
import React, { useState, Fragment } from 'react';
import axios from "axios";


const Post = props => {

  const {post, userData, removePostFromList} = props;

  const [isEdit, setIsEdit] = useState(false);
  const [postContent, setPostContent] = useState(post.content);

  /**
   * SUPPRESSION D'UN POST
   */
  const onClickDelete = async () => {
    if (!window.confirm(`Voulez-vous vraiment supprimer le post ?`)) return;
    const APIResponse = await axios.delete(`http://localhost:8080/api/posts/${post.id}?userId=${userData.userData.userId}`,{
      headers: {
        'Authorization': 'Bearer ' + userData.userData.token
      }
    });
    const postRemoved = removePostFromList(post, userData.userData.userId);
    if (!APIResponse.data.success) {
      alert("Post non existant");
    }
    if (postRemoved === false) {
      alert("Vous ne pouvez pas supprimer ce post !");
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

  const dateForFront = new Date(post.created_at);
  const dateFR = dateForFront.toLocaleString("fr-FR")

  return <Fragment>
    {isEdit 
      ? <p><input type="text" value={postContent} onChange={onContentChange}/>&nbsp;<span className='testdesign'><i className="fa-solid fa-check" onClick={onValidateUpdate}></i><i className="fa-solid fa-ban" onClick={onCancelUpdate}></i></span></p>
      : <li className="newpost">posté le {dateFR} <i onClick={onToggleEditionMode} className="fa-solid fa-pen-to-square" /><i onClick={onClickDelete} className="fa-solid fa-trash-can" /><br></br>{postContent}</li>
    }
  </Fragment>
};

export default Post;