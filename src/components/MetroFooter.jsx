import React from "react";

const MetroFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-100 py-16 mt-24">
      {/* Decorative train track */}
      <div className="relative h-2 mb-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-dashed border-slate-700 relative">
            {/* Moving train */}
            <div className="absolute -top-6 left-0 animate-moveTrain w-12 h-12">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-slate-400 w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7l4-4m0 0l4 4m-4-4v18m-4 0h12a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Metro logo and description */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <span className="text-xl font-bold text-slate-300">MetroRail</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Revolutionizing urban transportation with fast, reliable, and eco-friendly metro services across the city.
            </p>
            <div className="flex space-x-4 pt-2">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={`M22 12a10 10 0 11-20 0 10 10 0 0120 0z`} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Timetables', 'Fares', 'Stations', 'Accessibility', 'Safety'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors flex items-center"
                  >
                    <svg
                      className="flex-shrink-0 h-4 w-4 mr-2 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Contact Us
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-slate-500 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm text-slate-400">
                  123 Metro Station Plaza,<br />
                  Downtown, City 10001
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-slate-500 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-slate-500 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@metrorail.com"
                  className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                  info@metrorail.com
                </a>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Newsletter
            </h3>
            <p className="text-sm text-slate-400">
              Subscribe to get updates on new routes, schedules, and special offers.
            </p>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-500"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} MetroRail Transit Authority. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy', 'Terms', 'Accessibility', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes moveTrain {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }
        .animate-moveTrain {
          animation: moveTrain 15s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default MetroFooter;