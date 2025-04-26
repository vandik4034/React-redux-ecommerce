import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
        name,
      });

      if (response.data.message === "Sign Up Successful") {
        alert("Sign Up Successful");
        navigate("/login");
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
    <div className="max-w-md  mx-auto bg-slate-600 rounded-xl w-full p-4 shadow dark:border md:mt-0 sm:max-w-md xl:p-12 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl text-center font-bold w-full mb-4  leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create An Account</h2>
      <form onSubmit={handleSubmit}>

      <div className="mb-4">
          <label htmlFor="email" className="block font-bold ml-2  mb-2 text-sm  text-gray-900 dark:text-white">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your first name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-bold ml-2  mb-2 text-sm  text-gray-900 dark:text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold ml-2 mb-2 text-sm  text-gray-900 dark:text-white">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
}

export default SignUp;
