const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');
const multer = require("multer");
const upload = multer();


router.post('/login',customerController.loginCustomers);
router.post('/', upload.none() , customerController.AddCustomer );
router.get('/',  customerController.getCustomers);
router.get('/' , customerController.searchCustomers);
router.get('/:id', customerController.getCustomerById);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);
router.get('/profile', authenticated , checkRole(['customer']) , customerController.getCustomerProfile);
router.patch('/profile/update', authenticated , checkRole(['customer']) , customerController.updateCustomerProfile);






module.exports = router ;