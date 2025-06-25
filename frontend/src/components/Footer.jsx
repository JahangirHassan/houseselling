import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto flex justify-center items-center">
      <div className="container mx-auto px-4 flex flex-col justify-center items-center">
        <div className="">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} House Finder. All Rights Reserved.</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Follow us on:</p>
          <div className="flex justify-center space-x-6 mt-2">
            <a href="https://facebook.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="https://twitter.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://instagram.com" className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
