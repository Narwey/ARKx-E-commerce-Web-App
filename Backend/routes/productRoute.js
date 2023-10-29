const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.post('/', productController.addProduct);
// router.get('/', productController.listProducts);
router.get('/', productController.searchProducts);
router.get('/p/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id' , productController.deleteProductById);



module.exports = router ;