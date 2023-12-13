import React, { useState } from 'react';

export default function Carousel() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const images = [
    {
      src: 'https://i.pinimg.com/564x/56/17/40/56174065cc43ce50fe222c10b49725b9.jpg',
      alt: 'Morrocan Woven plate',
      link: '/landingPage',
    },
    {
        src: 'https://i.pinimg.com/564x/09/2c/f3/092cf3c368f7aee824a6dd7324172134.jpg',
        alt: 'Candles',
        link: '/landingPage',
    
    },
    {
        src: 'https://i.pinimg.com/564x/a3/2a/78/a32a78c4ff81476d8a723ac79017b111.jpg',
        alt: 'Dining plate',
        link: '/landingPage',
    
    },
    {
        src: 'https://i.pinimg.com/564x/51/1c/14/511c1433964d4d28877502fcaf6b2396.jpg',
        alt: 'Broderie',
        link: '/landingPage',
    
    },
    {
        src: 'https://i.pinimg.com/564x/fc/2a/f5/fc2af5e309083f1a03c491365580e4b7.jpg',
        alt: 'Crochet Bag',
        link: '/landingPage',
    
    },
    {
        src: 'https://i.pinimg.com/564x/9a/02/ba/9a02ba06d40e26ab00f6709f4ca8d90e.jpg',
        alt: 'Ceramic Plate',
        link: '/landingPage',
    
    },
    {
      src: 'https://i.pinimg.com/564x/67/d5/c3/67d5c3247cbdee5c9cf300539c25fe5a.jpg',
      alt: 'Ceramic Plate',
      link: '/landingPage',
  
  },
 
   
  ];

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="carousel carousel-center rounded-box">
      {images.map((image, index) => (
        <div
          key={index}
          className="carousel-item relative"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <img src={image.src} className="h-[25rem]" alt={image.alt} />

          {hoveredIndex === index && (
            <a
              href="/landingPage/products"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 hover:bg-opacity-70 transition duration-300"
            >
              <button className="text-white text-lg font-bold btn btn-outline hover:bg-customColor">Explore</button>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

