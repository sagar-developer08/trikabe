const express = require('express');
const cors = require('cors');
const config = require('./config/config')
// require("dotenv").config();

const app = express()

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


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


app.get('/', (req, res) => {
    return res.status(200).json({
        message: "server responding "
    })
})


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

app.use('/api',userRoutes);
app.use('/api',carousel);
app.use('/api',motivationRoutes); 
app.use('/api',serviceRoutes);  
app.use('/api',AboutRoutes)
app.use('/api',AboutRoute)
app.use('/api',testimonal)
app.use('/api',contact)
app.use('/api',blogRoutes)




// schemaName.index({ request: 'text' });  

const port = config.PORT || 3000;

console.log(config)

app.listen(port, () => {
    console.table([
        {
            port: `${port}`
        }
    ])
})