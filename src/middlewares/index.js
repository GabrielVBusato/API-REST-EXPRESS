const authMiddleware = require('./authMiddleware')
const authMiddlewareLogin = require('./authMiddlewareLogin')
const confirmPassMiddleware = require('./confirmPassMiddleware')

module.exports = {
    authMiddleware,
    authMiddlewareLogin,
    confirmPassMiddleware
}