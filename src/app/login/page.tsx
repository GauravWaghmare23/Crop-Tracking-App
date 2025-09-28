"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await axios.post("/api/users/login", formData);
      setMessage("Login successful!");
      console.log("User logged in:", response.data);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-100 to-emerald-50 p-6">
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl p-10">
        <h1 className="text-center text-3xl font-extrabold text-emerald-900 mb-8 select-none">
          Log in to Your Account
        </h1>

        {message && (
          <div
            className={`p-4 mb-6 rounded-md text-center font-semibold ${
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
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-50 transition-colors duration-300"
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-emerald-800 select-none">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-emerald-600 hover:underline hover:text-emerald-700 transition-colors duration-200"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-emerald-300 px-3 py-2 bg-white text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow duration-200"
      />
    </div>
  );
}
