export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const isProd = process.env.NODE_ENV === "production";
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
