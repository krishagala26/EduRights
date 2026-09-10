import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protects routes: verifies the JWT sent in the Authorization header
// and attaches the logged-in user to req.user
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-passwordHash");
      return next();
    } catch (err) {
      res.status(401);
      return next(new Error("Not authorized, token invalid"));
    }
  }

  res.status(401);
  next(new Error("Not authorized, no token"));
};
