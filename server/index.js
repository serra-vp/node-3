const express = require('express');
const massive = require('massive');

const users = require('./controllers/users');

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
    app.post('/api/users', users.signup);
    app.get('/api/users', users.userList);
    app.get('/api/users/:id', users.getUserById);
    app.get('/api/users/:id/profile', users.getUserProfile);

    const PORT = 3002;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
});