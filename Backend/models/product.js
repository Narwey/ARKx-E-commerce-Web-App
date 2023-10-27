const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    description: 'Product ID (UUID)',
    index: true,
  },
  sku: {
    type: String,
    required: true,
    description: 'The product serialisation',
    unique: true,
  },
  product_image: {
    type: String,
    required: true,
    description: 'The product image link',
  },
  product_name: {
    type: String,
    required: true,
    description: 'Product name',
    unique: true,
  },
  subcategory_id: {
    type: String,
    required: true,
    description: 'The parent subcategory ID',
  },
  short_description: {
    type: String,
    description: 'Product short description',
  },
  long_description: {
    type: String,
    description: 'Product long description',
  },
  price: {
    type: Number,
    required: true,
    description: 'The product price',
  },
  discount_price: {
    type: Number,
    description: 'The product discount price',
  },
  options: {
    type: [Buffer], // Assuming "options" is stored as a binary/blob data
    description: 'The product options (stored as binary data)',
  },
  active: {
    type: Boolean,
    required: true,
    description: 'Product active status',
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
