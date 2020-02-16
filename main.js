//Dotenv
require('dotenv').config()

const { PORT } = process.env

const authMiddleware = require('./src/middlewares/auth')

//Server
const app = require('./src/server')

//Auth routes - login/register
require('./src/server/routes/authRoutes')(app)

app.use('/test', authMiddleware, (req, res) => {
    res.send(req.userId)
} )

app.listen(PORT, console.log(`Listening on port ${PORT}`))