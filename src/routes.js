const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World' });
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

module.exports = routes;