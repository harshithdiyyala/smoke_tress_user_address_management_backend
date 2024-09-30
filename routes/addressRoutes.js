const express = require("express")
const router = express.Router()
const addressController = require("../controllers/addressController")
const { protect } = require("../middlewares/authMiddleware")
const { body } = require("express-validator")
const validate = require("../middlewares/validate")

// Validation rules for updating address
const updateAddressValidationRules = [
  body("street").optional().notEmpty().withMessage("Street cannot be empty"),
  body("city").optional().notEmpty().withMessage("City cannot be empty"),
  body("state").optional().notEmpty().withMessage("State cannot be empty"),
  body("zipCode")
    .optional()
    .notEmpty()
    .withMessage("Zip Code cannot be empty")
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage("Invalid Zip Code"),
  body("country").optional().notEmpty().withMessage("Country cannot be empty"),
]

// Routes
router.get("/addresses", protect, addressController.getAllAddresses)

router.put("/addresses/:addressId", protect, validate(updateAddressValidationRules), addressController.updateAddress)

router.delete("/addresses/:addressId", protect, addressController.deleteAddress)

module.exports = router
