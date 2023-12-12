import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import NavBar from "../Pages/Home/NavBar";
import Footer  from "../Pages/Home/Footer";


const Cart = () => {

    // State to manage the cart
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
      // Retrieve cart items from local storage
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      console.log(storedCartItems)
      setCartItems(storedCartItems.map((el)=>{
        const s= {...el,quantity : 1}
        // console.log(s);
        return s
      }));

    }, []);
// console.log(cartItems);
    const updateQuantity = (index, newQuantity) => {
      setCartItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: newQuantity
        };
        return updatedItems;
      });
    };
    

    

    return (
        <>
        <NavBar/>
  <div className="container mx-auto mt-10">
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-backgroundColor px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl font-primary text-yellow-900">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl font-primary"> Items</h2>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-yellow-900 text-xs uppercase w-2/5 font-primary">Product Details</h3>
          <h3 className="font-semibold text-center text-yellow-900 text-xs uppercase w-1/5 font-primary">Quantity</h3>
          <h3 className="font-semibold text-center text-yellow-900 text-xs uppercase w-1/5 font-primary">Price</h3>
          <h3 className="font-semibold text-center text-yellow-900 text-xs uppercase w-1/5 font-primary">Total</h3>
        </div>
        
        
        {
          cartItems.map((item, index)=> (

            <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
             <div className="flex w-2/5">
              <div className="w-20">
                <img className="h-24 w-full " src={`http://localhost:3000/uploads/${item.product_image}`} alt=""/>
              </div>
              <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm font-primary">{item.product_name}</span>
                <span className="text-yellow-900 text-xs font-primary">{item.subcategory.subcategoryName}</span>
                
                {/* <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a> */}
              </div>
              {/* <MdDeleteOutline /> */}
              
            </div>
            <div className="flex justify-center w-1/5">
              <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={()=>updateQuantity(index, item.quantity - 1)}><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
              </svg>
  
              <input className="mx-2 border text-center w-11 rounded h-7" type="text"  value={item.quantity} onChange={(e) => updateQuantity(index, e.target.value)}/>
  
              <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={()=>updateQuantity(index, item.quantity + 1)}>
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
              </svg>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm font-primary">{item.price} MAD</span>
            <span className="text-center w-1/5 font-semibold text-sm font-primary">{item.price * item.quantity} MAD</span>
            <div>
              <MdDeleteOutline className="text-xl cursor-pointer " />
              </div>
          </div>
          )
          )}
       

       

        <a href="/products" className="flex font-semibold text-yellow-900 text-sm mt-10">
      
          <svg className="fill-current mr-2 text-yellow-900 w-4 font-primary" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continue Shopping
        </a>
      </div>

      <div id="summary" className="w-1/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8 font-primary">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Items 3</span>
          <span className="font-semibold text-sm font-primary">590$</span>
        </div>
        <div>
          <label className="font-medium inline-block mb-3 text-sm uppercase font-primary">Shipping</label>
          <select className="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - $10.00</option>
          </select>
        </div>
        <div className="py-10">
          <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
          <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full"/>
        </div>
        <button className="bg-customColor hover:bg-customColorHover px-5 py-2 text-sm text-white uppercase">Apply</button>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase font-primary">
            <span>Total cost</span>
            <span>$600</span>
          </div>
          <button className="bg-yellow-800 font-semibold hover:bg-yellow-900 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>
    
    </div>
  </div>
  <Footer />
        </>
    )
}

export default Cart;