const express = require ('express');
const Categories = require('./categoriesRoute');
const SubCategories = require('./SubCategoriesRoute');

const apiRoute = express.Router()

apiRoute.use('/categorie', Categories)
apiRoute.use('/subcategorie', SubCategories)

module.exports = apiRoute
