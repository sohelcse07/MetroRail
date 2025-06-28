import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import metroIcon from "../../assets/metroIcon.png";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const token = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [isTelegramReady, setIsTelegramReady] = useState(false);

  useEffect(() => {
    // Initialize Telegram Web App if available
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      setIsTelegramReady(true);
    }
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Notification", path: "/notification" },
    { name: "Permanent Ticket", path: "/permanent-ticket" },
    { 
      name: "Telegram", 
      action: () => {
        if (isTelegramReady) {
          window.Telegram.WebApp.openTelegramLink('https://t.me/DhakaMetro_bot');
        } else {
          setShowTelegramModal(true);
        }
      }
    },
    { name: "Profile", path: "/dashboard" },
    ...(!token ? [{ name: "Sign In", path: "/login" }] : []),
  ];

  if (
    location.pathname === "/userdashboard" ||
    location.pathname.startsWith("/dashboard")
  )
    return null;

  const openTelegramWeb = () => {
    window.open('https://web.telegram.org/k/#@DhakaMetro_bot', '_blank');
    setShowTelegramModal(false);
  };

  const openTelegramApp = () => {
    window.open('https://t.me/DhakaMetro_bot', '_blank');
    setShowTelegramModal(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="z-50 flex-shrink-0">
            <img
              src={metroIcon}
              alt="Metro Icon"
              className="w-20 h-16 md:w-24 md:h-20"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6 items-center">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={index} className="relative group">
                  {item.action ? (
                    <button
                      onClick={item.action}
                      className={`px-2 py-1 transition-colors duration-200 ${
                        isActive ? "text-teal-600 font-semibold" : "text-gray-800 hover:text-teal-500"
                      }`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-2 py-1 transition-colors duration-200 ${
                        isActive ? "text-teal-600 font-semibold" : "text-gray-800 hover:text-teal-500"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Underline on hover/active */}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 bg-teal-500 rounded-sm transition-transform duration-300 transform origin-left scale-x-0 group-hover:scale-x-100 ${
                      isActive ? "scale-x-100" : ""
                    } w-full`}
                  />
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-800 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <Cross1Icon className="h-6 w-6" />
            ) : (
              <HamburgerMenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 w-full bg-white shadow-xl rounded-b-2xl z-50 pt-20 pb-6 px-6 md:hidden"
            >
              <ul className="flex flex-col space-y-4">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      {item.action ? (
                        <button
                          onClick={() => {
                            item.action();
                            setIsMobileMenuOpen(false);
                          }}
                          className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                            isActive
                              ? "bg-teal-50 text-teal-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                            isActive
                              ? "bg-teal-50 text-teal-600"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              {/* Close Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <Cross1Icon className="h-6 w-6" />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Telegram Modal */}
      <AnimatePresence>
        {showTelegramModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
              onClick={() => setShowTelegramModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-lg shadow-xl z-[70] p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Connect with Dhaka Metro</h3>
                <button
                  onClick={() => setShowTelegramModal(false)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <Cross1Icon className="h-5 w-5" />
                </button>
              </div>
              <p className="mb-6 text-gray-600">
                Choose how you'd like to access our Telegram support:
              </p>
              <div className="space-y-3">
                <button
                  onClick={openTelegramWeb}
                  className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Open in Web Browser
                </button>
                <button
                  onClick={openTelegramApp}
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Open in Telegram App
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;