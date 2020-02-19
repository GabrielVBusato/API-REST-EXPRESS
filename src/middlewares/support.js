const User = require('../models/user')


const tokenIsValid = async (id, token) => {
    const user = await User.findOne({ _id: id })
    return (user.token === token)
}

module.exports = {
    tokenIsValid
}