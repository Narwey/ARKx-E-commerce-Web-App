import React, { useState  } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Modal() {
  
    const navigate = useNavigate()
    const [Login , setLogin] = useState({username:'',password:''})
    const handleLogin = (e) => {
        setLogin({...Login , [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:4000/v1/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Login),
        })
          .then((res) => res.json())
          .then((data) => localStorage.setItem("data" , JSON.stringify(data)));
        navigate('/landingPage');
          
    }

  return (
    

    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle " style={{ backgroundImage: `url('https://images.pexels.com/photos/5709869/pexels-photo-5709869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`}}>
      <div className="modal-box bg-backgroundColor ">
        <div className="modal-action flex flex-col justify-center mt-0 ">
          <form onSubmit={handleSubmit} className="card-body bg-backgroundColor">
            <h1 className="mb-6 text-2xl font-bold font-primary">Sign In</h1>
            {/* Username/Email field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username/Email</span>
              </label>
              <input
                onChange={handleLogin}
                type="text"
                name="username" // Ensure the 'name' attribute matches the state key
                placeholder="Username or Email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                onChange={handleLogin}
                type="password"
                name="password" // Ensure the 'name' attribute matches the state key
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <a href="#" className="text-[15px] mt-1 font-primary ">Forgot Password?</a>
            </div>

            {/* Submit button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="SIGN IN"
                className="btn bg-customColor text-yellow-900 font-primary"
              />
            </div>
          </form>
          <p className="text-center my-2 font-primary">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="underline text-yellow-900 ml-1 font-primary"
            >
              SIGN UP
            </Link>{" "}
          </p>
          <button
            htmlFor="my_modal_5"
            onClick={() => document.getElementById("my_modal_5").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <div className="text-center space-x-3 mb-5">
            <button className="btn btn-circle hover:bg-customColor hover:text-white">
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-customColor hover:text-white">
              <FaFacebookF />
            </button>
          </div>
        </div>
      </div>
    </dialog>
      
  );
}

export default Modal;
