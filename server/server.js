require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())


require('./config/mongoose.config')
require('./routes/item.routes')(app)
require('./routes/user.routes')(app)




const port = process.env.MY_PORT

const server = app.listen(port, ()=>console.log(`Listening on port: ${port}`))