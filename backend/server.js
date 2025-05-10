const express  = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path:path.join(__dirname,'config','.env')})
const PORT = process.env.PORT || 3000
const register = require('./routes/register')
const connectDB = require('./config/connectDB')
const cors = require('cors')
connectDB()
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use('/api/events',register)
app.listen(PORT, (err) => {
  console.log(`server running successfully ${PORT}`);
  
})