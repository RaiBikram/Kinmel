import User from "../models/user.models.js";
import { comparePassword, hashPassword } from "../utils/auth.utils.js";
import JWT from "jsonwebtoken";

// Register User
export const registerController = async (req, res) => {
  const { username, fullname, email, password, phone, address, answer } =
    req.body;

  try {
    // Input Validation
    if (!fullname) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Username is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }
    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address is required" });
    }
    if (!answer) {
      return res
        .status(400)
        .json({ success: false, message: "Answer is required" });
    }

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [
        { email: email?.toLowerCase() },
        { username: username?.toLowerCase() },
        { phone },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please log in",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      fullname,
      email: email.toLowerCase(),
      phone,
      address,
      password: hashedPassword,
      username: username.toLowerCase(),
      answer,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        phone: newUser.phone,
        address: newUser.address,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

// Login User
export const loginController = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Check for required details
    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: "Please provide email, username, or phone",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    // find user
    const user = await User.findOne({
      $or: [
        { username: identifier?.toLowerCase() },
        { email: identifier?.toLowerCase() },
        { phone: identifier },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = JWT.sign({ _id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

// Forgot Password / Reset Password
export const forgotPasswordController = async (req, res) => {
  const { identifier, answer, newPassword } = req.body;

  try {
    // Validate input
    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: "username, email, or phone is required",
      });
    }
    if (!answer) {
      return res
        .status(400)
        .json({ success: false, message: "Answer is required" });
    }
    if (!newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "New password is required" });
    }

    // Find user with provided identifier and answer
    const user = await User.findOne({
      $or: [
        { username: identifier?.toLowerCase() },
        { email: identifier?.toLowerCase() },
        { phone: identifier },
      ],
      answer: answer?.trim(), // Assuming answer needs to be trimmed
    });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid identifier or answer" });
    }
    // Verify secret answer
    if (user?.answer !== answer) {
      return res.status(400).json({
        success: false,
        message: "Your secret answer does not match",
      });
    }
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validations
      }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//update profile controller
export const updateProfileController = async (req, res) => {
  try {
    const { fullname, password, phone, address } = req.body;
    const user = await User.findById(req?.user?._id);

    // Validate password
    if (password && password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Hash the password if provided
    const hashedPass = password ? await hashPassword(password) : undefined;

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        fullname: fullname || user?.fullname,
        password: hashedPass || user?.password,
        phone: phone || user?.phone,
        address: address || user?.address,
      },
      { new: true }
    );

    // Respond with the updated user details
    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while updating user profile",
      error: error.message,
    });
  }
};
