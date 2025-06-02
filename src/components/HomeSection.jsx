import React from "react";
import { motion } from "framer-motion";
import TrainSvg from "./TrainSvg";
import TreeSvg from "./TreeSvg";
import MetroForm from "./MetroForm";

const HomeSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Container for responsive layout */}
      <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Booking Form - Always on top for mobile, left for desktop */}
        <div className="w-full lg:w-1/2 xl:w-2/5 z-10 order-1 lg:order-none">
          <MetroForm />
        </div>

        {/* Promotional Banner - Takes full width on mobile, right side on desktop */}
        <div className="w-full lg:w-1/2 xl:w-3/5 relative order-2 lg:order-none">
          {/* Text Content */}
          <div className="text-center lg:text-left mb-8 lg:mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-900 leading-tight"
            >
              Swift wheels glide, the city hums,
              <br />
              A journey starts as morning drums.
              <br />
              MetroRail—your trusted ride.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 md:mt-6 text-indigo-800 font-semibold text-lg md:text-xl"
            >
              Discover Europe with great savings and easy booking
            </motion.p>
          </div>

          {/* Train Animation Container */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
            {/* Background Elements */}
            <div className="absolute right-0 top-0 w-full sm:w-4/5 h-full bg-[#ff9da1] rounded-tl-[3rem] rounded-bl-[3rem] sm:rounded-bl-none" />
            <div className="absolute right-0 -top-8 sm:-top-12 w-16 sm:w-24 h-32 sm:h-48 bg-teal-400 rounded-tl-[2rem] sm:rounded-tl-[3rem]" />

            {/* Tree Design - Fixed position */}
            <div className="absolute bottom-16 right-4 sm:right-8 w-16 sm:w-24 h-16 sm:h-24 z-20">
              <TreeSvg />
            </div>

            {/* Train Animation - Responsive positioning */}
            <motion.div
              initial={{ x: "100vw" }}
              animate={{ x: ["100vw", "-160vw"] }}
              transition={{ 
                ease: "linear", 
                duration: 8,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute bottom-4 sm:bottom-16 left-0 w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 z-30"
            >
              <TrainSvg className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style jsx>{`
        @media (max-width: 640px) {
          .container {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeSection;