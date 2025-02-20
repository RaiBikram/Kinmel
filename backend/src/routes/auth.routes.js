import { Router } from "express";
const authRoutes = Router();
import {
  forgotPasswordController,
  loginController,
  registerController,
  updateProfileController,
} from "../controllers/auth.Controllers.js";
import { isAdmin, requireSignIn } from "../middlewares/auth.middleware.js";

//register
authRoutes.post("/register", registerController);
// login
authRoutes.post("/login", loginController);

//forgot pasword
authRoutes.post("/forgot-password", forgotPasswordController);

//protected user route
authRoutes.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

//protected admin route
authRoutes.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

//update profile
authRoutes.put("/profile-update", requireSignIn, updateProfileController);

export default authRoutes;
