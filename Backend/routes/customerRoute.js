const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');


router.post('/login',customerController.loginCustomers);
router.post('/', customerController.AddCustomer );
// router.get('/', authenticated ,checkRole(['admin','manager']), customerController.getCustomers);
router.get('/' , customerController.searchCustomers);
router.get('/:id', authenticated , checkRole(['admin','manager']) , customerController.getCustomerById);
router.put('/:id', customerController.updateCustomer);
router.delete('/delete', authenticated , checkRole(['customer']) ,customerController.deleteCustomer);
router.get('/profile', authenticated , checkRole(['customer']) , customerController.getCustomerProfile);
router.patch('/profile/update', authenticated , checkRole(['customer']) , customerController.updateCustomerProfile);






module.exports = router ;