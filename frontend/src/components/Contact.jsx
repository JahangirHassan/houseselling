import React from 'react';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-white min-h-screen py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left Side: Contact Details */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug">
            Got a Project in Mind?
            <br />
            <span className="text-blue-700 text-2xl md:text-3xl mt-2 block">
              Let’s Make Something Great!
            </span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            I’m always open to discussing product design work or partnership opportunities. Fill out the form and I’ll get back to you!
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl text-blue-600" />
              <div>
                <p className="font-bold text-blue-600">Address</p>
                <p className="text-gray-700">89/9 Motijheel, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-2xl text-blue-600" />
              <div>
                <p className="font-bold text-blue-600">Phone</p>
                <p className="text-gray-700">+8801799568976</p>
                <p className="text-gray-700">+8801904015294</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-2xl text-blue-600" />
              <div>
                <p className="font-bold text-blue-600">Email</p>
                <p className="text-gray-700">support@abdul.com</p>
                <p className="text-gray-700">abdulbasetbappy@hotmail.com</p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { icon: <FaGithub />, color: 'bg-neutral-950', label: 'GitHub' },
              { icon: <FaLinkedin />, color: 'bg-blue-900', label: 'LinkedIn' },
              { icon: <FaFacebook />, color: 'bg-blue-700', label: 'Facebook' },
              { icon: <FaYoutube />, color: 'bg-red-800', label: 'YouTube' },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`group flex items-center gap-2 px-4 py-2 rounded-full text-white ${item.color} hover:opacity-90 transition`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <form>
            {['Name', 'Email', 'Phone', 'Message'].map((label) => (
              <div className="mb-5" key={label}>
                <label className="block text-gray-800 font-semibold mb-1">{label}</label>
                {label !== 'Message' ? (
                  <input
                    type={label.toLowerCase() === 'email' ? 'email' : 'text'}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                ) : (
                  <textarea
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none h-28"
                  ></textarea>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
