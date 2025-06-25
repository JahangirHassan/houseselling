import React, { useState, useEffect, useContext } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, userRole } = useContext(AuthContext);

  // Logout handler
  const handleLogout = () => {
    axios
      .get("http://localhost:8080/logout", { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        console.log("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out", error);
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Main Navbar */}
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-blue-400">
            HouseFinder
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Contact Us
                </Link>
              </li>
              {isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/listing"
                      className="hover:text-blue-400 transition"
                    >
                      Create Listing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-listings"
                      className="hover:text-blue-400 transition"
                    >
                      Show My Listings
                    </Link>
                  </li>
                  {isLoggedIn && userRole === "admin" && (
                    <li>
                      <Link to="/admin" className="hover:text-blue-400 transition">
                        Admin Panel
                      </Link>
                    </li>
                  )}

                </>
              )}
            </ul>

            {/* Cart Button */}
            {isLoggedIn &&
              <Link
                to="/cart"
                className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h18M3 9h18M3 15h18M3 21h18"
                  />
                </svg>
                <span>Cart</span>
              </Link>
            }

            {/* Login/Signup or Logout Buttons */}
            <div className="space-x-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Burger Button for Mobile */}
          <button
            onClick={toggleSidebar}
            className="block md:hidden text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <ul className="mt-16 space-y-6 px-6">
          <li>
            <Link className="block hover:text-blue-400 transition" to="/">
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link
                  to="/listing"
                  className="block hover:text-blue-400 transition"
                >
                  Create Listing
                </Link>
              </li>
              <li>
                <Link
                  to="/my-listings"
                  className="block hover:text-blue-400 transition"
                >
                  Show My Listings
                </Link>
              </li>

              {isLoggedIn && userRole === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="block hover:text-blue-400 transition"
                  >
                    Admin Panel
                  </Link>
                </li>
              )}

              {/* Cart Button */}
              <Link
                to="/cart"
                className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h18M3 9h18M3 15h18M3 21h18"
                  />
                </svg>
                <span>Cart</span>
              </Link>
            </>
          )}

          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition mt-2 md:mt-0"
                >
                  Signup
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>

      {/* Background Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
