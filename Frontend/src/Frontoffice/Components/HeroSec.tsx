

import React from 'react';
import Handmade from '../Assets/Pictures/handmade.png';

function HeroSec() {
  return (

    <div className="hero min-h-screen bg-backgroundColor p-[3rem]">
  <div className="hero-content flex-col lg:flex-row">
    <img src="https://images.pexels.com/photos/9665361/pexels-photo-9665361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="max-w-sm rounded-lg shadow-2xl m-19 h-[30rem]" />
    <div className='m-9'>
      <h2 className="text-5xl font-primary pb-4">Welcome to</h2>
      <h1 className="text-5xl font-bold font-primary text-yellow-900">HANDMADE HAVEN</h1>
      <p className="py-6 font-primary">we take pride in curating a stunning array of exclusively handmade products, crafted with love and dedication by skilled artisans. Each piece in our collection tells a unique story, celebrating the artistry and passion behind every creation. </p>
      <a href="landingPage/products"><button className="btn btn-outline hover:bg-customColor hover:text-yellow-900 font-primary">Shop now!</button></a>
      
    </div>
    <img src="https://images.pexels.com/photos/10743455/pexels-photo-10743455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="hands" className="max-w-sm rounded-lg shadow-2xl h-[23rem] "  />
  </div>
</div>
  );
}

export default HeroSec;
