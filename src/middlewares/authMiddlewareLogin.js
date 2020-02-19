require('dotenv').config()
const jwt = require('jsonwebtoken')
const { tokenIsValid } = require('./support')

const { AUTH_JSON } = process.env
const authMiddlewareLogin = async (req, res, next) => {
    const token = req.headers['auth']
    if (!token) {
        return next()
    }
    await jwt.verify(token, AUTH_JSON, async function (err, decoded) {
        if (err || !(await tokenIsValid(decoded.id, token))) {
            return res.status(500).send({ err: err ? err.message : 'Invalid token' })
        }
        return res.status(200).send({ sucess: 'User authorized' })
    })
}

module.exports = authMiddlewareLogin

