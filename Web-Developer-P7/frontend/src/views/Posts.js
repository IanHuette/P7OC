import '../styles/Posts.css';
import DummyComponent from "../components/DummyComponent";
const Posts = () => {

  const posts = [
    {id: 1, content: "my post", user_id:1, date: "2022-02-03 10:57:12"},
    {id: 2, content: "my post 2", user_id:1, date: "2022-02-03 10:58:12"},
    {id: 3, content: "my post 3", user_id:1, date: "2022-02-03 10:59:12"}
  ];
  console.log(posts);

  /**
   * const posts = [{id: 1, content: "my post", user_id:1, date: "2022-01-26 20:57:12"}, {id: 2, content: "my post 2", user_id:1, date: "2022-01-26 21:00:12"}, {id: 3, content: "my post 3", user_id:1, date: "2022-01-26 22:00:12"}]
   * 
  */

const posttitle = 'Publications récentes';
  return (
    <div className="post-size">
      <form className='form' method="post">
          <input type="text" className="input" placeholder="Quoi de Neuf ?"></input>
          <button className='button-post'>Publier</button>
      </form>
      <h2 className="h2position">{posttitle}</h2>
      <ul>
        {posts.map((post, index) => (
          
          <li className="newpost" key={`${post}-${index}`}>{ post.content }</li>
        ))}
      </ul>

        <DummyComponent />
    </div>
      
  )
}

export default Posts