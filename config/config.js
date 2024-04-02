// const dotenv = require("dotenv")
// const path = require("path")




// process.env.NODE_ENV = "test"

// const data = dotenv.config({ path: path.join(__dirname, `../environment/.${process.env.NODE_ENV}.env`) })
// console.log(process.env.EMAIL,process.env.PASSWORD)
module.exports = {
    PORT: process.env.PORT,
    mongodburl: process.env.mongodburl,
    version: process.env.version,
    JWT: process.env.JWt,
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    EMAIL:process.env.EMAIL,
    PASSWORD:process.env.PASSWORD
}

// console.log(data)

