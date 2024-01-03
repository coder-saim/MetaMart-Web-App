const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require('../utils/jwtToken');

exports.registerUser = catchAsyncError(async(req,res,next) => {
    const {name,email,password} = req.body;
    let random_id = Math.floor((Math.random() * 10000) + 1);
    
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: random_id,
            url: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww'

        }
    })

    sendToken(user,201,res);
})



exports.loginUser = catchAsyncError(async(req,res,next) => {
    const {email,password} = req.body;
    
    if(!email && !password){
        return next(new ErrorHandler('Please Enter email and password!',400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user,200,res);
})




exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})
