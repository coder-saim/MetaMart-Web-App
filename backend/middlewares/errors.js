const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        success: false,
        error: err,
        errMessage: err.message,
        stack: err.stack
    })
    
    // if (process.env.NODE_ENV === 'DEVELOPMENT') {
    //     res.status(err.statusCode).json({
    //         success: false,
    //         error: err,
    //         errMessage: err.message,
    //         stack: err.stack
    //     })
    // } 

    // if (process.env.NODE_ENV === 'PRODUCTION'){
    //     console.log(process.env.NODE_ENV)
    //     let error = {...err};
    //     error.message = err.message;

    //     res.status(error.statusCode).json({
    //         success: false,
    //         message: error.message || 'Internal Server Error'
    //     })
    // }
}