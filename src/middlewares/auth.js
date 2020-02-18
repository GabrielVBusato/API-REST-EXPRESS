require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const { AUTH_JSON } = process.env

const tokenIsValid = async (id, token) => {
    const user = await User.findOne({ _id: id })
    return (user.token === token)
}

module.exports = async (req, res, next) => {
    const token = req.headers['auth']

    if (!token) {
        return res.status(400).send({ error: 'No token provided' })
    }

    await jwt.verify(token, AUTH_JSON, async function (err, decoded) {
        if (err) return res.status(500).send({ err: err.message })
        if ((await tokenIsValid(decoded.id, token))) {
            req.userId = decoded.id;
            return next();
        }
        res.status(500).send({ err: 'Expired Token' })
    })
}