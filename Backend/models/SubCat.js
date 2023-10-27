//schema for SubCategories

const mongoose = require("mongoose");


const SubcategorySchema =  new mongoose.Schema({
  subcategoryName: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});
  

module.exports = mongoose.model('SubCategory', SubcategorySchema);