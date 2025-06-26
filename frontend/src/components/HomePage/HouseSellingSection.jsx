import React,{useEffect} from 'react';

const HouseSellingSection = () => {

  
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
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center ">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sell Your Home With Confidence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make selling your property simple, fast, and profitable with our innovative approach.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Trusted Expertise</h3>
            <p className="text-gray-600">
              Our team of experienced professionals will guide you through every step of the selling process.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Maximum Value</h3>
            <p className="text-gray-600">
              We use advanced market analysis to ensure you get the best possible price for your property.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast Process</h3>
            <p className="text-gray-600">
              Our streamlined selling process gets your property on the market quickly and sold faster.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
};

export default HouseSellingSection;