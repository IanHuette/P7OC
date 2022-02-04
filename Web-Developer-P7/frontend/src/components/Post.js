import React, { useState } from 'react';
import Axios from 'axios';


const Post = () => {

    // const [post, setPost] = useState("")
  const [post, setPost] = useState("")

  Axios("http://localhost:5000/api/posts")
    .then((res) => {
      setPost(res.data)
    });
    


  return (
    <ul>
      {post.data.map(item => (
        <li>{item.content}</li>
      ))}
    </ul>
  )
}

//  const [posts, setPosts] = useState({ hits: [] });

//   useEffect(async () => {
//     const result = await Axios(
//       'https://hn.algolia.com/api/v1/search?query=redux',
//     );

//     setPosts(result.posts);
//   }, []);
// console.log(posts)
//   return (
//     <ul>
//       {posts.hits.map(item => (
//         <li key={item.objectID}>
//           <a href={item.url}>{item.title}</a>
//         </li>
//       ))}
//     </ul>
//   );
    
  

  //   setPosts(result.posts);
  //   console.log(result);
  // });

// {posts.hits.map(item => (
//   <li key={item.content}>
//     {item.content}
//   </li>
// ))}

export default Post;
// const [posts, setPosts] = useState({ hits: [] });

// useEffect(async () => {
//   const result = await Axios.get(
//     'http://localhost:5000/api/posts',
//   );

//   setPosts(result.posts);
// }, []);
// console.log(posts);

// return (
//   <ul>

//   </ul>
// );
//   }