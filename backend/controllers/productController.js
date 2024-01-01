const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');


exports.newProduct = async (req,res, next) =>{

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product
    })
}

 

 exports.getAllProducts = async (req, res, next) => {

    const products = await Product.find();
    res.status(200).json({
        success: true,
        message: 'All Products',
        products
    })
 }


 exports.getSingleProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    // if(!product) {
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Product not found!',
            
    //     }) 
    // }
    
    // middleware used....
    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }    

    res.status(200).json({
        success: true,
        product 
    })
 }


 exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found!',
            
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    res.status(200).json({
        success: true,
        message: 'Product updated.',
        product
    })
 }



 exports.deleteProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found!',
            
        })
    }

    await Product.findByIdAndDelete(req.params.id);
     


    res.status(200).json({
        success: true,
        message: 'Product deleted.',
    })
 }