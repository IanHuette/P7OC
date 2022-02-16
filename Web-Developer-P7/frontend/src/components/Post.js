import '../styles/components/Post.css';
import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Post = props => {
  const navigate = useNavigate();

  const {content, id, userData} = props;

  /**
   * SUPPRESSION D'UN POST
   */
  const onClickDelete = async () => {
      // 1- récupérer l'id du post
      if (!window.confirm(`Voulez-vous vraiment supprimer le post ?`)) return;
      const postId = props.id
    console.log(userData.userData.token);
      const APIResponse = await axios.delete(`http://localhost:8080/api/posts/${postId}`,{
        headers: {
          'Authorization': 'Bearer ' + userData.userData.token
        }
      });
      navigate("/")
      if (!APIResponse.data.success) {
        alert("Post non existant")
      }
      
  }

  /**
   * MODIFICATION D'UN POST
   */
  const onClickUpdate = () => {
    alert('ceci est le test 2');
  }
  
  // étapes pour remplacer le li par un input on update
  // TODO 1) créér un state pour ce composant (useState)
  // TODO 2) créer une variable de state initialisée à false `isEdit` et une une autre qui va avoir le contenu du post
  // TODO 3) si !isEdit alors on affiche le li sinon on affiche un input avec pour valeur initiale le contenu du post
  // TODO 4) onChange event sur l'input s'il existe
  // TODO 5) update le state dans le onChange event
  // TODO 6) après confirmation de l'utilisateur (bouton de validation), envoyer la requête au backend pour update le post
  // TODO 7) afficher que tout s'est bien passé à l'utilisateur
  // TODO 8) remettre `isEdit` à false

  return <li className="newpost">{content} <i onClick={onClickUpdate} className="fa-solid fa-pen-to-square" /><i onClick={onClickDelete} className="fa-solid fa-trash-can" /></li>;
};

export default Post;