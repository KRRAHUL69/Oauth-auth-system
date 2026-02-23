const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.generateTokens = async (user) => {
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
  
    const refreshToken = jwt.sign(
      {
        userId: user._id,
        jti: uuidv4(), 
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
  
    return { accessToken, refreshToken };
};

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("User not found for ID:", decoded.userId);
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};