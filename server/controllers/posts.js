module.exports = {
  createPost: (req, res) => {
    const db = req.app.get('db');
    const { userId, content } = req.body;

    db.posts
      .insert({
        userId,
        content
      })
      .then( post => res.status(201).send(post))
      .catch( error => {
        console.error(error)
        res.status(500).end();
      })
  },
  getPost: (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;

    db.posts
      .find(id)
      .then( post => {
        db.comments
          .find({ postId: id})
          .then(comments => res.status(200).send({post, comments}))
          .catch( error => {
            console.error(error);
            res.status(500).end();
          })
      })
      .catch( error => {
        console.error(error);
        res.status(500).end();
      })

  },
  listPosts: (req, res) => {
    const db = req.app.get('db');
    const { userId } = req.params;

    db.posts
      .find({ userId })
      .then(userPosts => res.status(200).send(userPosts))
      .catch(error => {
        console.error(error);
        res.status(500).end();
      })
  },
  updatePost: (req, res) => {
    const db = req.app.get('db');
    const { content } = req.body;

    db.posts
      .update({
        id:req.params.id
      },{
        content:content
      })
      .then( updatedPost => res.status(200).send(updatedPost))
      .catch( error => {
        console.error(error);
        res.status(500).end();
      })
  }
};