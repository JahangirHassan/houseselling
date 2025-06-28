import React, { useEffect, useState } from "react";
import axios from "axios";

const SalesSummary = () => {
  const [salesSummary, setSalesSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:8080/summary"); // change if different port
        setSalesSummary(res.data);
      } catch (err) {
        console.error("Error fetching sales summary:", err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="grow ml-16 md:ml-64 h-full bg-gray-100 text-gray-900 p-4">

      {/* === Sales Summary Stats === */}
      <h2 className="text-2xl font-bold mb-4">Sales Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {salesSummary.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-700">
              <strong>Total Sold:</strong> {item.totalSold}
            </p>
            <p className="text-gray-700">
              <strong>Total Revenue:</strong> ${item.totalRevenue.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesSummary;
