const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');


router.post('/', authenticated , checkRole(['admin','manager']) , productController.addProduct);
// router.get('/', productController.listProducts);
router.get('/',  authenticated , productController.searchProducts);
router.get('/p/:id', productController.getProductById);
router.put('/:id', checkRole(['admin','manager']) , productController.updateProduct);
router.delete('/:id' , checkRole(['admin','manager']) , productController.deleteProductById);



module.exports = router ;