import React from "react";
import { motion } from "framer-motion";
import TrainSvg from "./TrainSvg";
import MetroForm from "./MetroForm";

const HomeSection = () => {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-blue-500/20" />
      </div>

      {/* Floating metro elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: Math.random() * 100,
              x: Math.random() * 100,
              opacity: 0.3
            }}
            animate={{ 
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="absolute rounded-full"
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              background: `rgba(59, 130, 246, 0.2)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(4px)"
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-8 relative ">
        {/* Booking Form */}
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
          {/* Text Content */}
          <div className="text-center lg:text-left mb-8 lg:mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Fast. Reliable. Efficient.
              </span>
              <br />
              Your Metro Journey Starts Here
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 md:mt-6 text-gray-600 text-lg md:text-xl max-w-lg"
            >
              Experience seamless travel with our modern metro system. Book your tickets in seconds and enjoy the ride.
            </motion.p>
          </div>

          {/* Animated Metro Scene */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] rounded-3xl overflow-hidden bg-gradient-to-br from-sky-100 to-blue-100 border border-gray-100 shadow-lg">
            {/* Sky gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-100"></div>
            
            {/* Sun */}
            <motion.div 
              className="absolute top-8 right-12 w-16 h-16 bg-yellow-300 rounded-full shadow-lg"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-200 rounded-full"></div>
            </motion.div>

            {/* Floating clouds */}
            {[20, 40, 70].map((left, i) => (
              <motion.div
                key={i}
                initial={{ x: -100 }}
                animate={{ x: [null, `calc(100% + ${left}px)`] }}
                transition={{
                  duration: 30 + i * 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-12 w-24 h-8 bg-white rounded-full opacity-80"
                style={{ left: `${left}%` }}
              >
                <div className="absolute -top-3 left-2 w-10 h-10 bg-white rounded-full"></div>
                <div className="absolute -top-2 right-2 w-12 h-12 bg-white rounded-full"></div>
              </motion.div>
            ))}

          
            {/* Track */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-400"></div>
              {/* Sleepers */}
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute bottom-0 h-4 w-16 bg-gray-400"
                  style={{
                    left: `${i * 10}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              ))}
            </div>

            {/* Station platform */}
            <div className="absolute bottom-16 left-0 right-0 h-8 bg-gray-100 border-t border-gray-200">
              <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400"></div>
            </div>

            {/* Platform elements */}
            <div className="absolute bottom-24 left-1/4 w-16 h-4 bg-blue-200 rounded"></div>
            <div className="absolute bottom-24 right-1/4 w-16 h-4 bg-blue-200 rounded"></div>

            {/* Animated metro train */}
            <motion.div
              initial={{ x: "100vw" }}
              animate={{ x: ["100vw", "-160vw"] }}
              transition={{ 
                ease: "linear", 
                duration: 10,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute bottom-20 left-0 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] z-30"
            >
              <TrainSvg className="w-full h-auto" />
              {/* Train light effect */}
              <motion.div
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-1/4 -left-4 w-12 h-3 bg-yellow-300 rounded-full blur-sm"
              />
            </motion.div>

            {/* People waiting */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="absolute bottom-24 z-20 flex items-end"
                style={{
                  left: `${15 + i * 15}%`
                }}
              >
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="w-5 h-8 bg-indigo-600 rounded-t-full ml-[-6px]"></div>
              </motion.div>
            ))}

           
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20"></div>
    </div>
  );
};

export default HomeSection;