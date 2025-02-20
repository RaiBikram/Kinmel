import { Router } from "express";
import { requireSignIn, isAdmin } from "./../middlewares/auth.middleware.js";
import {

  createCategoryController,
  updateCategoryController,
  singleCategoryController,
  deleteCategoryController,
  allCategoryController,
} from "../controllers/category.Controllers.js";

const categoryRoutes = Router();

// create Category
categoryRoutes.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update Category
categoryRoutes.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// getAll categories
categoryRoutes.get("/all-category", allCategoryController);

//single category
categoryRoutes.get("/single-category/:id", singleCategoryController);

//delete category
categoryRoutes.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default categoryRoutes;
