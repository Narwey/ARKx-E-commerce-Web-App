const SubCategory = require("../models/subcategory");
const Category = require("../models/category");
const mongoose = require("mongoose");
const product = require("../models/product");

// Create a new subCategory
const createSubCategory = async (req, res) => {
  try {
    const { subcategoryName, category } = req.body;
    console.log(req.body);

    // Check if a subcategory with the same name already exists
    const existingSubcategory = await SubCategory.findOne({
      subcategoryName,
      category
    });

    if (existingSubcategory) {
      return res.status(400).json({
        status: 400,
        message: `The subcategory '${subcategoryName}' already exists in the parent category`,
      });
    }

    // Create a new Subcategory instance
    const newSubcategory = new SubCategory({
      subcategoryName,
      category // Assuming 'parentCategory' is the ID of the parent Category
    });

    // Save the new Subcategory to the database
    const savedSubcategory = await newSubcategory.save();

    res.status(201).json(savedSubcategory);
  } catch (error) {
    console.error("Error creating Subcategory:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Listing all the SubCategories.
const allSubCategory = async (req, res) => {
  try {
    const subcategoriesData = await SubCategory.find().lean();
    const categoryPromises = subcategoriesData.map((subcategory) =>
      Category.findById(subcategory.category).lean()
    );
    const categories = await Promise.all(categoryPromises);
    const enrichedSubcategories = subcategoriesData.map((subcategory, index) => ({
      ...subcategory,
      category_sub: categories[index],
    }));

   
    

    const totalSubcategories = await SubCategory.countDocuments(); // Get the total number of subcategories

    // Check if there are no subcategories
    if (enrichedSubcategories.length === 0) {
      return res.status(200).json({ status: 200, data: [], total: totalSubcategories });
    }

    res.status(200).json({
      data: enrichedSubcategories,
      total: totalSubcategories,
    });
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

    const searchRegex = new RegExp(query, "i");

    // Use the populate() method to retrieve category information for each subcategory with pagination and search
    const subcategories = await SubCategory.find({
      $or: [{ subcategoryName: searchRegex }],
    })
      .populate({
        path: "category",
        model: "categories",
        select: "categoryName",
      })
      .skip(skip)
      .limit(limit)
      .exec();
    // Check if there are no subcategories
    if (subcategories.length === 0) {
      return res.status(200).json({ status: 200, data: [] });
    }

    // Map the subcategories to include the category name and ID
    const subcategoriesWithCategoryInfo = subcategories.map((subcategory) => ({
      _id: subcategory._id,
      subcategoryName: subcategory.subcategoryName,
      categoryID: subcategory.category ? subcategory.category._id : null,
      categoryName: subcategory.category
        ? subcategory.category.categoryName
        : null,
      active: subcategory.active,
    }));

    // const totalSubcategories = await SubCategory.countDocuments({
    //   subcategoryName: { $regex: query, $options: "i" },
    // });

    res.status(200).json(subcategoriesWithCategoryInfo);
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
        message: "Invalid subcategory ID",
      });
    }

    // Populate the 'category' field to get the category name and ID
    const subcategory = await SubCategory.findById(subcategoryId).populate(
      "category"
    );

    if (!subcategory) {
      return res.status(404).json({
        status: 404,
        message: "Subcategory not found",
      });
    }

    // Extract category information
    const categoryID = subcategory.category ? subcategory.category._id : null;
    const categoryName = subcategory.category
      ? subcategory.category.categoryName
      : null;

    // Create the desired output
    const result = {
      _id: subcategory._id,
      subcategoryName: subcategory.subcategoryName,
      categoryID: categoryID,
      categoryName: categoryName,
      active: subcategory.active,
    };

    res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Updating a Subcategory by ID.
const updateSubCategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const { subcategoryName, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid subcategory ID",
      });
    }

    // Check if the subcategory exists
    const subcategory = await SubCategory.findById(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({
        status: 404,
        message: "Subcategory not found",
      });
    }

    // Check if the updated subcategory name already exists in the same parent category
    const existingSubcategory = await SubCategory.findOne({
      subcategoryName,
      category,
    });

    if (
      existingSubcategory &&
      existingSubcategory._id.toString() !== subcategoryId
    ) {
      return res.status(400).json({
        status: 400,
        message: `The subcategory '${subcategoryName}' already exists in the parent category`,
      });
    }

    // Update the subcategory
    subcategory.subcategoryName = subcategoryName;
    subcategory.category = category;
    const updatedSubcategory = await subcategory.save();

    res.status(200).json({ status: 200, data: updatedSubcategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

// Deleting a Subcategory by ID.

const deleteSubCategory = async (req, res) => {
  const subcategoryId = req.params.id;

  try {
    // Check if the category has any attached subcategories
    const products = await product.countDocuments({
      subcategory: subcategoryId,
    });

    if (products > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete category with attached a product." });
    }

    // If no subcategories are attached, you can delete the category
    const deletedCategory = await SubCategory.findByIdAndRemove(subcategoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    return res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
};

module.exports = {
  createSubCategory,
  allSubCategory,
  searchSubCategory,
  SubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
