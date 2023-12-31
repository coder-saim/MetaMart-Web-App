const express = require('express');
const router = express.Router();
const { newProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct } = require('../controllers/productController')


router.route('/product/new').post(newProduct);
router.route('/allProducts').get(getAllProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);

module.exports = router;


 










