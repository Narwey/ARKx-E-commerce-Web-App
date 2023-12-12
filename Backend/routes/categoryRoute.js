const express = require('express');
const route = express.Router();
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');
const categoryController = require('../controllers/categoryController');
const multer = require("multer");
const upload = multer();

route.post("/", upload.none() , categoryController.createCategory)
route.get("/", categoryController.allCategory);
route.get("/", categoryController.searchCategory);
route.get("/:id", categoryController.CategoryById);
route.put("/:id", upload.none() ,categoryController.updateCategory);
route.delete("/:id" ,categoryController.deleteById);

module.exports = route;