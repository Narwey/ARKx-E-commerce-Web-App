const order = require('../models/order');


const createOrder = async (req, res) => {
        
    const { customer_id, orderItems, cartTotalPrice } = req.body;
  
    try {
      const orderItemsArray = orderItems.map((item) => ({
        product: item.product, // Assuming you have product IDs in orderItems
        quantity: item.quantity,
      }));
  
      
      const newOrder = await order.create({
        customer_id: customer_id,
        order_items: orderItemsArray,
        cart_total_price: cartTotalPrice,
        
      });
  
      
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      // Handle any errors, e.g., validation errors or database issues
      res.status(500).json({ error: 'Failed to create an order', details: error.message });
    }
  };

  const getOrders = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = 10;
  
    try {
      const orders = await order.find()
        .populate({
          path: 'customer_id',
          model: 'Customer',
          select: 'firstName lastName', // Retrieve first name and last name of the customer
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
  
      // Calculate total count and itemsTotal
      const totalCount = await order.countDocuments();
      let itemsTotal = 0;
  
      for (const order of orders) {
        for (const orderItem of order.order_items) {
          itemsTotal += orderItem.quantity;
        }
      }
  
      res.json({
        count: totalCount,
        itemsTotal: itemsTotal,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
    }
  };

  const getOrderById = async (req, res) => {
    const id = req.params.id; // Get the order ID from the route parameter
  
    try {
      const getOrder = await order.findById(id)
        .populate({
          path: 'customer_id',
          model: 'Customer',
          select: 'firstName lastName', // Retrieve first name and last name of the customer
        })
        .exec();
  
      if (!getOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.json({ getOrder });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch order details', details: error.message });
    }
  };

  const updateOrderStatus = async (req, res) => {
    const id = req.params.id; // Get the order ID from the route parameter
    const { status } = req.body; // Get the new status from the request body
  
    try {
      // Validate the new status to ensure it's one of the allowed values
      if (!['Open', 'Shipped', 'Paid', 'Closed', 'Canceled'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
  
      const o = await order.findById(id);
  
      if (!o) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Update the order status
      o.status = status;
  
      // Save the updated order
      await o.save();
  
      res.json({ message: 'Order status updated successfully', o });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order status', details: error.message });
    }
  };
  
  

module.exports = {
    createOrder ,
    getOrders ,
    getOrderById ,
    updateOrderStatus ,
}
  