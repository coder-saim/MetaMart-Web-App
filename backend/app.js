const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const products = require('./routes/products');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment')
const errorMiddleware = require('./middlewares/errors')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload')


dotenv.config({ path: "config/config.env" });  


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
 

// setting cloudinary config....
cloudinary.config({ 
    cloud_name: 'dfkgmf0jy', 
    api_key: '443437824539296', 
    api_secret: 'fx-x7hm9f-0n6U3PN6_AEZd5MFw',
    secure: true 
  }); 


app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',order);
app.use('/api/v1',payment);




// middleeare to handle errros
app.use(errorMiddleware);



module.exports = app




