const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');
const {upload}=require("../multer")


router.post('/', upload.single("product_image"), productController.addProduct);
router.get('/', productController.listProducts);
router.get('/p',  productController.searchProducts); 
router.get('/p/:id', productController.getProductById);
router.put('/:id', upload.single("product_image"), productController.updateProduct);
router.delete('/:id' , productController.deleteProductById);



module.exports = router ;