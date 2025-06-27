import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronRight, MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

const MetroFooter = () => {
     const location = useLocation();

  // If the current URL includes /dashboard, don't render the footer
  if (location.pathname.includes("/dashboard")) {
    return null;
  }
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 mt-24">
      {/* Moving train animation */}
      <div className="relative h-2 mb-16 overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-dashed border-gray-300 relative">
            <div className="absolute -top-6 left-0 animate-moveTrain w-12 h-12">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-gray-400 w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand section */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-gray-700"
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
              </div>
              <span className="text-xl font-semibold text-gray-800">
                MetroRail
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Revolutionizing urban transportation with fast, reliable, and
              eco-friendly metro services across the city.
            </p>
            <div className="flex space-x-4 pt-2">
              {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                <Tooltip.Provider key={social} delayDuration={100}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <a
                        href="#"
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label={social}
                      >
                        <svg
                          className="h-5 w-5 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12a10 10 0 11-20 0 10 10 0 0120 0z" />
                        </svg>
                      </a>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      className="bg-gray-800 text-white text-xs px-2 py-1 rounded"
                    >
                      {social}
                      <Tooltip.Arrow className="fill-gray-800" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              ))}
            </div>
          </div>

          {/* Quick links - Accordion for mobile */}
          <div className="lg:hidden">
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="quick-links">
                <Accordion.Trigger className="flex items-center justify-between w-full py-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
                  Quick Links
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </Accordion.Trigger>
                <Accordion.Content className="pt-3">
                  <ul className="space-y-3">
                    {['Timetables', 'Fares', 'Stations', 'Accessibility', 'Safety'].map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center"
                        >
                          <ChevronRight className="flex-shrink-0 h-4 w-4 mr-2 text-gray-500" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>

          {/* Quick links - Desktop */}
          <div className="hidden lg:block space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Timetables', 'Fares', 'Stations', 'Accessibility', 'Safety'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center group"
                  >
                    <ChevronRight className="flex-shrink-0 h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-700 transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Contact Us
            </h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start">
                <div className="p-1.5 bg-gray-100 rounded-md mr-3">
                  <MapPin className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-600">
                  123 Metro Station Plaza,
                  <br />
                  Downtown, City 10001
                </span>
              </div>
              <div className="flex items-center">
                <div className="p-1.5 bg-gray-100 rounded-md mr-3">
                  <Phone className="h-4 w-4 text-gray-600" />
                </div>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center">
                <div className="p-1.5 bg-gray-100 rounded-md mr-3">
                  <Mail className="h-4 w-4 text-gray-600" />
                </div>
                <a
                  href="mailto:info@metrorail.com"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  info@metrorail.com
                </a>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600">
              Subscribe to get updates on new routes, schedules, and special
              offers.
            </p>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                required
              />
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    className="w-full px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Subscribe
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl p-6 focus:outline-none">
                    <Dialog.Title className="text-lg font-semibold text-gray-800">
                      Subscription Confirmed
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-gray-600">
                      Thank you for subscribing to our newsletter!
                    </Dialog.Description>
                    <div className="mt-4 flex justify-end">
                      <Dialog.Close asChild>
                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors">
                          Close
                        </button>
                      </Dialog.Close>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} MetroRail Transit Authority. All
            rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy', 'Terms', 'Accessibility', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
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