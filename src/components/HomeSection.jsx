import React from "react";
import { motion } from "framer-motion";
import TrainSvg from "./TrainSvg";
import TreeSvg from "./TreeSvg";
import MetroForm from "./MetroForm";

const HomeSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden">
      {/* Floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: Math.random() * 100,
              x: Math.random() * 100,
              opacity: 0.2
            }}
            animate={{ 
              y: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute rounded-full"
            style={{
              width: `${5 + Math.random() * 15}px`,
              height: `${5 + Math.random() * 15}px`,
              background: `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 150)}, 255, 0.3)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Booking Form - Card with glass morphism effect */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 xl:w-2/5 order-1 lg:order-none"
        >
            
            <MetroForm />
        </motion.div>

        {/* Promotional Banner */}
        <div className="w-full lg:w-1/2 xl:w-3/5 relative order-2 lg:order-none">
          {/* Text Content with gradient text */}
          <div className="text-center lg:text-left mb-8 lg:mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xl sm:text-3xl md:text-4xl font-bold text-indigo-900 leading-tight"
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

          {/* Animated Train Scene */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] rounded-3xl overflow-hidden">
            {/* Gradient background with animated clouds */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -100, opacity: 0.3 }}
                  animate={{ x: "100%", opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 20 + i * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-10 h-10 w-20 bg-white/30 rounded-full"
                  style={{
                    top: `${10 + i * 15}%`,
                    left: `${i * 20}%`
                  }}
                />
              ))}
            </div>

            {/* City skyline silhouette */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent">
              <div className="absolute bottom-0 w-full h-16 bg-gray-900"></div>
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bottom-16 bg-gray-800"
                  style={{
                    left: `${i * 5}%`,
                    width: `${2 + Math.random() * 4}%`,
                    height: `${10 + Math.random() * 40}px`
                  }}
                />
              ))}
            </div>

            {/* Animated trees */}
            <div className="absolute bottom-16 right-8 w-24 h-24 z-20">
              <TreeSvg className="text-green-500" />
            </div>
            <div className="absolute bottom-20 left-10 w-16 h-20 z-20">
              <TreeSvg className="text-green-600" />
            </div>

            {/* Train Animation with enhanced motion */}
            <motion.div
              initial={{ x: "100vw" }}
              animate={{ x: ["100vw", "-160vw"] }}
              transition={{ 
                ease: "linear", 
                duration: 8,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute bottom-8 sm:bottom-16 left-0 w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 z-30"
            >
              <TrainSvg className="w-full h-auto drop-shadow-lg" />
              {/* Train light effect */}
              <motion.div
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-1/4 -left-4 w-8 h-2 bg-yellow-300 rounded-full blur-sm"
              />
            </motion.div>

            {/* Floating passengers animation */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0, x: Math.random() * 100 }}
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, Math.random() * 20 - 10]
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="absolute bottom-24 z-20 flex items-end"
                style={{
                  left: `${10 + i * 15}%`
                }}
              >
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <div className="w-6 h-8 bg-indigo-500 rounded-t-full ml-[-8px]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default HomeSection;