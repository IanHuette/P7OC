const Post = props => {
  const {content} = props;
  return <li className="newpost">{content}</li>;
};

export default Post;

// const [post, setPost] = useState("")
// const [post, setPost] = useState("");

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