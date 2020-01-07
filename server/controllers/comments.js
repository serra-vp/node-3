module.exports = {
  createComment: (req, res) => {
    const db = req.app.get('db');
    const { postId } = req.params;
    const { userId, comment } = req.body;
    
    db.comments
      .insert({
        userId,
        postId,
        comment
      })
      .then(comment => res.status(201).send(comment))
      .catch(error => {
        console.error(error);
        res.status(500).end();
      })
  },
  updateComment: (req, res) => {
    const db = req.app.get('db');
    const { postId, id } = req.params;
    const { comment } = req.body;

    db.comments
      .update({
        id,
        postId
      },{
        comment
      })
      .then(updatedComment => res.status(201).send(updatedComment))
      .catch(error => {
        console.error(error);
        res.status(500).end();
      })
  }
}