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

const productRouter = Router();

//routes

//create product

productRouter.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get all product
productRouter.get("/get-all-product", getAllProductController);

//single
productRouter.get("/get-single-product/:slug", getSingleProductController);

//get photo
productRouter.get("/product-photo/:pid", getProductPhotoController);

// delete product
productRouter.delete("/delete-product/:pid", deleteProductItemController);

// update product
productRouter.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// filter product
productRouter.post("/product-filters", productFilterControllers);

//product count
productRouter.get("/product-count", productCountControllers);

//product per page
productRouter.get("/product-list/:page", productListController);

//search product
productRouter.get("/search/:keywords", searchProductController);

//similar product
productRouter.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
productRouter.get("/product-category/:slug", productCategoryController);

// //payment routes || getting token
// productRouter.get("/braintree/token", brainTreeTokenController);

// //payment
// productRouter.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default productRouter;
