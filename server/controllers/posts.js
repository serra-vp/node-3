module.exports = {
  createPost: (req, res) => {
    const db = req.app.get('db');
    const { userId, post } = req.body;

    db.posts
      .insert({
        userId,
        post
      })
      .then( post => res.status(201).send(post))
      .catch( error => {
        console.error(error)
        res.status(500).end();
      })
  },
};