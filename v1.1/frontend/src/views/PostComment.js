import React, { useState, useEffect, Fragment } from 'react'
import axios from "axios";

const getPost = async () => {
    let params = window.location.href
    let url = new URL(params)
    let postId = url.pathname.split("/comments/")[1];

    const apiResponse = await axios.get(`http://localhost:8080/api/posts/${postId}`);
    let fetchedPost = apiResponse.data.message[0].content;
    return fetchedPost

}

const PostComment = () => {
    const [post, setPost] = useState('');
    const [username, setUsername] = useState('');



    useEffect(async () => {
        setPost(await getPost())
        setUsername(await getUsername())
      }, [])


    const getUsername = async () => {
        let user_id = apiResponse.data.message[0].user_id; // récupérer le user_id problème
        const apiResponse = await axios.get(`http://localhost:8080/api/auth/${user_id}`);
        let fetchedUsername = apiResponse.data.message[0].username;
        console.log(fetchedUsername);
        return fetchedUsername;
     }
  return (
    <div>
        <ul>
            <li className='newpost'>{post}</li>
        </ul>
        <h1>Commentaire</h1>
        
    </div>
  )
}

export default PostComment