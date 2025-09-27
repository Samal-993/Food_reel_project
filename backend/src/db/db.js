const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // console.log("DB Connected")
    })
    .catch((err) => {
        // console.log("DB connection error", err)
    })
}

module.exports = connectDB;
 