import { Router } from "express";
import { requireSignIn, isAdmin } from "./../middlewares/auth.middleware.js";
import {
  allCategoryController,
  createCategoryController,
  updateCategoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/category.Controllers.js";

const router = Router();

// create Category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// getAll categories
router.get("/all-category", allCategoryController);

//single category
router.get("/single-category/:id", singleCategoryController);


//delete category 
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);





export default router;
