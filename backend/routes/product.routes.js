import { Router } from "express";
import formidable from "express-formidable";
import { requireSignIn, isAdmin } from "../middlewares/auth.middleware.js";

import {
  // brainTreePaymentController,
  // brainTreeTokenController,
  createProductController,
  deleteProductItemController,
  getAllProductController,
  getProductPhotoController,
  getSingleProductController,
  productCategoryController,
  productCountControllers,
  productFilterControllers,
  productListController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/poduct.controller.js";

const router = Router();

//routes

//create product

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get all product
router.get("/get-all-product", getAllProductController);

//single
router.get("/get-single-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", getProductPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductItemController);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// filter product
router.post("/product-filters", productFilterControllers);

//product count
router.get("/product-count", productCountControllers);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keywords", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

// //payment routes || getting token
// router.get("/braintree/token", brainTreeTokenController);

// //payment
// router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
