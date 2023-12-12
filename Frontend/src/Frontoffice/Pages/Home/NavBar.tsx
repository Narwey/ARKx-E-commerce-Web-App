import React, { useState } from "react";
import logo from "../../Assets/Pictures/logo.png";
import { FaRegUser, FaSearch} from "react-icons/fa";
import { FaX, FaBars} from "react-icons/fa6";
import { MdOutlineShoppingCart,MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    link: "/",
  },
  {
    id: "about",
    title: "About",
    link: "/about",
  },
  {
    id: "Products",
    title: "Products",
    link: "/products",
  },
 
 
];

function NavBar({ onSearch : any}) {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the query to the parent component for filtering
  };

  return (
    <>
    <header className="navbar bg-backgroundColor h-[20px] border px-4">
      {/* Desktop Navigation */}
      <div className="navbar-start">
        <div className="hidden sm:flex ">
          {navLinks.map((nav, index) => (
            <Link
            to={nav.link}
            key={nav.id}
            className={`rounded-md px-3 py-2 text-sm font-medium text-yellow-900 hover:bg-customColor hover:text-white ${
              active === nav.title ? "text-white" : "text-brun"}`}
            onClick={() => setActive(nav.title)}
            >{nav.title}</Link>
          ))}

        </div>
      </div>

{/* Mobile Navigation */}
<div className="navbar-start sm:hidden">
          {
            toggle ? <FaX onClick={() => setToggle(!toggle)}/> : <FaBars onClick={() => setToggle(!toggle)} />
          }
       

        {/* Sidebar */}
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* center of  navbar */}
      <div className="navbar-center">
        <a href="/" className="w-[100px]">
          <img src={logo} alt="logo" className="object-cover relative " />
        </a>
      </div>

      <div className="navbar-end">
        <button className="btn btn-ghost btn-sm px-[5px]" >
        <MdOutlineSearch className="h-6 w-6 "
        onClick={()=>setSearchVisible(!searchVisible)}
        />
          
        </button>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm mr-2 mx-1 px-[5px]"
            >
              
              <MdOutlineShoppingCart className="h-6 w-6 " />
                
                
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg font-primary">8 Items</span>
                <span className="text-yellow-900 font-primary">
                  Subtotal: $999
                </span>
                <div className="card-actions">
                  <button className="btn btn-outline btn-block hover:bg-customColor font-primary" >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="flex items-center gap-2 rounded-lg px-6 bg-customColor text-white py-2"
        >
          {" "}
          <FaRegUser /> Login
        </button>
        <Modal />
      </div>
    </header>
    {searchVisible && <input type="text" placeholder="Search" className="outline-none w-[90%] md:w-[46rem] absolute  md:top-[8rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-backgroundColor rounded-[15px] p-2 text-lg md:text-xl font-primary"   value={searchQuery}
        onChange={handleSearch} />}
        </>
  );
}

export default NavBar;
