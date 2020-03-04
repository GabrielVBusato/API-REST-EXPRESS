const User = require('../../../models/user');

module.exports = async (req, res) => {
    const user = await User.findOne({ "_id" : req.userId })

    if (!user){
        return res.status(401).send({"Error" : "User not found"})
    }

    user.tokens = []
    user.tokens.push(req.token)
    user.blackListedTokens = []
    await user.save()
    return res.send({"Sucess" : "Logged out from others devices"})
}