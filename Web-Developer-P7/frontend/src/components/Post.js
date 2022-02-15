import '../styles/components/Post.css';
import React from 'react';
import axios from "axios";


const Post = props => {

  const {content, id, userData} = props;
  console.log(props);
  /**
   * SUPPRESSION D'UN POST
   */
  const onClickDelete = () => {
      // 1- récupérer l'id du post
      if (!window.confirm(`Voulez-vous vraiment supprimer le post ?`)) return;

      // TODO dont forget 
      //   headers: {
      //     'Authorization': 'Bearer ' + userDataParsed.token
      // }

      // axios(`http://localhost:8080/api/posts/${id}`)
      // .then(res => res.json())
      // .then(resultatAPI => {
      //   console.log(resultatAPI)
      // })
    
  }

  /**
   * MODIFICATION D'UN POST
   */
  const onClickUpdate = () => {
    alert('ceci est le test 2');
  }
  
  return <li className="newpost">{content} <i onClick={onClickUpdate} className="fa-solid fa-pen-to-square" /><i onClick={onClickDelete} className="fa-solid fa-trash-can" /></li>;
};

export default Post;