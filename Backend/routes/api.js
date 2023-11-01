const express = require('express')
const userRoutes = require('./userRoute');
const customerRoutes = require('./customerRoute')
const productRoutes = require('./productRoute');
const orderRoutes = require('./orderRoute');
const Categories = require('./categoryRoute');
const SubCategories = require('./subcategoryRoute')
const api = express.Router();

api.use('/users' ,userRoutes);
api.use('/customers',customerRoutes);
api.use('/products',productRoutes);
api.use('/orders',orderRoutes);
api.use('/categories', Categories)
api.use('/subcategories', SubCategories)


module.exports = api ;