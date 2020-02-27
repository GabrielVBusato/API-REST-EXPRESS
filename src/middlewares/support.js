const User = require('../models/user')


const tokenIsValid = async (id, token) => {
    const user = await User.findOne({ _id: id })
    if (!user) {
        return false;
    }
    return user.tokens.includes(token)
}

module.exports = {
    tokenIsValid
}