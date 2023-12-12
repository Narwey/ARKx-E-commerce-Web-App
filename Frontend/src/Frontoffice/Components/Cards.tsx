import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
  // console.log(item)
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };


  const handleAddToCart = () => {
    // Retrieve existing cart items or initialize as an empty array
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
    // Add the item ID to the cart if it doesn't exist
    if (!existingCartItems.includes(item._id)) {
      existingCartItems.push(item);
      localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
    }
  };
  return (
    <div
      to={`/Productdetails/${item._id}`}
      className="card shadow-xl relative mr-5 md:my-5"
    >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-customColor"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/Productdetails/${item._id}`}>
        <figure>
          <img
            src={`http://localhost:3000/uploads/${item.product_image}`}
            alt="img"
            className="transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/Productdetails/${item._id}`}>
          <h2 className="card-title font-primary text-yellow-900">
            {item.product_name}
          </h2>
        </Link>
        <p className="font-primary">{item.short_description}</p>
        <h5 className="font-bold ">
          <span className="text-md text-red font-primary">
            {" "}
            {item.price} MAD{" "}
          </span>
        </h5>
        <div className="card-actions justify-between items-center mt-2 ">
         
          <button
          onClick={() => {
            handleAddToCart();
            window.location.href = "/shoppingCart"; // Redirect to shopping cart
          }}
          className="btn btn-outline flex items-center justify-center font-primary rounded-md bg-customColor px-5 py-2.5 w-full text-center text-sm font-medium text-white hover:bg-customColorHover hover:text-yellow-900 focus:outline-none focus:ring-4 focus:ring-blue-300 "
        >
          Add to Cart
        </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
