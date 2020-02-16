const User = require('../../models/user');
require('dotenv').config()
const { configUserToCreate, verifyUser, configUserToLogin } = require('./support')


const register = async (req, res) => {
    try {
        const body = req.body;
        const user = await configUserToCreate(body)
        res.status(200).send(user)
    } catch (err) {
        if (err.code === 11000) return res.status(400).send('User already exists.')
        return res.status(400).send(err);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        var user = await User.findOne({ email }).select('+password');

        await verifyUser(user, password)

        //Configurando usuário para logar
        user = await configUserToLogin(user)
        res.send({ user })

    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    register,
    login
}