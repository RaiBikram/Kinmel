import JWT from "jsonwebtoken";
import User from "../models/user.models.js";


//is signIn
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization;
    if (!token) {
      return res.status(401).json(
        { message: "Authorization token required !!!" }
      );
    }


    // decoded
    const decoded =JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res
    .status(401)
    .json({ message: "Invalid or expired token !!!" });
  }
};


// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id);
    if (user?.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access !!!",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware !!!",
    });
  }
};
