

const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config()

const URL = process.env.URL

// const mongooseconnect = mongoose.connect(URL).then(()=>{
//     console.log("DataBase is connected")
// })

const connectdb = async()=>{
    try {
       const connected= await mongoose.connect(URL)
        if (connected) {
            console.log("Database is connected")
        }
    } catch (error) {
        console.log('Database not connected')
    }
}

module.exports = connectdb