const jwt = require('jsonwebtoken')
require('dotenv').config()

//Gerar token
module.exports = generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.AUTH_JSON, { expiresIn: 80000 })
}
