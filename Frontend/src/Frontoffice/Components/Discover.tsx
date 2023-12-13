
import React from 'react';
import Vases from '../Assets/Pictures/vases.jpg';

function Discover() {
  return (
 
    <div className="hero min-h-screen bg-backgroundColor">
  <div className="hero-content flex-col lg:flex-row m-10 ">
    <img src="https://images.pexels.com/photos/7507115/pexels-photo-7507115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="max-w-sm rounded-lg shadow-2xl" />
    <div className='p-16'>
      <h2 className="text-3xl font-bold font-primary text-yellow-900 pb-4 ">WHY CHOOSE US</h2>
      <h1 className="text-4xl font-bold font-primary">Find Favorites and Discover New Ones</h1>

      <p className="py-7 font-primary">Discover the beauty of handcrafted treasures that reflect our commitment to quality, authenticity, and the celebration of artisanship. Elevate your lifestyle with our diverse range of handmade goods, where every purchase embodies a touch of artistry and tradition..</p>
     <a href="/landingPage/products"> <button className="btn btn-outline  text-yellow-900 font-primary  hover:bg-customColor hover:text-yellow-900">Discover</button></a>
    </div>
  </div>
</div>
  );
}

export default Discover;
