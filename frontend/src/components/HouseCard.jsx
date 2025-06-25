import React from "react";
import { useNavigate } from "react-router-dom";

const HouseCard = ({ id, image, title, location, price, description, seller  }) => {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/house/${id}`, {
        state: { image, title, location, price, description, seller },
      });
    };
  

  return (
    <div className="max-w-xs mx-auto cursor-pointer w-full">
      <div className="relative group" onClick={handleClick}>
        {/* Fixed Image */}
        <div className="w-full h-48 overflow-hidden rounded-lg cursor-pointer">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <p className="text-white text-lg font-semibold">
            Explore Details →
          </p>
        </div>
      </div>
      {/* Content */}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500">{location}</p>
        <p className="text-blue-500 font-semibold mt-2">{price}</p>
      </div>
    </div>
  );
};

export default HouseCard;
