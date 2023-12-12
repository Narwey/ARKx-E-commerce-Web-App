const product = require("../models/product");
const subcategories = require("../models/subcategory");
const Category = require("../models/category");

const addProduct = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      sku,
      product_name,
      subcategory,
      short_description,
      long_description,
      price,
      quantity,
      discount_price,
      options,
    } = req.body;
    const product_image = req.file.filename;

    // Create a new product using the Product model
    const newProduct = new product({
      sku,
      product_image,
      product_name,
      subcategory,
      short_description,
      long_description,
      price,
      quantity,
      discount_price,
      options,
      active: false,
    });

    await newProduct.save();
    res.status(201).json({
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating product",
        error: error.message,
      });
  }
};

const listProducts = async (req, res) => {
  // const page = req.query.page || 1;
  // const limit = 10;

  try {
    // const skip = (page - 1) * limit;

    const products = await product
      .find()
      .populate({
        path: "subcategory", // Ensure this path matches the field in your product schema
        model: "subcategories",
        populate: {
          path: "category", // Assuming category field within subcategory references categories
          model: "categories",
          select: "categoryName",
        },
      })
      // .skip(skip)
      // .limit(limit)
      .exec();

    // const productsWithCategoryName = products.map(product => ({
    //   _id: product._id,
    //   sku: product.sku,
    //   product_image: product.product_image,
    //   product_name: product.product_name,
    //   subcategory:product.subcategory._id ? product.subcategory._id : "",
    //   categoryName: product.subcategory.category.categoryName ? product.subcategory.category.categoryName : "",
    //   short_description: product.short_description,
    //   long_description: product.long_description,
    //   price: product.price,
    //   discount_price: product.discount_price,
    //   options: product.options,
    //   active: product.active,
    // }));

    res.status(200).json(products);
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const searchProducts = async (req, res) => {
  const page = req.query.page || 1; // Default to page 1 if not specified
  const limit = 30;
  const searchQuery = req.query.query || ""; // Get the search query parameter

  try {
    const skip = (page - 1) * limit;
    // Create a regular expression for the search query, enabling a case-insensitive search
    const searchRegex = new RegExp(searchQuery, "i");

    // Use the populate() method to retrieve category information for each product with pagination and search
    const products = await product
      .find({
        // Use the $or operator to search in multiple fields if needed
        $or: [
          { product_name: searchRegex }, // Search in product_name
          { short_description: searchRegex }, // Search in short_description
          // Add more fields as needed for your search
        ],
      })
      .populate({
        path: "subcategory_id",
        model: "categories", // Reference to your 'Category' model
        select: "categoryName", // Select only the 'categoryName' field
      })
      .skip(skip)
      .limit(limit)
      .exec();

    // Map the products to include the category name
    const productsWithCategoryName = products.map((product) => ({
      _id: product.id,
      sku: product.sku,
      product_image: product.product_image,
      product_name: product.product_name,
      category_name: product.subcategory
        ? product.subcategory.categoryName
        : null, // Check if subcategory is null
      short_description: product.short_description,
      long_description: product.long_description,
      price: product.price,
      discount_price: product.discount_price,
      options: product.options,
      active: product.active,
    }));

    // Send the products as a JSON response with a 200 status code
    res.status(200).json(productsWithCategoryName);
  } catch (error) {
    // Handle any errors here
    console.error("Error listing products:", error);
    res.status(500).json({ error: "An error occurred" }); // You can customize the error response
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id; // Assuming the product ID is part of the request parameters

  try {
    // Use Mongoose to find the product by its ID and populate the 'subcategory' field
    const p = await product.findById(productId).populate("subcategory");

    if (!p) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Extract the subcategoryName from the populated subcategory field
    const subcategoryName = p.subcategory
      ? p.subcategory.subcategoryName
      : null;

    // Prepare the product data with the subcategoryName
    const productData = {
      _id: p._id,
      sku: p.sku,
      productImage: p.product_image,
      productName: p.product_name,
      subcategoryName: subcategoryName, // Use the subcategoryName field
      shortDescription: p.short_description,
      longDescription: p.long_description,
      price: p.price,
      discountPrice: p.discount_price,
      active: p.active,
      options: p.options,
    };

    // Send the product data as a JSON response with a 200 status code
    res.status(200).json({
      data: productData,
    });
  } catch (error) {
    // Handle any errors here
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    // Check if the product exists
    const existingProduct = await product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract the fields you want to update from req.body
    const { sku, product_name, subcategory, short_description, price, active } =
      req.body;
    console.log("Subcategory:", subcategory);
    const subcategoryid = await subcategories.findOne( {subcategoryName : subcategory} );
    const subcategory_id = subcategoryid._id;
    console.log("Subcategory:", subcategoryid);
    const product_image = req.file.filename;

    const updatedProduct = await product.findByIdAndUpdate(
      productId,
      {
        sku,
        product_image,
        product_name,
        subcategory_id,
        short_description,
        price,
        active,
      },
      { new: true }
    );

    // Return the updated product data
    res.status(200).json({
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  const productId = req.params.id; // Assuming the product ID is part of the request parameters

  try {
    // Check if the product exists
    const existingProduct = await product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Perform the product deletion
    await product.findByIdAndRemove(productId);

    // Return a success message
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // Handle any errors here
    console.error("Error deleting product:", error);
    res.status(500).json({ error: error.message });
  }
};

// async function updateProductsWithNewField() {
//   try {
//     // Find all existing products
//     const oldProducts = await Product.find(); // Use Product.find()

//     // Iterate over each product
//     for (const product of oldProducts) {
//       // Generate a random number between 10 and 100
//       const randomQuantity = Math.floor(Math.random() * 91) + 10;

//       // Update the product with the new 'quantity' field
//       const updatedProduct = await Product.findByIdAndUpdate(product._id, { quantity: randomQuantity }, { new: true });
//       console.log(updatedProduct);
//     }

//   } catch (error) {
//     console.error('Error updating products:', error);
//   }
// }

// // Call the function to perform the update
// updateProductsWithNewField();

module.exports = {
  addProduct,
  listProducts,
  searchProducts,
  getProductById,
  updateProduct,
  deleteProductById,
};
