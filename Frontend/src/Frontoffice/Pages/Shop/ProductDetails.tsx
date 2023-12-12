import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Home/NavBar";
import Footer from "../Home/Footer";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  let { id } = useParams();
  console.log(product);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/v1/products/p/${id}`);
      const data = await response.json();
      const result = data.data
      setProduct(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <NavBar/>
    <div className="bg-backgroundColor  dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4 rounded-md shadow-md shadow-customColor">
          <div className="md:flex-1 px-4 m-7">
            <div className="rounded-lg shadow-md mask mask-squircle bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="object-cover w-full h-70"
                src={`http://localhost:3000/uploads/${product.productImage}`}
                alt="Product Image"
              />
              
            </div>
           
          </div>
          <div className="md:flex-1 px-4 pt-8 m-10 rounded-md shadow-md shadow-customColor">
            <h2 className="text-2xl font-bold font-primary text-yellow-900 dark:text-white mb-2">
              {product.productName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
             {product.shortDescription}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-xl text-gray-700 font-primary dark:text-gray-300">
                 {product.price} MAD 
                </span>
                {/* <span className="text-gray-600 dark:text-gray-300">$29.99</span> */}
              </div>
              <div>
                <span className="font-bold text-yellow-900 font-primary dark:text-gray-300">
                  Availability:
                </span>
                <span className="text-gray-600 font-primary dark:text-gray-300 p-2">In Stock</span>
              </div>
            </div>
            
            
            <div className="pt-5">
              <span className="font-bold text-yellow-900 font-primary dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 font-primary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis
                dapibus augue vel ipsum pretium, et venenatis sem blandit.
                Quisque ut erat vitae nisi ultrices placerat non eget velit.
                Integer ornare mi sed ipsum lacinia, non sagittis mauris
                blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt
                mi consectetur.
              </p>
            </div>
            <div className="flex -mx-2 mb-4 m-7 items-end">
              <div className="w-1/2 px-2">
                <button className="w-full bg-customColor dark:bg-gray-600 text-white py-2 px-4 rounded-md font-bold font-primary hover:bg-customColorHover dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-customColorHover dark:bg-gray-700 text-yellow-900 dark:text-white py-2 px-4 rounded-md font-bold font-primary hover:bg-customColor dark:hover:bg-gray-600 ">
                  Add to Wishlist
                </button>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetails;
