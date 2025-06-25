import { FaHome, FaDollarSign, FaKey } from "react-icons/fa";

const features = [
  {
    icon: <FaHome className="text-5xl text-blue-600 mx-auto mb-4" />,
    title: "Buy Property",
    desc: "Explore thousands of verified homes ready for sale.",
  },
  {
    icon: <FaDollarSign className="text-5xl text-green-600 mx-auto mb-4" />,
    title: "Sell Property",
    desc: "Reach buyers fast & get the best value for your house.",
  },
  {
    icon: <FaKey className="text-5xl text-yellow-600 mx-auto mb-4" />,
    title: "Rent Property",
    desc: "Affordable rentals that fit your lifestyle & budget.",
  },
];

export default function Features() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center">
      {features.map((f, idx) => (
        <div
          key={idx}
          className="hover:scale-105 transition-transform duration-300 bg-white rounded-xl shadow-md p-6"
        >
          {f.icon}
          <h3 className="text-xl font-bold">{f.title}</h3>
          <p className="text-gray-600">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
