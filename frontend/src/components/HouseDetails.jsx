import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext"; // Import useCart context
import { AuthContext } from "../context/AuthContext";

const HouseDetails = () => {
  const { id } = useParams(); // Retrieve the house ID from the URL
  const navigate = useNavigate();
  const { addToCart, getUserId } = useCart(); // Get addToCart function from CartContext
  const [house, setHouse] = useState(null); // State to store house details
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [ownerId, setOwnerId] = useState(""); // State to store owner ID
  const [showPopup, setShowPopup] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  console.log("id:", id);
  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/listings/${id}`
        );
        setHouse(response.data); // Set house details to state
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch house details");
        setLoading(false);
      }
    };

    // Set ownerId using getUserId from context
    const currentUserId = getUserId();
    if (currentUserId) {
      setOwnerId(currentUserId);
    }

    fetchHouseDetails();
  }, [id, getUserId]);

  // Handle "Add to Cart" button click
  const handleAddToCart = () => {
    const ownerId = getUserId();

    if (!ownerId) {
      alert("User is not logged in. Please log in to add items to your cart.");
      return;
    }
    addToCart({
      productId: house._id, // Assuming the house has an _id field
      name: house.title, // House title as the name
      price: house.price,
      quantity: 1,
      image: house.image.url, // Image URL
      userId: ownerId, // Replace with actual user ID
    });

    // Show popup
    setShowPopup(true);

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // Handle "Edit" button click
  const handleEditClick = () => {
    navigate(`/edit-house/${id}`, { state: house }); // Navigate to edit page with house details
  };

  // Handle "Delete" button click
  const handleDeleteClick = async () => {
    try {
      // Confirm deletion
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this listing?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:8080/listings/${id}`);
        alert("House listing deleted successfully!");
        navigate("/"); // Redirect to the home page after successful deletion
      }
    } catch (err) {
      console.error("Error deleting house listing:", err);
      alert("Failed to delete the house listing. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={house.image.url}
            alt={house.title}
            className="w-full sm:h-80 h-[210px] object-cover rounded-lg shadow-lg"
          />
        </div>
        {/* Details Section */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800">{house.title}</h1>
          <p className="text-gray-500 mt-2">{house.location}</p>
          <p className="text-blue-500 font-semibold text-xl mt-4">
            {house.price}
          </p>
          <p className="text-gray-700 mt-4">{house.description}</p>

          {/* Add to Cart Button */}
          {isLoggedIn ? (
            <button
              onClick={handleAddToCart}
              className="mt-6 px-6 py-3 ml-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          ) : (
            <p className="mt-6 text-red-500 font-semibold">
              You should be logged in to add products to cart.
            </p>
          )}

          {/* Edit and Delete Buttons */}
          <div className="mt-6 flex gap-4">
            {ownerId === house.owner?._id && (
              <>
                <button
                  onClick={handleEditClick}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          House added to cart successfully!
        </div>
      )}
    </div>
  );
};

export default HouseDetails;
