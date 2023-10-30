const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');

router.post('/', authenticated , checkRole(['customer']) , orderController.createOrder);
router.get('/', authenticated ,  checkRole(['admin','manager']) , orderController.getOrders);
router.get('/:id', authenticated , checkRole(['admin','manager']) , orderController.getOrderById);
router.put('/:id', authenticated , checkRole(['admin','manager']) , orderController.updateOrderStatus);





module.exports = router ;