import React from "react";
import flower from "../../Assets/Pictures/flower2.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="bg-[#FFFCF9] pt-[5rem] px-4 lg:px-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="text-yellow-900 sm:col-span-1">
          <div className="text-yellow-900 text-[23px] font-normal font-primary leading-[54.22px]">
            MORE INFO
          </div>
          <div className="self-stretch h-[171px] flex-col justify-center items-start gap-[5px] inline-flex relative top-2">
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="#">Term and Conditions</a>
            </div>
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="#">Privacy Policy</a>
            </div>
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px] ">
              <a href="#">Shipping Policy</a>
            </div>
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="#"> Sitemap</a>
            </div>
          </div>
        </div>

        <div className="text-yellow-900 sm:col-span-1 relative top-[0.5rem]">
          <div className="text-yellow-900 text-[23px] font-normal font-primary">
            CUSTOMER CARE
          </div>
          <div className="self-stretch h-[215px] pb-11 flex-col justify-start items-start gap-[5px] inline-flex relative top-4">
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="#">Contact Us</a>
            </div>
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="#">Returns & Refunds</a>
            </div>
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="#">FAQ's</a>
            </div>
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="#">Career</a>
            </div>
          </div>
        </div>

        <div className="text-yellow-900 sm:col-span-1">
          <div className="text-yellow-900 text-[23px] font-normal font-primary leading-[54.22px]">
            HANDMADE HAVEN
          </div>
          <div className="self-stretch h-[215px] pb-11 flex-col justify-start items-start gap-[5px] inline-flex relative top-2">
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="/">Home</a>
            </div>
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="/about">About Us</a>
            </div>
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="#">Team</a>
            </div>
            <div className="text-yellow-900 text-lg font-normal font-primary leading-[39.04px]">
              <a href="#">Collaboration</a>
            </div>
          </div>
        </div>

        <div className="text-yellow-900 lg:col-span-1 flex flex-col justify-center items-center relative top-[-5rem]">
          <p className="text-[23px] font-normal font-primary mb-4">
            SOCIAL MEDIA
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a href="#"><FontAwesomeIcon icon={faXTwitter} className="w-10 h-10" /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} className="w-10 h-10" /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebook} className="w-10 h-10" /></a>
          </div>
        </div>
      </div>

      {/* Flower image */}
      <img
        src={flower}
        alt="flower"
        className="w-full lg:w-auto lg:h-48 lg:absolute lg:bottom-0 lg:right-0"
      />
    </div>
  );
}

export default Footer;
