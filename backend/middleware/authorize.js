import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.jwtToken);

    const uniqueUser = await User.findById(decoded.id).select("-password");

    if (!uniqueUser) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = uniqueUser; // attach user to request
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};
