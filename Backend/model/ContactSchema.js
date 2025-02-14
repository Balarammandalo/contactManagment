const mongoose = require("mongoose");
const { Schema } = mongoose;

const { v4: uuidv4 } = require('uuid');

const Joi = require("joi")

const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  address: {
    type: String,
    required: [true, "address is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  phone: {
    type: Number,
    required: [true, "phone number is required."],
  },
  postedBy: {
    type:Schema.Types.ObjectId,
    ref: "User",
  },
});

const Contact = mongoose.model("Contact", ContactSchema)

const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    address: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(8).max(10000000000).required(),
  })
  return schema.validate(data)
}

module.exports = {validateContact , Contact}
