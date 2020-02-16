const express = require('express');

const routes = express.Router();

const auth = require('../../controllers/auth/controller')

routes.post('/register', auth.register)

routes.post('/login', auth.login)

module.exports = app => app.use('/auth', routes);

