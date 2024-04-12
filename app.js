const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const config = require('./config/config')
// const config = require('C:/Users/Shubham Bhole/Desktop/Github/Trika/trikabe/config/config.js')
require("dotenv").config();

console.log(process.env.mongodburl)
const app = express()

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

console.log()
// 
// database connection
require('./database/db')
// 

app.use((err, req, res, next) => {

    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});


app.get('/', async (req, res) => {
    try {
        // Get the current root directory
        const rootDirectory = path.resolve(__dirname);
        console.log(rootDirectory);
        // Read the contents of the root directory
        const contents = await fs.readdir(rootDirectory);

        // Filter out only the folders
        const folders = await Promise.all(contents.map(async item => {
            const itemPath = path.join(rootDirectory, item);
            const stats = await fs.stat(itemPath);
            return stats.isDirectory() ? item : null;
        }));

        // Filter out null values and join folder names with commas
        const folderNames = folders.filter(Boolean).join(',');

        // Send the folder names as a response
        res.send([folderNames,rootDirectory]);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).send('Internal Server Error');
        console.error(error);
    }
});

// 
const userRoutes = require('./routes/userRoutes');

const carousel = require('./routes/carouselRoutes');

const motivationRoutes = require('./routes/motivatioRoutes');

const serviceRoutes = require('./routes/serviceRoutes');

const AboutRoutes = require('./routes/bannerRoutes')

const AboutRoute = require('./routes/aboutRoutes')

const testimonal = require('./controller/aboutcontroller/testimonialController')

const contact = require('./routes/contactRoutes')

const blogRoutes = require('./routes/blogRoutes');

const yogaService = require('./routes/servicesRoutes')

app.use('/api',userRoutes);
app.use('/api',carousel);
app.use('/api',motivationRoutes); 
app.use('/api',serviceRoutes);  
app.use('/api',AboutRoutes)
app.use('/api',AboutRoute)
app.use('/api',testimonal)
app.use('/api',contact)
app.use('/api',blogRoutes)
app.use('/api',yogaService)




// schemaName.index({ request: 'text' });  

const port = process.env.PORT||8000

app.listen(port, () => {
    console.table([
        {
            port: `${port}`
        }
    ])
})


// ---------
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app)

module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
// ----------
