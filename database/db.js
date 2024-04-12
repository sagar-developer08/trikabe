const mongoose = require("mongoose")

mongoose.set('strictQuery', false)
mongoose.connect(process.env.mongodburl).then(() => {
    
    console.log("database connection is established")
}).catch((err) => {
    console.log("error while connecting in database" , err)
})