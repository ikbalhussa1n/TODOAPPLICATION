import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const generateTokenAndSave = async (userId, res) => {
  // Generate JWT token
  const token = jwt.sign({ id: userId }, process.env.jwtToken, {
    expiresIn: "1h",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};
