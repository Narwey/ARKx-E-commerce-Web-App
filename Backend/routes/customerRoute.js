const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


router.post('/login',customerController.loginCustomers);
router.post('/', customerController.AddCustomer );
router.get('/',customerController.getCustomers);
router.get('/',customerController.searchCustomers);
router.get('/:id',customerController.getCustomerById);
router.put('/:id',customerController.updateCustomer);
router.delete('/delete',customerController.deleteCustomer);
router.get('/profile',customerController.getCustomerProfile);
router.patch('/profile/update',customerController.updateCustomerProfile);






module.exports = router ;