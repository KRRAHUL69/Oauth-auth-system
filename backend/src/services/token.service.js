
const jwt = require("jsonwebtoken");
const uuidv4 = (...args) =>
  import('uuid').then(({ v4 }) => v4(...args));

exports.generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, jti: uuidv4() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};