const express = require('express');

const routes = express.Router();

const auth = require('../../controllers/auth/controller')
const { authMiddleware, authMiddlewareLogin, changePassMiddleware } = require('../../middlewares/')

routes.post('/register/', auth.register)

routes.post('/login/', authMiddlewareLogin, auth.login)

routes.delete('/logout/', authMiddleware, auth.logout)

routes.post('/forgotPassEmail/', auth.forgotPassEmail)

routes.get('/changePassPage/', changePassMiddleware, auth.changePassPage)

routes.post('/changePass/', auth.changePass)

routes.get('/sucess/', auth.sucess)

module.exports = app => app.use('/auth', routes);

