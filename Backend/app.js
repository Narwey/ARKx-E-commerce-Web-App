const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const api = require("./routes/api");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/v1' , api);

module.exports = app ;



