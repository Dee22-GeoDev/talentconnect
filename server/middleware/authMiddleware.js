const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // Check for Authorization header
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization token missing or malformed" });
    }

    // Extract token
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "changeme");

    // Fetch user & exclude passwordHash
    const user = await User.findById(decoded.userId).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
