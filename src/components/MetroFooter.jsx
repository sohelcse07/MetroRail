import React from "react";

const MetroFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      {/* Train SVG Animation */}
      <div className="relative overflow-hidden h-24">
        <svg
          className="absolute -top-8 left-0 w-full h-24"
          viewBox="0 0 500 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q125,0 250,50 T500,50"
            fill="none"
            stroke="#4F46E5"
            strokeWidth="2"
          />
          {/* Train SVG */}
          <g transform="translate(0, 30)">
            <svg
              x="0"
              y="0"
              width="60"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-indigo-500 animate-moveTrain"
            >
              <path d="M12 2L2 22H22L12 2Z" />
              <circle cx="12" cy="12" r="4" fill="#FFFFFF" />
            </svg>
          </g>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-500">About Metro</h3>
            <p className="text-sm text-gray-300">
              Connecting cities, transforming lives. Our metro rail system is designed for speed,
              safety, and sustainability.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-indigo-500 transition-all">
                  Timetable
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-indigo-500 transition-all">
                  Fares & Tickets
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-indigo-500 transition-all">
                  Stations
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-indigo-500 transition-all">
                  Safety Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-500">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">Email: info@metrorail.com</li>
              <li className="text-sm text-gray-300">Phone: +123 456 7890</li>
              <li className="text-sm text-gray-300">Address: Metro City, Station Road</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-indigo-500">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-indigo-500 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-indigo-500 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-indigo-500 transition-all"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Metro Rail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MetroFooter;