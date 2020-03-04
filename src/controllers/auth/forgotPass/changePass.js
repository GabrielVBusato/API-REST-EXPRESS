const User = require('../../../models/user')

module.exports = async (req, res) => {
    const user = await User.findOne({ passwordResetToken: req.body.token })
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    user.password = req.body.pass
    user.tokens = []
    user.blackListedTokens = []
    await user.save()
    res.status(200).json({ "sucess": "Authorized" })
}