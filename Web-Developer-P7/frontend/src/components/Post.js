import '../styles/components/Post.css';
import React, { useState, Fragment } from 'react';
import axios from "axios";


const Post = props => {

  const {post, userData, removePostFromList, modifyPostFromList} = props;
  console.log(post, userData);

  const [isEdit, setIsEdit] = useState(false);
  const [postContent, setPostContent] = useState(post.content);


  /**
   * SUPPRESSION D'UN POST
   */
  const onClickDelete = async () => {
    if (!window.confirm(`Voulez-vous vraiment supprimer le post ?`)) return;
    const APIResponse = await axios.delete(`http://localhost:8080/api/posts/${post.id}`,{
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
      setIsEdit(false);
    } else {
      axios.put(`http://localhost:8080/api/posts/${post.id}`, {
        headers: {
          'Authorization': 'Bearer ' + userData.userData.token
        },
        content : postContent,
        user_id : post.user_id,
      })
      .then(res => {alert("Post modifié !");})
      .catch(err => {alert("Problème de notre côté, nous n'avons pas pu mettre à jour votre post");})
      .finally(() => {
        setIsEdit(false);
      });
    }
  } 



  return <Fragment>
    {isEdit 
      ? <p><input type="text" value={postContent} onChange={onContentChange}/>&nbsp;<i className="fa-solid fa-check" onClick={onValidateUpdate}></i><i className="fa-solid fa-ban" onClick={onCancelUpdate}></i></p>
      : <li className="newpost">{postContent} <i onClick={onToggleEditionMode} className="fa-solid fa-pen-to-square" /><i onClick={onClickDelete} className="fa-solid fa-trash-can" /></li>
    }
  </Fragment>
};

export default Post;