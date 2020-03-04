const crypto = require('crypto')
const User = require('../../../models/user');
const mailer = require('../../../modules/mail/mailer')

module.exports = async (body) => {
    const user = await User.findOne({ "email" : body.email })

    if (!user) {
        throw { "err": 'User not found' }
    }

    const token = crypto.randomBytes(20).toString('hex')

    const now = new Date();
    now.setHours(now.getHours() + 1)

    user.passwordResetToken = token
    user.passwordResetTokenExpires = now
    await user.save()

    await mailer.sendMail({
        from: 'mailtest.com.br',
        to: body.email,
        template: 'forgotPass',
        context: { token, name: user.name },

    })

}