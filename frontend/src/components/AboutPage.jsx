import img1 from "/house1.avif";
import img2 from "/house2.avif";
import img3 from "/house3.avif";

import feature1 from "/fea1.avif";
import feature2 from "/fea2.avif";
import feature3 from "/fea3.avif";
import feature4 from "/fea7.avif";

const features = [
  {
    title: "Buy a Home",
    description: "Find your dream home from thousands of verified listings with trusted sellers and complete transparency.",
    image: img1,
  },
  {
    title: "Sell a Property",
    description: "List your property easily and reach potential buyers through our optimized marketing and outreach tools.",
    image: img2,
  },
  {
    title: "Rent a Home",
    description: "Discover budget-friendly rental properties in prime locations with flexible options tailored for your lifestyle.",
    image: img3,
  },
];

const ImgGallery = [
  { id: 1, image: feature1 },
  { id: 2, image: feature2 },
  { id: 3, image: feature3 },
  { id: 4, image: feature4 },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="text-center py-12 px-6 bg-gradient-to-r from-blue-800 to-indigo-800 text-white rounded-b-3xl shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to HouseSelling</h1>
        <p className="text-lg max-w-2xl mx-auto">
          The smartest way to buy, sell, or rent property. Trusted by thousands of users nationwide.
        </p>
      </div>

      {/* Mission Section */}
      <div className="px-6 md:px-12 max-w-6xl mx-auto mt-12">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center mb-10">
          At <span className="font-semibold text-blue-800">HouseSelling</span>, we aim to simplify the real estate experience
          for everyone. Our platform provides secure, seamless, and smart solutions to help you find or list properties with ease.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 px-6 md:px-12 max-w-7xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-blue-800 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16 mt-20 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Why Choose HomeNest?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <div className="text-5xl mb-4 text-indigo-600">🏠</div>
            <h4 className="text-xl font-semibold mb-2">Verified Listings</h4>
            <p className="text-gray-600">Only genuine properties with verified documentation and up-to-date information.</p>
          </div>
          <div>
            <div className="text-5xl mb-4 text-indigo-600">⚡</div>
            <h4 className="text-xl font-semibold mb-2">Fast & Easy</h4>
            <p className="text-gray-600">List or find a property in just a few clicks, from your mobile or desktop.</p>
          </div>
          <div>
            <div className="text-5xl mb-4 text-indigo-600">🔒</div>
            <h4 className="text-xl font-semibold mb-2">Secure Platform</h4>
            <p className="text-gray-600">End-to-end encryption and privacy-first design ensure your data is always protected.</p>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto mt-16 mb-20">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Our Featured Properties</h2>
        <p className="text-center text-gray-600 mb-10">
          Explore a hand-picked selection of our most attractive and in-demand listings.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ImgGallery.map((fea) => (
            <img
              key={fea.id}
              src={fea.image}
              alt={`Featured property ${fea.id}`}
              className="rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
