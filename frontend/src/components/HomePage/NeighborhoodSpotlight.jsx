import { useState } from "react";
import { motion } from "framer-motion";
export const NeighborhoodSpotlight = () => {
  const [activeArea, setActiveArea] = useState('downtown');
  
  const areas = {
    downtown: {
      name: "Downtown Core",
      avgPrice: "$850,000",
      growth: "+12% YoY",
      amenities: "5★ Dining, Cultural Centers, Business Hubs"
    },
    suburbs: {
      name: "Greenfield Suburbs",
      avgPrice: "$620,000",
      growth: "+8% YoY",
      amenities: "Top Schools, Parks, Family-Friendly"
    },
    waterfront: {
      name: "Waterfront District",
      avgPrice: "$1.2M",
      growth: "+18% YoY",
      amenities: "Marina Access, Luxury Living, Scenic Views"
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore <span className="text-blue-600">Neighborhoods</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the perfect location for your next home
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map Visualization */}
          <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden">
            <img 
              src="/city-map-vector.svg" 
              alt="City Map" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Interactive hotspots */}
            <button 
              onClick={() => setActiveArea('downtown')}
              className={`absolute top-1/2 left-1/4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeArea === 'downtown' ? 'bg-blue-600 scale-125' : 'bg-white'}`}
            >
              <span className={`w-2 h-2 rounded-full ${activeArea === 'downtown' ? 'bg-white' : 'bg-blue-600'}`}></span>
            </button>
            
            <button 
              onClick={() => setActiveArea('suburbs')}
              className={`absolute bottom-1/4 right-1/3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeArea === 'suburbs' ? 'bg-blue-600 scale-125' : 'bg-white'}`}
            >
              <span className={`w-2 h-2 rounded-full ${activeArea === 'suburbs' ? 'bg-white' : 'bg-blue-600'}`}></span>
            </button>
            
            <button 
              onClick={() => setActiveArea('waterfront')}
              className={`absolute top-1/3 right-1/4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeArea === 'waterfront' ? 'bg-blue-600 scale-125' : 'bg-white'}`}
            >
              <span className={`w-2 h-2 rounded-full ${activeArea === 'waterfront' ? 'bg-white' : 'bg-blue-600'}`}></span>
            </button>
          </div>
          
          {/* Area Details */}
          <motion.div 
            key={activeArea}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{areas[activeArea].name}</h3>
            <div className="flex items-center mb-6">
              <span className="text-blue-600 text-xl font-semibold mr-4">{areas[activeArea].avgPrice}</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{areas[activeArea].growth}</span>
            </div>
            <p className="text-gray-600 mb-6">{areas[activeArea].amenities}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300">
              View Listings
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}