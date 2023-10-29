const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
  subcategoryName: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories', // Reference to your Category model
  },
  active: Boolean,
});

module.exports  = mongoose.model('subcategories', SubcategorySchema);

