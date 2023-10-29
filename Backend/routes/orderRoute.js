const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');


router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id',orderController.getOrderById);
router.put('/:id',orderController.updateOrderStatus);





module.exports = router ;