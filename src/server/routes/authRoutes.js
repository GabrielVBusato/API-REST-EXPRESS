const express = require('express');

const routes = express.Router();

const auth = require('../../controllers/auth')
const { authMiddleware, authMiddlewareLogin, confirmPassMiddleware } = require('../../middlewares/')

routes.post('/register/', auth.register)

routes.post('/login/', authMiddlewareLogin, auth.login)

routes.delete('/logout/', authMiddleware, auth.logout)

//Post para enviar e-mail de alteração de senha
routes.post('/forgotPass/', auth.forgotPass)

//Get para renderizar página html para alteração de senha
routes.get('/confirm/', confirmPassMiddleware, auth.newPassPage)

//Post para confirmar alteração da senha
routes.post('/changePass/', confirmPassMiddleware, auth.changePass)

routes.get('/clearSessions', authMiddleware, auth.logoutFromOthersDevices)

module.exports = app => app.use('/auth', routes);

