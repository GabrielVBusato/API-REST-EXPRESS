const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/user');
require('dotenv').config()

//Gerar token
const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.AUTH_JSON, { expiresIn: 80000 })
}

//Configurar usuário para criação
const configUserToCreate = async (body) => {
    body.password = await bcrypt.hash(body.password, 10)
    var user = await User.create(body);
    const token = generateToken(user.id)
    user.tokens.push(token)
    await user.save()
    const { _id, __v, tokens, blackListedTokens, userClientConfig, password, createdAt, ...data } = user._doc;
    return { ...data, token }
}

//Autenticar usuário para login
const verifyUser = async (body) => {
    const { email, password } = body
    var user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw { "err": 'User not found' }
    }

    if (!(await user.verifyPassword(password))) {
        throw { "err": 'Incorrect password' }
    }
    return user
}

//Configurar usuário para logar
const configUserToLogin = async (body) => {
    const user = await verifyUser(body)
    const token = generateToken(user.id)
    user.tokens.push(token)
    await user.save();
    const { _id, __v, tokens, blackListedTokens, userClientConfig, password, createdAt, ...data } = user._doc;
    return { ...data, token }
}


//Configurar usuário para deslogar
const configUserToLogout = async (req) => {
    const user = await User.findOne({ _id: req.userId })
    user.blackListedTokens.push(req.token)
    user.tokens = user.tokens.filter((x) => x !== req.token)
    user.save()
    return { msg: 'User logged out.' }
}

//Configurar usuário para recuperar senha



module.exports = {
    generateToken,
    configUserToCreate,
    verifyUser,
    configUserToLogin,
    configUserToLogout
}