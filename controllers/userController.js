const User = require("../models/User")
const Address = require("../models/Address")

exports.registerUserAddress = async (req, res, next) => {
  try {
    const { addresses } = req.body

    // Create multiple addresses linked to the authenticated user
    const addressDocs = addresses.map((address) => ({
      ...address,
      user: req.user._id,
    }))

    const savedAddresses = await Address.insertMany(addressDocs)

    res.status(201).json({
      message: "Addresses saved successfully",
      addresses: savedAddresses,
    })
  } catch (error) {
    next(error)
  }
}
