const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Order = require('../models/order');
const orderController = require('../controllers/orderController');
const checkRoles = require('../middlewares/checkRoles');

const authenticate = require('../middlewares/authenticate'); // Your authentication middleware
//const validateEmail = require('../middlewares/validateEmail'); // Your email validation middleware

const { createOrder } = require('../controllers/orderController');
const { listOrders } = require('../controllers/orderController');
const { getOrderById } = require('../controllers/orderController');
const { updateOrderStatus } = require('../controllers/orderController');


const router = express.Router();

const allowedOrderStatuses = ["Open", "Shipped", "Paid", "Closed", "Canceled"];

// Define the route to create a new order
router.post('/api/orders', authenticate,  async (req, res) => {
  // Check if the user has the role of "customer" (You should have a role-checking middleware)
  if (req.user.role !== 'customer') {
    return res.status(403).json({ error: 'Role privilege limitation' });
  }

  // Extract order data from the request body
  const { customerId, orderItems, cartTotalPrice } = req.body;

  try {
    // Call the controller function to create the order
    await createOrder(customerId, orderItems, cartTotalPrice);
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    if (error.message === 'Role privilege limitation') {
      res.status(403).json({ error: 'Role privilege limitation' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


router.get('/api/orders', authenticate, checkRoles(['admin', 'manager']), async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = 10; // Number of orders per page

  try {
    // Call the controller function to list orders
    const orders = await listOrders(page, limit);
    res.status(200).json({ orders });
  } catch (error) {
    if (error.message === 'Role privilege limitation') {
      res.status(403).json({ error: 'Role privilege limitation' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.get('/api/orders/:id', authenticate, checkRoles(['admin', 'manager']), async (req, res) => {
  const orderId = req.params.id;

  try {
    // Call the controller function to get the order by ID
    const order = await getOrderById(orderId);
    res.status(200).json({ order });
  } catch (error) {
    if (error.message === 'No order found with the provided ID') {
      res.status(404).json({ error: 'No order found with the provided ID' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


router.patch('/api/orders/:id', authenticate, checkRoles(['admin', 'manager']), async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    // Call the controller function to update the order status
    const updatedOrder = await updateOrderStatus(orderId, status);
    res.status(200).json({ message: 'Order update success', order: updatedOrder });
  } catch (error) {
    if (error.message === 'No order found with the provided ID') {
      res.status(404).json({ error: 'No order found with the provided ID' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;
