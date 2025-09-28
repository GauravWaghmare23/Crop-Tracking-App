"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  type User = { username: string; role: string } | null;
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/read");
        const userData = response.data.user;
        setUser(userData);
        if (userData && userData.role) {
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
    <nav className="bg-emerald-900 text-lime-300 shadow-2xl sticky top-0 z-50 backdrop-blur-sm backdrop-saturate-150 transition-all duration-300">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse select-none"
          aria-label="AgriTrace Home"
        >
          <span className="text-4xl animate-pulse select-none">🌱</span>
          <span className="text-2xl font-extrabold text-lime-400 hover:text-lime-200 transition-colors duration-300">
            Nirikshak
          </span>
        </a>

        {/* Menu Toggle (Mobile) */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 text-lime-400 rounded-lg hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-lime-300 md:hidden transition-all duration-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle menu"
        >
          {!isOpen ? (
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            /* Close Icon */
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 bg-emerald-800 md:bg-transparent border border-emerald-700 rounded-lg md:border-0 p-4 md:p-0">
            <NavItem label="Home" onClick={() => router.push("/")} />

            {loading ? (
              <li className="py-2 px-3 text-lime-400">Loading...</li>
            ) : user ? (
              <>
                <NavItem
                  label="Dashboard"
                  onClick={() =>
                    router.push(`/${user.role}Dashboard/${user.username}`)
                  }
                />
                <li className="py-2 px-3 text-lime-300 font-medium select-text">
                  Hello, {user.username}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm bg-lime-600 hover:bg-lime-700 rounded-full transition-colors duration-200"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <NavItem label="Scan" onClick={() => router.push("/allData")} />
                <NavItem
                  label="Login"
                  onClick={() => router.push("/login")}
                  isButton
                />
                <NavItem
                  label="Sign Up"
                  onClick={() => router.push("/signup")}
                  isButton
                />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavItem({
  label,
  onClick,
  isButton = false,
}: {
  label: string;
  onClick: () => void;
  isButton?: boolean;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`block w-full text-left py-2 px-4 rounded-lg transition-all duration-200 ${
          isButton
            ? "bg-lime-600 text-white hover:bg-lime-700"
            : "hover:text-lime-300 text-lime-300"
        }`}
      >
        {label}
      </button>
    </li>
  );
}

export default Navbar;
