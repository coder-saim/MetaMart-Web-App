const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require('../utils/apiFeatures')

exports.newProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    const perPage = 3;
    const productCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
                                            .search()
                                            .filter()
                                            .pagination(perPage)

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    message: "All Products",
    products,
    productCount
  });
});

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // if(!product) {
  //     return res.status(404).json({
  //         success: false,
  //         message: 'Product not found!',

  //     })
  // }

  // middleware used....
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found!",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Product updated.",
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found!",
    });
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product deleted.",
  });
});



exports.createProductReview = catchAsyncError(async (req, res, next) => {

  const { rating, comment, productId } = req.body;

  const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
  }

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
  )

  if (isReviewed) {
      product.reviews.forEach(review => {
          if (review.user.toString() === req.user._id.toString()) {
              review.comment = comment;
              review.rating = rating;
          }
      })

  } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
      success: true,
      review
  })

})