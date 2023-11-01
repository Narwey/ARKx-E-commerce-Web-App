const SubCategoryController = require('../controllers/subcategoryController')
const express = require('express');
const route = express.Router();

route.post('/', SubCategoryController.createSubCategory);

// route.get("/", SubCategoryController.allSubCategory);
route.get("/", SubCategoryController.searchSubCategory);
route.get('/:id', SubCategoryController.SubCategoryById);
route.put('/:id', SubCategoryController.updateSubCategory);
route.delete('/:id', SubCategoryController.deleteSubCategory);


module.exports = route;