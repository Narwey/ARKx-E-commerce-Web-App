import React, { useState } from "react";
import NavBar from './Home/NavBar'
import Footer from './Home/Footer'

const Login = () => {
  const [login, setLogin] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
<>
    <NavBar/> 
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-serif">
      <form
        className="w-[40%] shadow-lg rounded-lg px-8 pt-6 pb-8 bg-backgroundColor"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-2xl font-bold">Sign In</h1>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            User name or Email address
          </label>
          <input
            onChange={handleLogin}
            name="username"
            type="text"
            placeholder="Enter username"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            onChange={handleLogin}
            name="password"
            type="password"
            placeholder="Enter password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <a href="#" className="text-gray-700 block mb-2 ">
            Forgot your password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-buttonColor"
        >
          Sign In
        </button>
        <div class="inline-flex items-center justify-center w-full">
          <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
            or
          </span>
        </div>
        <button
          type="button"
          class="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 me-2 -ms-1"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <linearGradient
              id="a"
              gradientTransform="matrix(0 -54.944 -54.944 0 23.62 79.474)"
              gradientUnits="userSpaceOnUse"
              x2="1"
            >
              <stop offset="0" stop-color="#ff1b2d" />
              <stop offset=".3" stop-color="#ff1b2d" />
              <stop offset=".614" stop-color="#ff1b2d" />
              <stop offset="1" stop-color="#a70014" />
            </linearGradient>
            <linearGradient
              id="b"
              gradientTransform="matrix(0 -48.595 -48.595 0 37.854 76.235)"
              gradientUnits="userSpaceOnUse"
              x2="1"
            >
              <rect
                width="80"
                height="80"
                fill="white"
                transform="translate(0.519043 0.132812)"
              />{" "}
              <stop offset="0" stop-color="#9c0000" />
              <stop offset=".7" stop-color="#ff4b4b" />
              <stop offset="1" stop-color="#ff4b4b" />
            </linearGradient>
            <g transform="matrix(1.3333 0 0 -1.3333 0 107.2)">
              <path
                d="m28.346 80.398c-15.655 0-28.346-12.691-28.346-28.346 0-15.202 11.968-27.609 26.996-28.313.44848-.02115.89766-.03314 1.3504-.03314 7.2574 0 13.876 2.7289 18.891 7.2137-3.3227-2.2036-7.2074-3.4715-11.359-3.4715-6.7504 0-12.796 3.3488-16.862 8.6297-3.1344 3.6999-5.1645 9.1691-5.3028 15.307v1.3349c.13821 6.1377 2.1683 11.608 5.302 15.307 4.0666 5.2809 10.112 8.6297 16.862 8.6297 4.1526 0 8.038-1.2679 11.361-3.4729-4.9904 4.4643-11.569 7.1876-18.786 7.2144-.03596 0-.07122.0014-.10718.0014z"
                fill="url(#a)"
              />
              <path
                d="m19.016 68.025c2.6013 3.0709 5.9607 4.9227 9.631 4.9227 8.2524 0 14.941-9.356 14.941-20.897s-6.6891-20.897-14.941-20.897c-3.6703 0-7.0297 1.851-9.6303 4.922 4.0659-5.2809 10.111-8.6297 16.862-8.6297 4.1519 0 8.0366 1.2679 11.359 3.4715 5.802 5.1906 9.4554 12.735 9.4554 21.133 0 8.397-3.6527 15.941-9.4533 21.131-3.3234 2.205-7.2088 3.4729-11.361 3.4729-6.7504 0-12.796-3.3488-16.862-8.6297"
                fill="url(#b)"
              />
            </g>
          </svg>
          Connect with Google
        </button>
      </form>
    </div>
    </>
  );
};

export default Login