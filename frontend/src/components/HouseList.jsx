import React from "react";
import { useState, useEffect } from "react";
import HouseCard from "./HouseCard";
import axios from "axios";



const HouseList = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // Fetch house listings from the backend
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/listings'); // Adjust URL if needed
        setHouses(response.data); // Set the fetched houses in state
      } catch (err) {
        console.error("Error fetching house listings:", err);
      }
    };

    fetchHouses();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {houses.map((house) => (
        <HouseCard
          key={house._id}
          id={house._id}
          image={house.image.url}
          title={house.title}
          location={house.location}
          price={house.price}
          description={house.description}
          seller={house.owner}
        />
      ))}
    </div>
  );
};

export default HouseList;
