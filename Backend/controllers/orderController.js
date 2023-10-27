const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Order = require('../models/order');
const Customer = require('../models/Customer');

const allowedOrderStatuses = ["Open", "Shipped", "Paid", "Closed", "Canceled"];

// Define your controller functions here

module.exports = {
  createOrder: async function createOrder(customerId, orderItems, cartTotalPrice) {
    try {
      // Create a new order with default status "open" and current date
      const order = new Order({
        customer: customerId,
        orderItems: orderItems,
        cartTotalPrice: cartTotalPrice,
        orderDate: new Date(),
        status: 'open',
      });
  
      await order.save();
    } catch (error) {
      throw error;
    }
  },
  listOrders: async function listOrders(page = 1, limit = 10) {
    try {
      // Use aggregation to query orders and join with customers to get customer information
      const orders = await Order.aggregate([
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: 'customers', // Your customer collection name
            localField: 'customer',
            foreignField: '_id',
            as: 'customerData',
          },
        },
        {
          $unwind: '$customerData',
        },
        {
          $project: {
            _id: 1,
            orderDate: 1,
            status: 1,
            firstName: '$customerData.firstName',
            lastName: '$customerData.lastName',
            itemsTotal: { $size: '$orderItems' },
            count: 1,
          },
        },
      ]);
  
      return orders;
    } catch (error) {
      throw error;
    }
  },
  getOrderById: async function getOrderById(orderId) {
    try {
      // Use aggregation to query the order by ID and join with customers to get customer information
      const order = await Order.aggregate([
        {
          $match: { _id: orderId },
        },
        {
          $lookup: {
            from: 'customers', // Your customer collection name
            localField: 'customer',
            foreignField: '_id',
            as: 'customerData',
          },
        },
        {
          $unwind: '$customerData',
        },
        {
          $project: {
            _id: 1,
            orderDate: 1,
            status: 1,
            firstName: '$customerData.firstName',
            lastName: '$customerData.lastName',
            orderItems: 1,
          },
        },
      ]);
  
      if (order.length === 0) {
        throw new Error('No order found with the provided ID');
      }
  
      return order[0];
    } catch (error) {
      throw error;
    }
  },
  updateOrderStatus: async function updateOrderStatus(orderId, status) {
    try {
      // Check if the order with the provided ID exists
      const existingOrder = await Order.findById(orderId);
  
      if (!existingOrder) {
        throw new Error('No order found with the provided ID');
      }
  
      // Update the order status
      existingOrder.status = status;
      await existingOrder.save();
  
      return existingOrder;
    } catch (error) {
      throw error;
    }
  }
}
