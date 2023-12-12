const SubCategoryController = require('../controllers/subcategoryController')
const express = require('express');
const route = express.Router();
const multer = require("multer");
const upload = multer();


route.post('/', upload.none() , SubCategoryController.createSubCategory);
route.get("/", SubCategoryController.allSubCategory);
route.get("/", SubCategoryController.searchSubCategory);
route.get('/:id', SubCategoryController.SubCategoryById);
route.put('/:id', upload.none() , SubCategoryController.updateSubCategory);
route.delete('/:id', SubCategoryController.deleteSubCategory);


module.exports = route;