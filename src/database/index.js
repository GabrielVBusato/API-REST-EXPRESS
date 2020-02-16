const mongoose = require('mongoose');

require('dotenv').config()

const { CONNECTION_STRING } = process.env;

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;

module.exports =  mongoose;
