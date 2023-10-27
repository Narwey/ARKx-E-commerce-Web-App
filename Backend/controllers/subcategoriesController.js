const SubCategory = require("../models/SubCat");
const mongoose = require('mongoose');

// Create a new subCategory 
const createSubCategory = async (req, res) => {
    try {
        const { subcategoryName, parentCategory } = req.body;

        // Check if a subcategory with the same name already exists
        const existingSubcategory = await SubCategory.findOne({ subcategoryName, parentCategory });

        if (existingSubcategory) {
            return res.status(400).json({
                status: 400,
                message: `The subcategory '${subcategoryName}' already exists in the parent category`,
            });
        }

        // Create a new Subcategory instance
        const newSubcategory = new SubCategory({
            subcategoryName,
            parentCategory, // Assuming 'parentCategory' is the ID of the parent Category
        });

        // Save the new Subcategory to the database
        const savedSubcategory = await newSubcategory.save();

        res.status(201).json(savedSubcategory);
    } catch (error) {
        console.error('Error creating Subcategory:', error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

// Listing all the SubCategories.
const allSubCategory = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      const subcategories = await SubCategory.find().skip(skip).limit(limit);
      const totalSubcategories = await SubCategory.countDocuments(); // Get the total number of subcategories
  
      // Check if there are no subcategories
      if (subcategories.length === 0) {
        return res.status(200).json({ status: 200, data: [], total: totalSubcategories, page });
      }
  
      res.status(200).json({ status: 200, data: subcategories, total: totalSubcategories, page });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  };
// Searching for Subcategories.
const searchSubCategory = async (req, res) => {
    try {
      const query = req.query.query;
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      const subcategories = await SubCategory.find({
        subcategoryName: { $regex: query, $options: "i" },
      })
        .skip(skip)
        .limit(limit);
  
      // Check if there are no subcategories
      if (subcategories.length === 0) {
        return res.status(200).json({ status: 200, data: [] });
      }
  
      const totalSubcategories = await SubCategory.countDocuments({
        subcategoryName: { $regex: query, $options: "i" },
      });
      res.status(200).json({
        status: 200,
        data: subcategories,
        total: totalSubcategories,
        page: page,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  };
// Getting a Subcategory by ID.
const SubCategoryById = async (req, res) => {
    try {
      const subcategoryId = req.params.id;
  
      if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
        return res.status(400).json({
          status: 400,
          message: 'Invalid subcategory ID',
        });
      }
  
      // Populate the 'parentCategory' field to get the category name
      const subcategory = await SubCategory.findById(subcategoryId).populate('parentCategory');
  
      if (!subcategory) {
        return res.status(404).json({
          status: 404,
          message: 'Subcategory not found',
        });
      }
  
      res.status(200).json({ status: 200, data: subcategory });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
  };


// Updating a Subcategory by ID.
const updateSubCategory = async (req, res) => {
    try {
        const subcategoryId = req.params.id;
        const { subcategoryName, parentCategory } = req.body;

        if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid subcategory ID',
            });
        }

        // Check if the subcategory exists
        const subcategory = await SubCategory.findById(subcategoryId);

        if (!subcategory) {
            return res.status(404).json({
                status: 404,
                message: 'Subcategory not found',
            });
        }

        // Check if the updated subcategory name already exists in the same parent category
        const existingSubcategory = await SubCategory.findOne({ subcategoryName, parentCategory });

        if (existingSubcategory && existingSubcategory._id.toString() !== subcategoryId) {
            return res.status(400).json({
                status: 400,
                message: `The subcategory '${subcategoryName}' already exists in the parent category`,
            });
        }

        // Update the subcategory
        subcategory.subcategoryName = subcategoryName;
        subcategory.parentCategory = parentCategory;
        const updatedSubcategory = await subcategory.save();

        res.status(200).json({ status: 200, data: updatedSubcategory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};

// Deleting a Subcategory by ID.

const deleteSubCategory = async (req, res) => {
    try {
        const subcategoryId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid subcategory ID',
            });
        }

        // Check if the subcategory exists
        const subcategory = await SubCategory.findById(subcategoryId);

        if (!subcategory) {
            return res.status(404).json({
                status: 404,
                message: 'Subcategory not found',
            });
        }

        // Delete the subcategory using deleteOne
        await SubCategory.deleteOne({ _id: subcategoryId });
        
        res.status(200).json({
            status: 200,
            message: "SubCategory deleted successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
};




module.exports = {createSubCategory , allSubCategory , searchSubCategory , SubCategoryById , updateSubCategory , deleteSubCategory };