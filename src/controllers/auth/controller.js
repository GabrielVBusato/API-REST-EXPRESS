const { configUserToCreate, configUserToLogin, configUserToLogout } = require('./support')
const crypto = require('crypto')
const User = require('../../models/user');
const mailer = require('../../modules/mail/mailer')
const path = require('path')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    try {
        const body = req.body;
        const user = await configUserToCreate(body)
        res.status(200).send(user)
    } catch (err) {
        if (err.code === 11000) return res.status(400).send('User already exists.')
        return res.status(400).send(err);
    }
}

const login = async (req, res) => {
    try {
        //Configurando e verificando usuário para logar
        user = await configUserToLogin(req.body)
        return res.send(user)
    } catch (err) {
        res.status(401).send(err)
    }
}

const logout = async (req, res) => {
    const sucess = await configUserToLogout(req)
    res.status(200).send(sucess)
}


const forgotPassEmail = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return send.status(400).send({ error: 'User not found' })
        }

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date();
        now.setHours(now.getHours() + 1)

        user.passwordResetToken = token
        user.passwordResetTokenExpires = now
        await user.save()

        await mailer.sendMail({
            from: 'diego@rocketseat.com.br',
            to: email,
            template: 'forgotPass',
            context: { token, name: user.name },

        })

        return res.send('Sucess')

    } catch (err) {
        res.status(400).send({ err: 'Error on forgot password, please try again.' })
    }

}

const changePassPage = (req, res) => {
    return res.sendFile(path.resolve('./public/pages/auth/changePassword.html')) 
}

const changePass = async (req, res) => {
    const user = await User.findOne({ passwordResetToken: req.body.token })
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    user.password = req.body.pass
    user.save()
    res.send('safe')
}

const sucess = (req, res) => {
    res.sendFile(path.resolve('./public/pages/sucess.html'))
}

module.exports = {
    register,
    login,
    logout,
    forgotPassEmail,
    changePassPage,
    changePass,
    sucess
}