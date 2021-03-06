const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tokens: {
        type: [String],
    },
    blackListedTokens: {
        type: [String]
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetTokenExpires: {
        type: Date,
        select: false
    }
})

UserSchema.methods.verifyPassword = async function (pass) {
    const auth = await bcrypt.compare(pass, this.password)
    return auth;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;