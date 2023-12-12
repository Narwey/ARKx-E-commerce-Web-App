
import React, {useState} from 'react';
import Hearts from '../Assets/Pictures/hearts.png';
import flower from '../Assets/Pictures/flower.png';
import Bg from '../Assets/Pictures/bg.svg';
import { VscSend } from "react-icons/vsc";

function SpecialOffer() {

   
    const [email, setEmail] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:3000/v1/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
  
        if (response.ok) {
          // Reset the form after successful submission
          setEmail('');
          // Optionally, show a success message to the user
          console.log('Email submitted successfully!');
        } else {
          throw new Error('Failed to submit email');
        }
      } catch (error) {
        console.error('Error submitting email:', error);
        // Optionally, show an error message to the user
      }
    };
  
  return (
    <div className="h-[33rem] relative bg-[#CBAFA4]">
      <div className="absolute inset-0 bg-[#CBAFA4]"></div>
      <img className="w-full md:w-[50%] lg:w-[50%] absolute left-1/2 top-1/4 transform -translate-x-1/2" src={Bg} alt="Background" />
      <div className="w-[90%] md:w-[588px] h-[50px] absolute top-[31%] md:top-176px left-1/2 transform -translate-x-1/2 text-center text-yellow-900 text-4xl md:text-5xl font-normal font-primary">SPECIAL OFFER</div>
      <div className="w-[90%] md:w-[922.81px] h-[30.89px] absolute top-2/3 md:top-[318.94px] left-1/2 transform -translate-x-1/2 text-white text-xl md:text-2xl font-normal font-primary">Join the list to be the first to hear about new arrivals, sales, and special offers!</div>
      <form onSubmit={handleSubmit} >
        <input
          type='email'
          value={email}
          onChange={handleEmailChange}
          className=" outline-none w-[90%] md:w-[715.85px] absolute top-[50%] md:top-[413.68px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[15px] p-3 text-lg md:text-xl font-primary"
          placeholder='Email'
          required
        />
        <button type="submit" className="block mt-2 md:absolute md:bottom-0 md:right-0 md:transform md:translate-y-0 md:translate-x-0">
          <VscSend className='text-2xl md:text-3xl absolute left-[-21rem] top-[-8rem]' />
        </button>
      </form>
      <div className="w-[90%] md:w-[374.92px] h-[92.68px] absolute top-[13%] md:top-64px left-1/2 transform -translate-x-1/2 text-white text-3xl md:text-4xl pl-[70px] font-normal font-primary ">showcase a </div>
      <img className="w-[10rem] md:w-[140.65px] h-[8rem] md:h-[105.37px] absolute left-[5%] md:left-0 top-[25%] md:top-[132.22px] origin-top-left rotate-[30deg] md:rotate-[-20.61deg]" src={Hearts} alt="Hearts" />
      <img className="h-[10rem] md:h-[15rem] left-[85%] md:left-[85%] top-[35%] md:top-[201.39px] absolute origin-top-left rotate-[20deg] md:rotate-[13.62deg]" src={flower} alt="Flower" />
    </div>
  );
}

export default SpecialOffer;
