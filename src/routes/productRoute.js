const express = require("express");
const routes = express.Router();
const productController = require("../controllers/productController");
const { uploadProductImage } = require("../middlewares/profileUploads");
const passport = require("passport");
const checkRole = require("../middlewares/checkRole");

routes.post(
  "/createProduct",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "seller"]),
  uploadProductImage,
  productController.createProduct
);
routes.get(
  "/getProducts",
  passport.authenticate("jwt", { session: false }),
  productController.getProducts
);
routes.delete(
  "/deleteProduct/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "seller"]),
  productController.deleteProduct
);
routes.get(
  "/getSingleProduct/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "seller"]),
  productController.getSingleProduct
);
routes.put(
  "/updateProduct/:id",
  passport.authenticate("jwt", { session: false }),
  checkRole(["admin", "seller"]),
  uploadProductImage,
  productController.updateProduct
);

module.exports = routes;
