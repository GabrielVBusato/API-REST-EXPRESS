const { configUserToCreate, configUserToLogin, configUserToLogout } = require('./support')
const jwt = require('jsonwebtoken')

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
        //Configurando e verificando usuário para logar
        user = await configUserToLogin(req.body)
        return res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
}

const logout = async (req, res) => {
    const sucess = await configUserToLogout(req.userId)
    res.status(200).send(sucess)
}

module.exports = {
    register,
    login,
    logout
}