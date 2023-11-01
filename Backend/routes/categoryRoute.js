const express = require('express');
const route = express.Router();
const checkRole = require('../middleware/checkRole');
const authenticated = require('../middleware/auth');


const categoryController = require('../controllers/categoryController');

route.post("/", authenticated ,checkRole(['admin','manager']) , categoryController.createCategory)
// route.get("/", categoryController.allCategory);
route.get("/", categoryController.searchCategory);
route.get("/:id", categoryController.CategoryById);
route.put("/:id", authenticated , checkRole(['admin','manager']) , categoryController.updateCategory);
route.delete("/:id", authenticated , checkRole(['admin','manager']) ,categoryController.deleteById);

module.exports = route;