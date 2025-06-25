import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);  // AuthContext for logged in user
    const { getUserId } = useCart();  // CartContext for user ID (in case needed from cart context)
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the userId from CartContext if available, otherwise use AuthContext userId
    const currentUserId = getUserId() || userId;

    useEffect(() => {
        if (!currentUserId) return; // Ensure we have a valid userId before fetching listings

        const fetchListings = async () => {
            try {
                setLoading(true);  // Start loading state
                const response = await axios.get(`http://localhost:8080/listings/user/${currentUserId}`);
                setListings(response.data);  // Set listings data
            } catch (err) {
                if (err.response.data.message === "No listings found for this user.") {
                    setError(err.response.data.message);
                } else {
                    setError("Error fetching listings.");  // Set error state
                }
                console.log("Error fetching listings.");
            } finally {
                setLoading(false);  // Stop loading state
            }
        };

        fetchListings();
    }, [currentUserId]);  // Trigger effect when currentUserId changes

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-500">My Listings</h2>

            {loading && <p>Loading...</p>}  {/* Show loading text */}

            {/* Show error message only if there was an error fetching listings */}
            {error && !loading && <p className="text-red-500">{error}</p>}

            {/* Show "No listings found" only if there are no listings and no loading state */}
            {listings.length === 0 && !loading && !error ? (
                <p>No listings found.</p>  // Show no listings message when data is loaded and empty
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listings.map((listing) => (
                        <div key={listing._id} className="bg-white rounded-lg shadow p-4">
                            <img
                                src={listing.image?.url}
                                alt={listing.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h3 className="text-xl font-semibold mt-2">{listing.title}</h3>
                            <p className="text-gray-600">{listing.description}</p>
                            <p className="text-blue-500 font-semibold mt-1">${listing.price}</p>
                            <button
                                onClick={() => navigate(`/house/${listing._id}`)}
                                className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            >
                                See Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyListings;
