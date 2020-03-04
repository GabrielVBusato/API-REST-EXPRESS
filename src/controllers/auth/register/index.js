const configUserToCreate = require('./configUserToRegister')

module.exports = async (req, res) => {
    try {
        const body = req.body;
        const user = await configUserToCreate(body)
        res.status(200).send(user)
    } catch (err) {
        if (err.code === 11000) return res.status(400).send('User already exists.')
        return res.status(400).send(err);
    }
}
