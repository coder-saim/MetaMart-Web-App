const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const products = require('./routes/products');
const auth = require('./routes/auth');
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1',products);
app.use('/api/v1',auth);




// middleeare to handle errros
app.use(errorMiddleware);



module.exports = app




