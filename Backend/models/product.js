const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subcategories', // Reference to your Subcategory model
    required: true,
  },
  short_description: {
    type: String,
  },
  long_description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount_price: {
    type: Number,
  },
  options: {
    type: [String], // Assuming options are an array of strings
  },
  active: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model('product', productSchema);
