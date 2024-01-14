const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const products = require('./routes/products');
const auth = require('./routes/auth');
const order = require('./routes/order');
const errorMiddleware = require('./middlewares/errors')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

dotenv.config({path: 'config/config.env'})

// setting cloudinary config....
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',order);




// middleeare to handle errros
app.use(errorMiddleware);



module.exports = app




