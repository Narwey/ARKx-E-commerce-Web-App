import React, { useEffect, useState } from "react";
import Cards from "../../Components/Cards";
import { FaFilter } from "react-icons/fa";
import NavBar from "../Home/NavBar";
import Footer from "../Home/Footer";

import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { IoChevronDown, IoClose, IoFunnel } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiMiniSquares2X2 } from "react-icons/hi2";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Products = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("Most Popular");
  const [subcategories, setSubcategories] = useState([]);
  console.log("searchQuery",searchQuery);
  

  const fetchCategories = async () => {
    try {
      
      const response = await fetch("http://localhost:4000/v1/categories");
      const categoryData = await response.json();
      console.log("categoryData", categoryData);
      setCategories(categoryData.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // Fetch data from the backend
  const fetchSubcategories = async () => {
    try{
      const response = await fetch("http://localhost:4000/v1/subcategories");
      const subcategoryData = await response.json();
      console.log("subcategoryData", subcategoryData);
      
      // console.log("filteredSubcategories", filteredSubcategories);
      
      setSubcategories(subcategoryData.data);

    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } };


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/v1/products");
      const data = await response.json();
      // console.log("data", data);
      
      setProducts(data);
      setFilteredItems(data); // Initially, display all items
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchSubcategories();
  }, []);
  // Callback function to handle search query from NavBar
  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  // const filterProductsByCategory = (categoryValue) => {
  //   const filtered = menu.filter((item) => item.category.toLowerCase() === categoryValue.toLowerCase());
  //   setFilteredItems(sortItems(filtered, sortOption, false));
  //   setCurrentPage(1);
  // };
  const filterProductsByCategory = (id) => {
    // console.log("Clicked category ID:", id); 

    const filtered = products.filter(
      (item) => item.subcategory.category._id === id
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };
  const filterProductsBySubcategory = (id)=> {
    // console.log("Clicked subcategory ID:", id); 

    const filtered = products.filter(
      (item) => item.subcategory._id === id
    );
    // console.log("filtered", filtered)
    setFilteredItems(filtered);
    setCurrentPage(0);
  };

  // console.log("filteredItems", filteredItems);

  // New function for sorting items
  const sortItems = (items, sortOption) => {
    if (sortOption === "Most Popular") {
      return [...items].sort((a, b) => a.popularity - b.popularity);
    } else if (sortOption === "Best Rating") {
      return [...items].sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "Newest") {
      return [...items].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOption === "Price: Low to High") {
      return [...items].sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      return [...items].sort((a, b) => b.price - a.price);
    }
    return items;
  };

  // Update the filtered items when the sort option changes
  useEffect(() => {
    setFilteredItems(sortItems(filteredItems, sortOption));
  }, [sortOption]);

  // // Pagination logic
  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // // Calculate the range of items to display on the current page
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageRange = 3;

  const indexOfFirstItem = currentPage * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Search
  

    // const handleSearch = (e) => {

    //   const query = e.target.value;
    //   console.log("query", query);
    //   setSearchQuery(query);
    // };

  const handleSortChange = (value) => {
    if (value === "Sort by...") {
      setSortOption("");
    } else {
      setSortOption(value);
    }
  };

  return (
    <>
      <NavBar setItem = {setFilteredItems} page={setCurrentPage} />

      {/* filter component */}

      <div className="bg-backgroundColor">
        <div>
          {/* Mobile filter dialog */}
          {/* <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-backgroundColor py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-backgroundColor p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <IoClose className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    {/* <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul
                        role="list"
                        className="px-2 py-3 font-medium text-gray-900"
                      >
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center end bg-backgroundColor px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <FiMinus
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <FiPlus
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>  */}

          {/* Sort dropdown
           <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <FaFilter className="h-6 w-6 mr-2" />
              <span>Sort by:</span>
            </div>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center text-gray-400 hover:text-gray-500">
                    <span>{sortOption}</span>
                    <IoChevronDown className="h-5 w-5" />
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <ul>
                      {sortOptions.map((option) => (
                        <li key={option.name} onClick={() => handleSortChange(option.name)}>
                          {option.name}
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div> */}

          {/* desktop filter dialog */}
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-end pb-6 pt-20">
              {/* <h1 className="text-4xl font-bold tracking-tight text-yellow-900 font-primary">New Arrivals</h1> */}

              <div className="flex items-center">
                {/* nav bar filter */}

                <Menu as="div" className="relative inline-block text-left">   
                  {/* sort icon */}

                  <div>
                    <Menu.Button
                      className="group inline-flex justify-center text-sm font-medium font-primary text-gray-700 hover:text-gray-900"
                      id="sort"
                      onChange={(e) => handleSortChange(e.target.value)}
                      value={sortOption}
                    >
                      Sort
                      <IoChevronDown
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  {/* sort options */}

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                onClick={() => handleSortChange(option.name)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/* grid view */}

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <HiMiniSquares2X2 className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <IoFunnel className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
                {/* Filters */}
                <form className="hidden lg:block lg:col-span-2">
                  

                  <Disclosure
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Categories
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <FiMinus
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <FiPlus
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-1">
                            {categories.map((option, optionIdx) => (
                              <div
                                key={optionIdx}
                                className="flex items-center hover:bg-[#e7d5ce4f] cursor-pointer py-2"
                                onClick={() => filterProductsByCategory(option._id)}
                              >
                                {/* <input
                                  id={`filter-${optionIdx}`}
                                  name={`${option._id}`}
                                  defaultValue={option._id}
                                  type="checkbox"
                                  // defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                /> */}
                                <label
                                  htmlFor={`filter-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600 cursor-pointer "
                                >
                                  {option.categoryName}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <h3 className="sr-only">Subcategories</h3>
                  <ul
                    role="list"
                    className=" mt-4 space-y-1 border-b border-gray-200 pb-6 text-sm font-medium text-gray-700 "
                  >{subcategories.map((subcategory) => (
                    <li
                      key={subcategory._id}
                      className="hover:bg-[#e7d5ce4f] cursor-pointer px-4 py-2"
                      onClick={() => filterProductsBySubcategory(subcategory._id)}
                    >
                      {subcategory.subcategoryName}
                    </li>
                  ))}

                  </ul>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-10">
                  <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
                    {currentItems.map((item) => (
                      <Cards key={item._id} item={item} />
                    ))}
                  </div>
                </div>

               
              </div>
               {/* Pagination */}
               <div className="join flex justify-center w-[100%]">
               {Array.from({ length: pageRange }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </button>
        ))}
                </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
