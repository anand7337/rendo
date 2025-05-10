const mongoose = require('mongoose')

  
const connectDB = async () => {
  await mongoose.connect(process.env.CONNECTIONDB)
  .then((con) => {
    console.log(`connectedDB ${con.connection.host}`);
    
  })
}

module.exports = connectDB