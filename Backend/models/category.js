const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  
  categoryName : {
    type:String,
    unique:true
},

  active: Boolean,})

module.exports = mongoose.model('categories', categorySchema);