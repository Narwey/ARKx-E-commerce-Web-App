const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Product = require('../models/product');
const Subcategory = require('../models/Subcategory'); // Import your Mongoose Subcategory model
const Category = require('../models/Category');

// Create a new product
// Validation using Joi
const Joi = require('joi');
const productSchema = Joi.object({
  sku: Joi.string().required(),
  productImage: Joi.string().required(),
  productName: Joi.string().required(),
  subcategory: Joi.string().required(),
  price: Joi.number().required(),
});

async function createProduct(req, res) {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { sku, productImage, productName, subcategory, price } = req.body;

  try {
    const newProduct = new Product({
      sku,
      productImage,
      productName,
      subcategory,
      price,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// List all products
async function getPaginatedProducts(page = 1, limit = 10) {
    try {
      const products = await Product.aggregate([
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
        {
            $lookup: {
              from: 'subcategories', // Your subcategory collection name
              localField: 'subcategory',
              foreignField: '_id',
              as: 'subcategoryData',
            },
          },
          {
            $unwind: '$subcategoryData',
          },
          {
            $lookup: {
              from: 'categories', // Your category collection name
              localField: 'subcategoryData.category',
              foreignField: '_id',
              as: 'categoryData',
            },
          },
          {
            $unwind: '$categoryData',
          },
          {
            $project: {
              _id: 1,
              productName: 1,
              price: 1,
              categoryName: '$categoryData.name', // Rename to categoryName
            },
          },
        ]);
    
  
      return products;
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  }

// Search for a product
async function searchProducts(query, page = 1, limit = 10) {
    try {
      // Aggregation pipeline to search for products and include category name
      const products = await Product.aggregate([
        {
          $match: {
            $or: [
              { productName: { $regex: query, $options: 'i' } }, // Case-insensitive search
            ],
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: 'subcategories', // Your subcategory collection name
            localField: 'subcategory',
            foreignField: '_id',
            as: 'subcategoryData',
          },
        },
        {
          $unwind: '$subcategoryData',
        },
        {
          $lookup: {
            from: 'categories', // Your category collection name
            localField: 'subcategoryData.category',
            foreignField: '_id',
            as: 'categoryData',
          },
        },
        {
          $unwind: '$categoryData',
        },
        {
          $project: {
            _id: 1,
            productName: 1,
            price: 1,
            categoryName: '$categoryData.name', // Include category name
          },
        },
      ]);
  
      return products;
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  }

// Get a product by ID
async function getProductById(productId) {
    try {
      const product = await Product.aggregate([
        {
          $match: {
            _id: productId, // Match the product by ID
          },
        },
        {
          $lookup: {
            from: 'subcategories', // Your subcategory collection name
            localField: 'subcategory',
            foreignField: '_id',
            as: 'subcategoryData',
          },
        },
        {
          $unwind: '$subcategoryData',
        },
        {
          $project: {
            _id: 1,
            productName: 1,
            price: 1,
            subcategoryName: '$subcategoryData.name', // Include subcategory name
          },
        },
      ]);
  
      return product.length === 0 ? null : product[0];
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  }

// update the product data by ID
async function updateProductById(productId, updatedData) {
    try {
      // Check if the updated product name already exists (must be unique)
      if (updatedData.productName) {
        const duplicateProduct = await Product.findOne({
          productName: updatedData.productName,
          _id: { $ne: productId },
        });
  
        if (duplicateProduct) {
          throw new Error('Product name must be unique');
        }
      }
  
      // Update the product data
      await Product.findByIdAndUpdate(productId, updatedData);
  
    } catch (error) {
      throw error;
    }
  }


//delete a product by its ID
async function deleteProductById(productId) {
  try {
    // Check if the product with the provided ID exists
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      throw new Error('Product not found with the provided ID');
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getPaginatedProducts,
  searchProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
