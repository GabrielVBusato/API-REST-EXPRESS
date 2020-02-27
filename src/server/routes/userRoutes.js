const express = require('express');
const { authMiddleware } = require('../../middlewares')
const routes = express.Router();
const userController = require('../../controllers/user/controller')

routes.use('/', authMiddleware)

routes.get('/getUserConfig', userController.getUserConfig)

module.exports = app => app.use('/user', routes);
