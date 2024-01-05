const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const products = require('./routes/products');
const auth = require('./routes/auth');
const order = require('./routes/order');
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser());


app.use('/api/v1',products);
app.use('/api/v1',auth);
app.use('/api/v1',order);




// middleeare to handle errros
app.use(errorMiddleware);



module.exports = app




