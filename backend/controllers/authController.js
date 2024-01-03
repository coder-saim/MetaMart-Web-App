const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");


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

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        user,
        token
    })
})
