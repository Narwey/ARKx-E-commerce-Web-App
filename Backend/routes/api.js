const express = require('express')
const userRoutes = require('./userRoute');
const customerRoutes = require('./customerRoute')
const api = express.Router();

api.use('/users' ,userRoutes);
api.use('/customers',customerRoutes);


module.exports = api ;