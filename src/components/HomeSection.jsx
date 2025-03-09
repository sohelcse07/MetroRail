import React from "react";
import { motion } from "framer-motion";
import TrainSvg from "./TrainSvg";
import TreeSvg from "./TreeSvg";
import MetroForm from "./MetroForm";

const HomeSection = () => {
  return (
    <div className="flex flex-col relative top-10 md:flex-row items-center justify-between bg-white  min-h-screen">
      {/* Booking Form */}
      <div className=" w-full md:w-1/3 mx-12">
       <MetroForm/>
      </div>

      {/* Promotional Banner with Train and Tree */}
      <div className="relative text-center md:text-left md:w-2/3 mt-8 md:mt-0 ">
        {/* Text Section */}
        <h2 className="text-2xl md:text-4xl font-bold text-indigo-900 p-12">
          Swift wheels glide, the city hums,
          <br />
          A journey starts as morning drums.
          <br />
          MetroRail—your trusted ride.
        </h2>
        <p className="mt-4 text-indigo-800 font-bold text-lg md:text-xl px-12">
          Discover Europe with great savings and easy booking
        </p>

        {/* Train and Tree Section */}
        <div className="mt-6 relative">
          {/* Rail SVG */}
          <div className="relative flex flex-col w-full h-96">
            <div className="absolute right-0 top-10 w-1/2 h-80 bg-[#ff9da1] rounded-tl-[3rem] border z-10"></div>
            <div className="absolute right-0 -top-20 w-24 h-[10rem] bg-teal-400 rounded-tl-[3rem] border"></div>
             {/* Train Animation */}
         
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-0.5%" }}
            transition={{ ease: "linear", duration: 2, }}
            className="relative flex items-end justify-center w-full h-96 z-20"
          >
            <TrainSvg />
          </motion.div>
          </div>

          {/* Tree Design */}
          <div className="absolute bottom-0 right-10 w-24 h-24 z-30">
            <TreeSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
