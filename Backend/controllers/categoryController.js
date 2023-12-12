const Category = require('../models/category');
const mongoose = require('mongoose');
const Subcategory = require('../models/subcategory');

const createCategory = async(req , res) => {
    try {
        const { categoryName } = req.body;

        // Check if the category name already exists
        const existingCategory = await Category.findOne({ categoryName });

        if (existingCategory) {
            return res.status(400).json({
                status: 400,
                message: `The category '${categoryName}' already exists`,
            })
        }

    // create a new Category instance
    const newCategory = new Category({
        categoryName,
    });

    // save the new Category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
    } catch (error) {
      console.error("Error creating Category:", error);
      res.status(500).json({ status: 500, message: "internal server Error"});
    }


};
// get list of Categories

const allCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        // const limit = 10;
        // const skip = (page - 1) * limit;
        
        const categories = await Category.find()
        const totalCategories = await Category.countDocuments(); // Get the total number of categories
        
        // Check if there are no categories
        if (categories.length === 0) {
            return res
            .status(200)
            .json({ status: 200, data: [], total: totalCategories, page });
        }
        
        res.status(200)
        .json({ status: 200, data: categories, total: totalCategories, page });
    } catch (err) {
        console.error(err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  };

  
  
  
  // get by search for categories
  
  // Searching for categories.
  const searchCategory =  async (req, res) => {
      try {
      const query = req.query.query;
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
      
      const categories = await Category.find({
          categoryName: { $regex: query, $options: "i" },
        })
        .skip(skip)
        .limit(limit);
        
        // Check if there are no categories
        if (categories.length === 0) {
            return res.status(200).json({ status: 200, data: [] });
        }
        
        const totalCategories = await Category.countDocuments({
            categoryName: { $regex: query, $options: "i" },
        });
        res.status(200).json({
            status: 200,
            data: categories,
            total: totalCategories,
            page: page,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

// Getting a category by ID.
const CategoryById =async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid category ID",
        });
      }
  
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({
          status: 404,
          message: "Category not found",
        });
      }
  
      res.status(200).json({ status: 200, data: category });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  };
    

   // Updating the category data.

const updateCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { categoryName } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid category ID",
        });
      }
  
      // Check if the category name already exists, excluding the current category being updated
      const existingCategory = await Category.findOne({
        categoryName,
        _id: { $ne: categoryId },
      });
  
      if (existingCategory) {
        return res.status(400).json({
          status: 400,
          message: `The category '${categoryName}' already exists`,
        });
      }
  
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({
          status: 404,
          message: "Category not found",
        });
      }
        // Update the category data
    category.categoryName = categoryName;

    // Save the updated category to the database
    const updatedCategory = await category.save();

    res.status(200).json({ status: 200, data: updatedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Deleting a category.


const deleteById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Check if the category has any attached subcategories
    const subcategories = await Subcategory.countDocuments({category : categoryId });
    
    if (subcategories > 0) {
      return res.status(400).json({ message: 'Cannot delete category with attached subcategories.' });
    }

    // If no subcategories are attached, you can delete the category
    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    return res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};


module.exports = {createCategory , allCategory , searchCategory, CategoryById, updateCategory, deleteById};