require('dotenv').config()
const jwt = require('jsonwebtoken')
const { AUTH_JSON } = process.env
const { tokenIsValid } = require('./support')

const authMiddleware = async (req, res, next) => {
    const token = req.headers['auth']

    if (!token) {
        return res.status(400).send({ error: 'No token provided' })
    }

    await jwt.verify(token, AUTH_JSON, async function (err, decoded) {
        if (err || !(await tokenIsValid(decoded.id, token))) {
            return res.status(401).send({ err: err ? err.message : 'Invalid token' })
        }
        req.userId = decoded.id;
        req.token = token
        return next();

    })
}

module.exports = authMiddleware