const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorisedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorisedRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorisedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorisedRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
module.exports = router;
