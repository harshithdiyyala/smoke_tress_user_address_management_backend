const Address = require("../models/Address")

// Existing function
exports.getAllAddresses = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, city } = req.query

    const query = city ? { city } : {}

    const addresses = await Address.find(query)
      .populate("user", "name username")
      .skip((page - 1) * limit)
      .limit(parseInt(limit))

    const total = await Address.countDocuments(query)

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      addresses,
    })
  } catch (error) {
    next(error)
  }
}

// New function: Update Address
exports.updateAddress = async (req, res, next) => {
  try {
    const addressId = req.params.addressId
    const userId = req.user._id

    // Find the address by ID
    let address = await Address.findById(addressId)

    if (!address) {
      return res.status(404).json({ error: "Address not found" })
    }

    // Check if the address belongs to the authenticated user
    if (address.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not authorized to update this address" })
    }

    // Update the address
    const { street, city, state, zipCode, country } = req.body

    address.street = street || address.street
    address.city = city || address.city
    address.state = state || address.state
    address.zipCode = zipCode || address.zipCode
    address.country = country || address.country

    // Save the updated address
    await address.save()

    res.json({ message: "Address updated successfully", address })
  } catch (error) {
    next(error)
  }
}

// New function: Delete Address
exports.deleteAddress = async (req, res, next) => {
  try {
    const addressId = req.params.addressId
    const userId = req.user._id

    // Find the address by ID
    let address = await Address.findById(addressId)

    if (!address) {
      return res.status(404).json({ error: "Address not found" })
    }

    // Check if the address belongs to the authenticated user
    if (address.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this address" })
    }

    // Delete the address
    await Address.findByIdAndDelete(addressId)

    res.json({ message: "Address deleted successfully" })
  } catch (error) {
    next(error)
  }
}
