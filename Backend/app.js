const express = require('express');
const app = express();
const apiRoute = require('./routes/api');


app.use(express.json());


app.use('/v1', apiRoute);


module.exports = app ;


