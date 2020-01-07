  const express = require('express');
const massive = require('massive');

const users = require('./controllers/users');
const posts = require('./controllers/posts');
const comments = require('./controllers/comments');

massive({
  host: 'localhost',
  port: 5432,
  database: 'node3',
  user: 'postgres',
  password: 'node3db',
})
  .then(db => {
    const app = express();

    app.set('db', db);

    app.use(express.json());

    //USERS
    app.post('/api/users', users.signup); //register user
    app.get('/api/users', users.userList); //list all users
    app.get('/api/users/:id', users.getUserById); //get user account by id
    app.get('/api/users/:id/profile', users.getUserProfile); //get user profile

    //POSTS
    app.post('/api/posts', posts.createPost); //create post
    app.get('/api/posts/:userId', posts.listPosts); //list all posts by user
    app.get('/api/post/:id', posts.getPost) //get post by postId
    app.patch('/api/post/:id', posts.updatePost) // update post

    //COMMENTS
    app.post('/api/post/:postId/comments', comments.createComment); //add comment to post
    app.patch('/api/post/:postId/comment/:id', comments.updateComment); //update comment

    const PORT = 3002;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
});