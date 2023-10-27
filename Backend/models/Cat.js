const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
    },
  ],
});
  
module.exports = mongoose.model('Category', categorySchema  );
