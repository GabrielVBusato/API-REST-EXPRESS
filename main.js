const express = require('express');
const app = express();
require('dotenv').config()
var cors = require('cors')
const { PORT } = process.env
const path = require('path')

app.use(express.json());
app.use(cors())
app.use('/auth/', express.static(path.resolve(__dirname, 'public/pages/auth')))


//Auth routes - login/register
require('./src/server/routes/authRoutes')(app)

//User routes 
require('./src/server/routes/userRoutes')(app)

app.listen(PORT, console.log(`Listening on port ${PORT}`))