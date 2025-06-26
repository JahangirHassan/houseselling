
import React from "react";
import {
  FaUsers,
  FaBox,
} from "react-icons/fa";
import { Link } from "react-router-dom";


const SideBar=()=>{

          return(

           <div className="bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300">
      <h1 className="text-2xl font-bold hidden md:block mt-4 text-center italic">
        HouseSelling
      </h1>
      <ul className="flex flex-col mt-5 text-xl">
        <li
          className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600"
        >
          <FaUsers />
          <Link to=" " className="hidden md:inline ">Users</Link>
        </li>
        <li
          className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600"
        >
          <FaBox />
          <Link to="" className="hidden md:inline ">Add Product</Link>
        </li>
        <li
          className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600"
        >
          <FaBox />
          <Link to="/admin/listings" className="hidden md:inline ">All Products</Link>
        </li>
      </ul>

       {/* <aside className="w-full md:w-1/4 bg-blue-800 text-white px-6 py-8 shadow-lg">
         <h1 className="text-3xl font-bold mb-10 text-center md:text-left">
           HouseSelling
         </h1>
         <nav className="space-y-4 text-lg font-medium"> 
           <Link
             to=""
             className="block hover:text-blue-200 transition text-center md:text-left"
           >
             Users
           </Link>
           <Link
             to=""
             className="block hover:text-blue-200 transition text-center md:text-left"
           >
             Add New Product
           </Link>
           <Link
             to="/admin/listings"
             className="block hover:text-blue-200 transition text-center md:text-left"
           >
             All Products
           </Link>
        </nav>
      </aside> */}
      </div>
      )}

export default SideBar