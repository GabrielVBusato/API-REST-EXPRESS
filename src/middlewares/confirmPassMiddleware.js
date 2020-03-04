const User = require('../models/user')
const path = require('path')

const confirmPassMiddleware = async (req, res, next) => {
    const method = req.method

    if (method === "GET") {
        if (!req.query.token) {
            return res.sendFile(path.resolve('./public/pages/auth/error.html'))
        }

        const user = await User.findOne({
            passwordResetToken: req.query.token,
            passwordResetTokenExpires: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return res.sendFile(path.resolve('./public/pages/auth/error.html'))
        }
        next()

    } else if (method === "POST") {
        if (!req.body.token) {
            return res.status(401).json({ "error": "Not Authorized" })
        }

        const user = await User.findOne({
            passwordResetToken: req.body.token,
            passwordResetTokenExpires: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return res.status(401).json({ "error": "Not Authorized" })
        }
        next()
    }

}

module.exports = confirmPassMiddleware