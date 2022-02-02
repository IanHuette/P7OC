
// TODO update as it was done with User
class Post {  

  constructor(content, user_id, created_at) {
    this.content = content;
    this.user_id = user_id;
    this.created_at = created_at;
  }
};

module.exports = Post;