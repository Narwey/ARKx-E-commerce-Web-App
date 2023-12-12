import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { motion } from "framer-motion"
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const createUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (data) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const result = await createUser(email, password);
      // Handle success - user creation successful
      alert("Account creation successfully done!");
      document.getElementById("my_modal_5").close();
      // Navigate to a success page or perform other actions
    } catch (error) {
      // Handle error - user creation failed
      const errorMessage = error.message || "An error occurred";
      alert(errorMessage);
    }
  };


  return (
    <>
    <div className="m-[-82px] p-[39px] " style={{ backgroundImage: `url('https://images.pexels.com/photos/5709869/pexels-photo-5709869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`}} >
   <motion.div
      className="box"
      initial={{ opacity: 0,scale: 0.7 }}
      animate={{ opacity: 1 ,scale: 1}}
      transition={{ duration: 0.5 }}
    >
    <div className="max-w-md bg-backgroundColor shadow w-full mx-auto flex items-center justify-center my-20  rounded-2xl" >
      
      <div className="modal-action flex flex-col justify-center mt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-[25rem]">
          <h3 className="font-primary font-bold text-lg text-yellow-900">
            SIGN UP
          </h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
              className="input input-bordered"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="SIGN UP"
              className="btn bg-customColor text-yellow-900 font-primary"
            />
          </div>
          <p className="text-center my-2 font-primary">
            Already have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="underline text-yellow-900 ml-1 font-primary"
            >
              SIGN IN
            </button>{" "}
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
        
        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle hover:bg-customColor hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-customColor hover:text-white">
            <FaFacebookF />
          </button>
          {/* Add other social login options */}
        </div>
      </div>
      <Modal />
      </div>
    </motion.div>
    </div>
    {/* <Footer/> */}
    </>
  );
};

export default Signup;
