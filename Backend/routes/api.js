const express = require('express')
const userRoutes = require('./userRoute');
const customerRoutes = require('./customerRoute')
const productRoutes = require('./productRoute');
const orderRoutes = require('./orderRoute');
const api = express.Router();

api.use('/users' ,userRoutes);
api.use('/customers',customerRoutes);
api.use('/products',productRoutes);
api.use('/orders',orderRoutes);


module.exports = api ;