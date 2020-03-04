const configUserToLogout = require('./configUserToLogout')

module.exports = async (req, res) => {
    const sucess = await configUserToLogout(req)
    res.status(200).send(sucess)
}