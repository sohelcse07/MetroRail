import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TopIcon from "../assets/top-icn.png";

const stations = [
  "Uttara North",
  "Uttara Center",
  "Uttara South",
  "Pallabi",
  "Mirpur 11",
  "Mirpur 10",
  "Kazi Para",
  "ShewraPara",
  "Agargaon",
  "Bijoy Sharani",
  "Farmgate",
  "Kawran Bazar",
  "Shahbagh",
  "Dhaka University",
  "Bangladesh Secretariat",
  "Motijheel",
];

const MetroTimeline = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className="relative w-full py-12 md:py-20 bg-white">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-blue-800">
        Metro Rail Stations
      </h2>

      {/* Scrollable Container */}
      <div className="relative w-full overflow-hidden px-4">
        {/* Navigation Buttons - Only show when needed */}
        {showLeftArrow && (
          <button
            className="hidden md:block absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg border border-gray-200"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-lg text-blue-600" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex items-center space-x-8 md:space-x-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {/* Connecting Wire */}
          <div className="absolute top-1/2 left-0 w-full h-1.5 md:h-2 bg-blue-400 z-0 transform -translate-y-1/2"></div>

          {stations.map((station, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center flex-shrink-0 snap-center px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {/* Odd Stations (Above the Wire) */}
              {index % 2 === 0 && (
                <>
                  {/* Icon Bubble */}
                  <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-white rounded-full shadow-md md:shadow-lg border-2 border-blue-500 -mt-8 md:-mt-12 z-10">
                    <img
                      src={TopIcon}
                      alt="Metro Icon"
                      className="w-10 h-10 md:w-16 md:h-16"
                    />
                  </div>

                  {/* Station Name */}
                  <div className="mt-2 md:mt-4 px-4 py-2 md:px-6 md:py-3 bg-white shadow-md md:shadow-lg border-2 border-blue-500 rounded-lg text-center text-sm md:text-lg font-semibold whitespace-nowrap">
                    {station}
                  </div>
                </>
              )}

              {/* Even Stations (Below the Wire) */}
              {index % 2 !== 0 && (
                <>
                  {/* Station Name */}
                  <div className="mb-2 md:mb-4 px-4 py-2 md:px-6 md:py-3 bg-white shadow-md md:shadow-lg border-2 border-blue-500 rounded-lg text-center text-sm md:text-lg font-semibold whitespace-nowrap">
                    {station}
                  </div>

                  {/* Icon Bubble */}
                  <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-white rounded-full shadow-md md:shadow-lg border-2 border-blue-500 mt-8 md:mt-12 z-10">
                    <img
                      src={TopIcon}
                      alt="Metro Icon"
                      className="w-10 h-10 md:w-16 md:h-16"
                    />
                  </div>
                </>
              )}

              {/* Connecting Dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-blue-500 rounded-full z-10"></div>
            </motion.div>
          ))}
        </div>

        {showRightArrow && (
          <button
            className="hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg border border-gray-200"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-lg text-blue-600" />
          </button>
        )}
      </div>

      {/* Mobile Navigation Dots */}
      <div className="md:hidden flex justify-center mt-6 space-x-2">
        {stations.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-gray-300"
            onClick={() => {
              if (scrollRef.current) {
                const stationElement = scrollRef.current.children[index];
                stationElement.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }
            }}
            aria-label={`Go to station ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MetroTimeline;