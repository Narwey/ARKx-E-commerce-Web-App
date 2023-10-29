const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const api = require("./routes/api");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/v1' , api);

module.exports = app ;




