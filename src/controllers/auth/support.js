const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/user');

const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.AUTH_JSON, { expiresIn: 86400 })
}

const configUserToCreate = async (body) => {
    body.password = await bcrypt.hash(body.password, 10)
    const user = await User.create(body);
    user.token.push({ hash: generateToken(user.id), isValid: true })
    await user.save()
    user.password = undefined;
    return user;
}

const verifyUser = async (user, password) => {
    if (!user) {
        throw { "err": 'User not found' }
    }

    if (!(await user.verifyPassword(password))) {
        throw { "err": 'Incorrect password' }
    }

}

const configUserToLogin = async (user) => {
    if (user.token.length >= 1) {
        user.token[user.token.length - 1].isValid = false
    }

    const token = {
        hash: generateToken(user.id),
        isValid: true
    };

    //Adicionando token
    user.token.push(token);
    await user.save();
    user.password = undefined;
    return user;
}

module.exports = {
    generateToken,
    configUserToCreate,
    verifyUser,
    configUserToLogin
}