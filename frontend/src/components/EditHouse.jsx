import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditHouse = () => {
  const { state: house } = useLocation(); // Get house details from state
  const [formData, setFormData] = useState(house);
  const [imageFile, setImageFile] = useState(null); // State for handling file upload
  const navigate = useNavigate();

  // Handle text field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData object
      const form = new FormData();
      form.append("listing[title]", formData.title);
      form.append("listing[location]", formData.location);
      form.append("listing[price]", formData.price);
      form.append("listing[description]", formData.description);
      if (imageFile) {
        form.append("listing[image]", imageFile); // Append file if it exists
      }

      // Send data to the backend
      await axios.put(`http://localhost:8080/listings/${house._id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("House details updated successfully!");
      navigate(`/house/${house._id}`); // Navigate back to house details
    } catch (err) {
      console.error("Error updating house details:", err);
      alert("Failed to update house details. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit House Details</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHouse;
