const User = require('../../models/user');

const themes = require('./themes')

const modifyUserClientConfig = async (req, res) => {
    var user = await User.findOne({ _id: req.userId })
    user.userClientConfig = req.body
    user.save()
    res.status(200).send({ userConfig: user.userClientConfig, themes: themes })
}

const getUserClientConfig = async (req, res) => {
    var user = await User.findOne({ _id: req.userId })
    res.status(200).send({ userConfig: user.userClientConfig, themes: themes })
}

const getUserConfig = async (req, res) => {
    var user = await User.findOne({ _id: req.userId })
    const { _id, __v, blackListedTokens, password, createdAt, userClientConfig, token, ...data } = user._doc;
    res.status(200).send(data)
}


module.exports = {
    modifyUserClientConfig,
    getUserClientConfig,
    getUserConfig
}