"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  type User = { username: string; role: string } | null;
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Assuming your API has a logout endpoint that clears the session
      await axios.post("/api/users/logout");
      // Clear the user state and redirect to the home page
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Use useEffect to fetch user data and handle redirection
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/read");
        const userData = response.data.user;
        setUser(userData);

        if (userData && userData.role) {
          // Redirect the user to the appropriate dashboard based on their role
          const dashboardPath = `/${userData.role}Dashboard/${userData.username}`;
          if (pathname !== dashboardPath) {
            router.push(dashboardPath);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router, pathname]);

  return (
    <nav className="bg-emerald-950 text-white shadow-xl transition-shadow duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-3xl">🌱</span>
          <span className="self-center text-2xl font-bold whitespace-nowrap text-lime-300 transition-colors duration-300 hover:text-white">AgriTrace</span>
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-emerald-700 rounded-lg bg-emerald-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-emerald-950">
            <li>
              <a onClick={() => router.push('/')} className="block py-2 px-3 text-white rounded-sm transition-colors duration-200 hover:text-lime-300 cursor-pointer">Home</a>
            </li>
            {loading ? (
              <li>
                <span className="block py-2 px-3 text-gray-400">Loading...</span>
              </li>
            ) : user ? (
              <>
                <li>
                  <a onClick={() => router.push(`/${user.role}Dashboard/${user.username}`)} className="block py-2 px-3 text-white rounded-sm transition-colors duration-200 hover:text-lime-300 cursor-pointer">Dashboard</a>
                </li>
                <li className="flex items-center">
                  <span className="py-2 px-3 text-white">Welcome, {user.username}!</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-lime-600 rounded-full hover:bg-lime-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a onClick={() => router.push('/login')} className="px-4 py-2 text-sm font-medium text-white bg-lime-600 rounded-full hover:bg-lime-700 transition-colors duration-200 cursor-pointer">
                    Login
                  </a>
                </li>
                <li>
                  <a onClick={() => router.push('/signup')} className="px-4 py-2 text-sm font-medium text-white bg-lime-600 rounded-full hover:bg-lime-700 transition-colors duration-200 cursor-pointer">
                    Sign up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
