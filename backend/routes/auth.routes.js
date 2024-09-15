import { Router } from "express";
const router = Router();
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController
} from "../controllers/auth.Controllers.js";

import { isAdmin } from "../middlewares/auth.middleware.js";
import { requireSignIn } from "../middlewares/auth.middleware.js";

//register
router.post("/register", registerController);
// login
router.post("/login", loginController);

//forgot pasword
router.post("/forgot-password", forgotPasswordController);

//protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

//protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

//update profile
router.put("/profile-update", requireSignIn, updateProfileController);

export default router;
