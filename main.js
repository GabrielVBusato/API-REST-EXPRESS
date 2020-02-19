//Dotenv
require('dotenv').config()

const { PORT } = process.env

const { authMiddleware } = require('./src/middlewares')


//Server
const app = require('./src/server')

//Auth routes - login/register
require('./src/server/routes/authRoutes')(app)

//User routes 
require('./src/server/routes/userRoutes')(app)

app.listen(PORT, console.log(`Listening on port ${PORT}`))