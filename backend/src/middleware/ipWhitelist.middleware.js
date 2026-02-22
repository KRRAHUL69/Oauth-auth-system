const whitelist = process.env.IP_WHITELIST.split(",");

module.exports = (req, res, next) => {
  const ip = req.ip;

  if (!whitelist.includes(ip)) {
    return res.status(403).json({ message: "IP not allowed" });
  }

  next();
};