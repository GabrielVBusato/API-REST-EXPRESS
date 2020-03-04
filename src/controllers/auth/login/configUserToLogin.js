const generateToken = require('../supportFunctions/generateToken')
const User = require('../../../models/user');

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
module.exports = async (body) => {
    const user = await verifyUser(body)
    const token = generateToken(user.id)
    user.tokens.push(token)
    await user.save();
    const { _id, __v, tokens, blackListedTokens, userClientConfig, password, createdAt, ...data } = user._doc;
    return { ...data, token }
}
