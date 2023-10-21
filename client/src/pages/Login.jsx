import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        return navigate("/home");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md p-2"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/register" className=" text-blue-500 no-underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
