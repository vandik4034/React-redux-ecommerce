import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {

      const response = await axios.post('/api/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        alert("Login successful");
        onLoginSuccess(response.data.user);
        navigate("/"); // Redirect to the dashboard or any other page
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid email or password");
    }
  };



  return (
    <div className="max-w-md mx-auto bg-slate-600 rounded-xl w-full  shadow dark:border md:mt-0 sm:max-w-md xl:p-12 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl mb-4 text-center font-bold w-full mb-4text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold ml-2  mb-2 text-sm  text-gray-900 dark:text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
