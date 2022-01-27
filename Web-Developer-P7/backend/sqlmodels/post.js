
// TODO update as it was done with User
const Post = {  
  userId: { type: String, required: true },
  imageUrl: { type: String, /*required: true */ },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true},
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true},
};

module.exports = Post;