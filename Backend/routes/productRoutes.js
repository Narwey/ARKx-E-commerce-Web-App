const express = require('express');
const { body } = require('express-validator');
const authenticate = require('../middlewares/authenticate');
const checkRoles = require('../middlewares/checkRoles');
const router = express.Router();
const productController = require('../controllers/productController');


const { createProduct } = require('../controllers/productController');
const { getPaginatedProducts } = require('../controllers/productController');
const { getProductById } = require('../controllers/productController');
const { searchProducts } = require('../controllers/productController');
const { deleteProductById } = require('../controllers/productController');

// Create a new product
router.post('/api/products', authenticate, checkRoles(['admin', 'manager']), createProduct);

// List all products
router.get('/api/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = 10; // Number of products per page

  try {
    const products = await getPaginatedProducts(page, limit);

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define the route to search for products
router.get('/api/products/search', async (req, res) => {
  const query = req.query.query || '';
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = 10; // Number of products per page

  try {
    const products = await searchProducts(query, page, limit);

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a product by ID
router.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await getProductById(productId);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json({ product });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Define the route to update the product data by providing its ID
router.put('/api/products/:id', authenticate, checkRoles(['admin', 'manager']), async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;

  try {
    // Call the controller function to update the product data
    await updateProductById(productId, updatedData);

    // Respond with a success message
    res.status(200).json({ message: 'Product update success' });
  } catch (error) {
    if (error.message === 'Product name must be unique') {
      res.status(400).json({ error: 'Product name must be unique' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


// Delete a product by ID
router.delete('/api/products/:id', authenticate, checkRoles(['admin', 'manager']), async (req, res) => {
  const productId = req.params.id;

  try {
    // Call the controller function to delete the product
    await deleteProductById(productId);

    // Respond with a success message
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (error.message === 'Product not found with the provided ID') {
      res.status(404).json({ error: 'Product not found with the provided ID' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});
module.exports = router;
