const express = require('express');
require('./config/db');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes'); 
const productRoutes = require('./routes/productRoutes');


const app = express();
const port = 3000;


app.use(bodyParser.json());

// Use your route file here
app.use('/api/orders', orderRoutes);
app.use(productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
