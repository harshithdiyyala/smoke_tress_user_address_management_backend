const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { body } = require("express-validator")
const validate = require("../middlewares/validate")
const { protect } = require("../middlewares/authMiddleware")

// Validation rules for addresses
const addressValidationRules = [
  body("addresses").isArray({ min: 1 }).withMessage("At least one address is required"),
  body("addresses.*.street").notEmpty().withMessage("Street is required"),
  body("addresses.*.city").notEmpty().withMessage("City is required"),
  body("addresses.*.state").notEmpty().withMessage("State is required"),
  body("addresses.*.zipCode")
    .notEmpty()
    .withMessage("Zip Code is required")
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage("Invalid Zip Code"),
  body("addresses.*.country").notEmpty().withMessage("Country is required"),
]

// Routes
router.post("/addresses", protect, validate(addressValidationRules), userController.registerUserAddress)

module.exports = router
