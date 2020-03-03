const User = require('../models/user')
const path = require('path')

const changePassMiddleware = async (req, res, next) => {
    if (!req.query.token) {
        return res.sendFile(path.resolve('./public/pages/error.html'))
    }

    const user = await User.findOne({
        passwordResetToken: req.query.token,
        passwordResetTokenExpires: {
            $gt: Date.now()
        }
    })
    if (!user) {
        return res.sendFile(path.resolve('./public/pages/error.html'))
    }

    next()

}

module.exports = changePassMiddleware