
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { generateTokens } = require("../services/token.service");
// const redis = require("../config/redis");


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ msg: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ msg: "Invalid credentials" });

  const { accessToken, refreshToken } = await generateTokens(user);

  // store refresh token in Redis
  // await redis.set(`refresh_${user._id}`, refreshToken);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    })
    .json({ accessToken });
};

exports.getMe = async (req, res) => {
  res.json(req.user);
};

exports.logout = async (req, res) => {
  // const userId = req.user._id;

  // await redis.del(`refresh_${userId}`);

  res.clearCookie("refreshToken");

  res.json({ message: "Logged out successfully" });
};