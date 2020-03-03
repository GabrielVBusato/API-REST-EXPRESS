const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
require('dotenv').config()
const path = require('path')

const MAIL_CONFIG = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
    }
}

var transport = nodemailer.createTransport(
    MAIL_CONFIG
);

const viewPath = path.resolve('./src/modules/mail/templates/')
transport.use('compile', hbs({
    viewEngine: {
        extname: '.html',
        layoutsDir: viewPath,
        defaultLayout: undefined,
        partialsDir: viewPath
    },
    viewPath: viewPath,
    extName: '.html',
}))

module.exports = transport