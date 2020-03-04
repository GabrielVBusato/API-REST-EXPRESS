const path = require('path')

module.exports = (req, res) => {
    return res.sendFile(path.resolve('./public/pages/auth/changePassword.html'))
}