const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.protect = async (req, res, next) => {
  let token

  // Check if authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, token missing" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId).select("-password")
    next()
  } catch (error) {
    res.status(401).json({ error: "Not authorized, token invalid" })
  }
}
