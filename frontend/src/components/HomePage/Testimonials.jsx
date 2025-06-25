import { motion } from "framer-motion";
import { useState } from "react";
export const Testimonials = () => {
  const testimonials = [
    {
      quote: "Found our perfect home in just 2 weeks when other agents couldn't help in 6 months!",
      author: "Sarah & James K.",
      location: "Downtown Condo Buyers",
      image: "https://plus.unsplash.com/premium_photo-1677529496297-fd0174d65941?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVhbXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      quote: "Sold our property for 15% above market value with their innovative marketing approach.",
      author: "Michael T.",
      location: "Suburban Home Seller",
      image: "https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=jdNlxvWfyg_3TeA9YIc5g-bySd-gedAdnifCMFUvNII="
    },
    {
      quote: "The virtual tours saved us countless hours - we narrowed down to 3 homes before visiting any!",
      author: "The Rodriguez Family",
      location: "First-Time Buyers",
      image: "https://plus.unsplash.com/premium_photo-1661475916373-5aaaeb4a5393?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFtaWx5fGVufDB8fDB8fHww"
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-lg flex flex-col md:flex-row items-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <img 
                  src={testimonials[current].image} 
                  alt={testimonials[current].author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <blockquote className="text-xl italic text-gray-700 mb-6">
                  {testimonials[current].quote}
                </blockquote>
                <div>
                  <p className="font-bold text-gray-800">{testimonials[current].author}</p>
                  <p className="text-blue-600">{testimonials[current].location}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${current === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}