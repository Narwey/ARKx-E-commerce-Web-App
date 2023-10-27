const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        description: 'The order ID (UUID)',
        index: true,
    },
    customer_id: {
        type: String,
        required: true,
        description: 'The customer ID',
    },
    order_items: {
        type: [Buffer],
        required: true,
        description: 'The order list',
    },
    order_date: {
        type: Number,
        required: true,
        description: 'The order date (Unix timestamp)',
       
    },
    cart_total_price: {
        type: Number,
        required: true,
        description: 'The cart total amount',
    },
    status: {
        type: String,
        description: 'The order status'
    }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;