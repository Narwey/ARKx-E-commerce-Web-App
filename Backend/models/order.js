const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Reference to your Customer model
    required: true,
  },
  order_items: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product', // Reference to your Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      }
    ],
    required: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  cart_total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'Shipped', 'Paid', 'Closed', 'Canceled'],
    default: "Open"
  },
})

module.exports = mongoose.model('order',orderSchema);
