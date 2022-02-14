import '../styles/components/Post.css';

const Post = props => {
  const {content} = props;
  return <li className="newpost">{content}</li>;
};

export default Post;