const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { body } = require("express-validator")
const validate = require("../middlewares/validate")

// Validation rules
const registerValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("username").notEmpty().withMessage("Username is required").isAlphanumeric().withMessage("Username must be alphanumeric"),
  body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]

const loginValidationRules = [body("username").notEmpty().withMessage("Username is required"), body("password").notEmpty().withMessage("Password is required")]

// Routes
router.post("/register", validate(registerValidationRules), authController.register)
router.post("/login", validate(loginValidationRules), authController.login)

module.exports = router
