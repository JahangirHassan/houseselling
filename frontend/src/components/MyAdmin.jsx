import React from "react";
import { Link } from "react-router-dom";
import img1 from "/user1.avif";
import img2 from "/user6.avif";
import img3 from "/user7.avif";

const UserArray = [
  { id: 1, img: img1, name: "Salan Jamshaid", address: "Bahawalpur" },
  { id: 2, img: img2, name: "Ustad Hameed", address: "Sialkot" },
  { id: 3, img: img3, name: "Abdul Muhaimin", address: "Islamabad" },
];

const MyAdmin = () => {
  return (
    <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
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
            to="listings"
            className="block hover:text-blue-200 transition text-center md:text-left"
          >
            All Products
          </Link>
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UserArray.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="h-64 overflow-hidden rounded-t-xl">
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-blue-600 text-white text-center py-5 rounded-b-xl">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm opacity-90">{user.address}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyAdmin;
