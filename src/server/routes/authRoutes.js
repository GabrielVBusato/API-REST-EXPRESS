const express = require('express');

const routes = express.Router();

const auth = require('../../controllers/auth/controller')
const authMiddleware = require('../../middlewares/auth')

routes.post('/register', auth.register)

routes.post('/login', auth.login)

routes.delete('/logout', authMiddleware, auth.logout)

module.exports = app => app.use('/auth', routes);

