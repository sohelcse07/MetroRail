import React, { useRef } from "react";
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
  "UBijoy Sharani",
  "Farmgate",
  "MKawran Bazar",
  "Shahbagh",
  "Dhaka University",
  "Bangladesh Secretariat",
  "Motijheel",
];

const MetroTimeline = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full top-20 flex flex-col items-center p-6 bg-white">
      {/* Scrollable Container */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex items-center space-x-16 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* Connecting Wire */}
          <div className="absolute top-1/2 left-0 w-full h-2 bg-blue-500 z-0 transform -translate-y-1/2"></div>

          {stations.map((station, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Odd Stations (Above the Wire) */}
              {index % 2 === 0 && (
                <>
                  {/* Icon Bubble */}
                  <div className="relative w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-lg border-2 border-blue-500 -mt-12 z-10">
                    <img src={TopIcon} alt="Metro Icon" className="w-16 h-16" />
                  </div>

                  {/* Station Name */}
                  <div className="mt-4 px-8 py-4 bg-white shadow-lg border-2 border-blue-500 rounded-lg text-center text-lg font-semibold">
                    {station}
                  </div>
                </>
              )}

              {/* Even Stations (Below the Wire) */}
              {index % 2 !== 0 && (
                <>
                  {/* Station Name */}
                  <div className="mb-4 px-8 py-4 bg-white shadow-lg border-2 border-blue-500 rounded-lg text-center text-lg font-semibold">
                    {station}
                  </div>

                  {/* Icon Bubble */}
                  <div className="relative w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-lg border-2 border-blue-500 mt-12 z-10">
                    <img src={TopIcon} alt="Metro Icon" className="w-16 h-16" />
                  </div>
                </>
              )}

              {/* Connecting Dot (Using ::before) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button
          className="p-3 bg-gray-300 hover:bg-gray-400 rounded-full shadow-lg"
          onClick={() => scroll("left")}
        >
          <FaChevronLeft className="text-lg text-gray-700" />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button
          className="p-3 bg-gray-300 hover:bg-gray-400 rounded-full shadow-lg"
          onClick={() => scroll("right")}
        >
          <FaChevronRight className="text-lg text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default MetroTimeline;