const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const rateLimit = require("express-rate-limit")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const addressRoutes = require("./routes/addressRoutes")
const errorHandler = require("./middlewares/errorHandler")
require("dotenv").config()

const app = express()

// Security Middlewares
app.use(helmet())
app.use(mongoSanitize())

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Middleware
app.use(bodyParser.json())

// Routes
app.use("/api", authRoutes) // Authentication routes
app.use("/api", userRoutes) // User routes (protected)
app.use("/api", addressRoutes) // Address routes (protected)

// Error Handling Middleware
app.use(errorHandler)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "user_address",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))

// Start the Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
