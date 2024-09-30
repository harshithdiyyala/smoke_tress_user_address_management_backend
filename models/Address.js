const mongoose = require("mongoose")

const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  street: {
    type: String,
    required: [true, "Street is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
  },
  zipCode: {
    type: String,
    required: [true, "Zip Code is required"],
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{5}(-\d{4})?$/.test(v)
      },
      message: (props) => `${props.value} is not a valid Zip Code!`,
    },
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    trim: true,
  },
})

module.exports = mongoose.model("Address", AddressSchema)
