const configUserToLogin = require('./configUserToLogin')

module.exports = login = async (req, res) => {
    try {
        user = await configUserToLogin(req.body)
        return res.send(user)
    } catch (err) {
        res.status(401).send(err)
    }
}
