const express = require('express');
const router = express.Router();
const { newProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct } = require('../controllers/productController')
const {isAuthenticatedUser} = require('../middlewares/auth');

router.route('/allProducts').get(getAllProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/new').post(isAuthenticatedUser,newProduct);
router.route('/product/:id').put(isAuthenticatedUser,updateProduct);
router.route('/product/:id').delete(isAuthenticatedUser,deleteProduct);

module.exports = router;


 










