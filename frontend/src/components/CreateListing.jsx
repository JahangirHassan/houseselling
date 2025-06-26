import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateListingForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getUserId } = useCart();
  const ownerId = getUserId();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.location ||
      !formData.country ||
      !image
    ) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const data = new FormData();
    data.append("listing[title]", formData.title);
    data.append("listing[description]", formData.description);
    data.append("listing[price]", formData.price);
    data.append("listing[location]", formData.location);
    data.append("listing[country]", formData.country);
    data.append("listing[image]", image);
    data.append("owner", ownerId);

    try {
      const response = await axios.post(
        "http://localhost:8080/listings",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          title: "",
          description: "",
          price: "",
          location: "",
          country: "",
        });
        setImage(null);
        
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setError("Failed to create listing. Please try again.");
      console.log("error occur", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className=" grow ml-16 md:ml-64 h-full lg:h-screen  min-h-screen bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-4xl w-full p-8 rounded-lg shadow-lg mt-4 mb-4"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create New Listing
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow-lg text-center mb-4">
            New Listing Created Successfully!
          </div>
        )}

        {/* Form Fields */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Listing Title"
              required
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Listing Price"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex-1">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Listing Location"
              required
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Country"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Listing Description"
            rows={4}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        >
          {loading ? "Creating Listing..." : "Create Listing"}
        </button>
      </form>
    </div>
  );
}

export default CreateListingForm;
