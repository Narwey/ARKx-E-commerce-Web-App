const express = require('express');
const route = express.Router();


const categoryController = require('../controllers/categorieController')

route.post("/", categoryController.createCategory)
route.get("/", categoryController.allCategory);
route.get("/search", categoryController.searchCategory);
route.get("/:id", categoryController.CategoryById);
route.put("/:id", categoryController.updateCategory);
route.delete("/:id", categoryController.deleteCategory);
module.exports = route;
