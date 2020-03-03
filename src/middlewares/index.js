const authMiddleware = require('./authMiddleware')
const authMiddlewareLogin = require('./authMiddlewareLogin')
const changePassMiddleware = require('./changePassMiddleware')

module.exports = {
    authMiddleware,
    authMiddlewareLogin,
    changePassMiddleware
}