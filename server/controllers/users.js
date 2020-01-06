module.exports = {
  signup: (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;

    db.users
      .insert({
        email, 
        password, 
        user_profiles: [{
          userId: undefined,
          about: null,
          thumbnail: null
        }]
      }, {
        deepInsert: true,
      })
      .then( user => res.status(201).send(user))
      .catch( error => {
        console.error(error);
        res.status(500).end();
      })
  },
  userList: (req, res) => {
    const db = req.app.get('db'); 

    db.users
      .find()
      .then(users => res.status(200).send(users))
      .catch(error => {
        console.error(error);
        res.status(500).end();
      })
  },
  getUserById: (req, res) => {
    const db = req.app.get('db');

    db.users
      .findOne(req.params.id)
      .then(user => res.status(200).json(user))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  getUserProfile: (req, res) => {
    const db = req.app.get('db');
    
    db.user_profiles
      .findOne({
        userId: req.params.id,
      })
      .then(profile => res.status(200).json(profile))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
}