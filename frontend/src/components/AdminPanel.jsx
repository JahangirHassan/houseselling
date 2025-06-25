import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch users and listings on component mount
  useEffect(() => {
    fetchUsers();
    fetchListings();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchListings = async () => {
    try {
      const response = await axios.get("http://localhost:8080/listings");
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/listings/${id}`);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/users/${id}`,
        { role: newRole }
      );
      setUsers(users.map((user) => (user._id === id ? response.data : user)));
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // Handle "Edit" button click
  const handleEditClick = (id) => {
    const listingToEdit = listings.find((listing) => listing._id === id);
    if (listingToEdit) {
      navigate(`/edit-house/${id}`, { state: listingToEdit });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        className="block md:hidden mb-6 p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? "Close Menu" : "Open Menu"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Users Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>
          <div
            className={`space-y-4 ${isMobileMenuOpen ? "" : "hidden md:block"}`}
          >
            {users.map((user, index) => (
              <div
                key={user._id || `user-${index}`}
                className="border p-4 rounded-lg bg-white shadow flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                </div>
                <div className="space-y-2 w-full text-[15px] flex flex-col justify-center items-center">
                  <button
                    onClick={() =>
                      handleUpdateRole(
                        user._id,
                        user.role === "admin" ? "user" : "admin"
                      )
                    }
                    className="px-3 py-1 bg-green-600 text-white rounded-lg w-[70%] sm:w-1/2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg md:mt-0 mt-2 w-[70%] sm:w-1/2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Listings Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Listings</h2>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Add New Listing</h3>
            <Link
              to="/listing"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md"
            >
              Create Listing
            </Link>
          </div>
          <div
            className={`space-y-4 `}
          >
            {listings.map((listing, index) => (
              <div
                key={listing._id || `listing-${index}`}
                className="border p-4 rounded-lg bg-white shadow flex sm:flex-row flex-col justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Title:</strong> {listing.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {listing.description}
                  </p>
                  <p>
                    <strong>Price:</strong> ${listing.price}
                  </p>
                </div>

                <div className="edit-btns flex md:flex-row md:space-x-2 space-x-4 md:mt-0 mt-2 md:w-fit w-full">
                  <button
                    onClick={() => handleEditClick(listing._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg w-1/2 md:w-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg w-1/2 md:w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
