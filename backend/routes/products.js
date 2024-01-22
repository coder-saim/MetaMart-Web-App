const express = require("express");
const router = express.Router();
const {
  newProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminAllProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/allProducts").get(getAllProducts);
router.route("/admin/products").get(getAdminAllProducts);

router.route("/admin/product/:id").get(getSingleProduct);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
