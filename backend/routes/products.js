const express = require("express");
const router = express.Router();
const {
  newProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/allProducts").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);
router
.route("/product/new")
.post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
.route("/product/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
.route("/product/:id")
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);


router.route("/review").put(isAuthenticatedUser,createProductReview);

module.exports = router;
