const configUserToForgotPass = require('./configUserToForgotPass')

module.exports = async (req, res) => {
    try {
        await configUserToForgotPass(req.body)
        return res.send('Sucess')
    } catch (err) {
        res.status(400).send(err)
    }

}