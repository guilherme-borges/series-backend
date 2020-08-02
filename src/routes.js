const express = require('express');
const authMiddleware = require('./middlewares/auth');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World' });
});

routes.post('/sessions', SessionController.create);
routes.post('/signup', UserController.create);

routes.use(authMiddleware);
routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

module.exports = routes;