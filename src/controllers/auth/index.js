const changePass = require('./forgotPass/changePass')
const forgotPass = require('./forgotPass/forgotPass')
const newPassPage = require('./forgotPass/newPassPage')
const login = require('./login')
const logout = require('./logout')
const logoutFromOthersDevices = require('./logout/logoutFromOthersDevices')
const register = require('./register')

module.exports = {
    changePass,
    forgotPass,
    newPassPage,
    login,
    logout,
    register,
    logoutFromOthersDevices
}