// import React from 'react'

const features = [
  {
    title: "Buy a Home",
    description: "Find your dream home from thousands of verified listings.",
    image: "",
  },
  {
    title: "Sell a Property",
    description: "List your property easily and reach real buyers instantly.",
    image: "https://source.unsplash.com/300x200/?real-estate,sell",
  },
  {
    title: "Rent a Home",
    description: "Affordable rentals tailored to your lifestyle and budget.",
    image: "https://source.unsplash.com/300x200/?apartment,rent",
  },
]

export default function AboutPage() {
  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-800">About Our House Selling Platform</h1>
      <p className="text-lg text-gray-700 text-center mb-10">
        Our platform is built to connect property owners and buyers seamlessly. Whether youre selling, buying, or renting, we provide a modern, secure, and user-friendly experience.
      </p>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 group-hover:text-gray-800">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Gallery */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Featured Properties</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <img
              key={n}
              src={`https://source.unsplash.com/300x200/?home,house${n}`}
              alt={`home${n}`}
              className="rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
