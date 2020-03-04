const User = require('../../../models/user');

module.exports = async (req) => {
    const user = await User.findOne({ _id: req.userId })
    user.blackListedTokens.push(req.token)
    user.tokens = user.tokens.filter((x) => x !== req.token)
    await user.save()
    return { Success: 'User logged out.' }
}