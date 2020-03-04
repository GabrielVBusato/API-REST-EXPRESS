const bcrypt = require('bcryptjs')
const generateToken = require('../supportFunctions/generateToken')
const User = require('../../../models/user');

module.exports = async (body) => {
    body.password = await bcrypt.hash(body.password, 10)
    var user = await User.create(body);
    const token = generateToken(user.id)
    user.tokens.push(token)
    await user.save()
    const { _id, __v, tokens, blackListedTokens, userClientConfig, password, createdAt, ...data } = user._doc;
    return { ...data, token }
}
