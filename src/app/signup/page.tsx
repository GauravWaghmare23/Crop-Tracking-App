"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "farmer",
    number: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/users/signup", formData);
      setMessage("Registration successful!");
      console.log("User registered:", response.data);
      // Backend handles redirect if needed
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
      setMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-100 to-emerald-50 p-6">
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-extrabold text-emerald-900 mb-8 text-center select-none">
          Create Your Account
        </h1>

        {message && (
          <div
            className={`p-4 mb-6 rounded-lg text-center text-sm font-semibold ${
              message.includes("successful")
                ? "bg-emerald-200 text-emerald-800"
                : "bg-red-200 text-red-700"
            } transition-colors duration-300`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            required
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
            autoComplete="new-password"
          />
          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-emerald-900 mb-1 select-none"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-md border border-emerald-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900 transition-shadow duration-200"
              required
            >
              <option value="farmer">Farmer</option>
              <option value="distributor">Distributor</option>
              <option value="retailer">Retailer</option>
            </select>
          </div>
          <InputField
            label="Phone Number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            type="tel"
            required
          />
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            type="text"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-50 transition-colors duration-300"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-emerald-800 mt-6 select-none">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-600 hover:underline hover:text-emerald-700 transition-colors duration-200"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-emerald-900 mb-1 select-none"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-emerald-300 px-3 py-2 bg-white text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
      />
    </div>
  );
}
