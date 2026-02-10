import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form !"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered !"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(user, 201, res, "User Registered Sucessfully !");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role !"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password !", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found !`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In Sucessfully !");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully !",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("Please provide all password fields.", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match.", 400));
  }
  const user = await User.findById(req.user._id).select("+password");
  const isMatched = await user.comparePassword(currentPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Current password is incorrect.", 400));
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});
