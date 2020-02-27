const User = require('../../models/user');

const getUserConfig = async (req, res) => {
    var user = await User.findOne({ _id: req.userId })
    const { tokens, _id, __v, blackListedTokens, password, createdAt, userClientConfig, token, ...data } = user._doc;
    res.status(200).send(data)
}


module.exports = {
    getUserConfig
}