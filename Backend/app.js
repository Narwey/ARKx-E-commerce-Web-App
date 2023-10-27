const CategoryRoute = require('./routes/categoriesRoute');
const SubCategory = require('./routes/SubCategoriesRoute');
const apiRoute = require('./routes/api');
require('./config/db')
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Mount the routes using app.use()
app.use('/v1', apiRoute);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
