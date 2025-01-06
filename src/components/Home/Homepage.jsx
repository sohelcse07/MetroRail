import React from "react";

const Homepage = () => {
  return (
    <div className="bg-transparent min-h-screen mt-20">
      {/* Form Section */}
      <div className="mx-auto max-w-2xl p-8 border-3 border-yellow-400 rounded-lg text-white bg-white/10 backdrop-blur-md shadow-lg">
        <h2 className="text-3xl font-extrabold text-teal-950 mb-6 text-center">
          Single Journey Ticket
        </h2>

        <form className="space-y-8">
          {/* From Field */}
          <div className="flex flex-col">
            <label htmlFor="from" className="text-gray-900 mb-1 font-medium">
              From<span className="ml-2">:</span>
            </label>
            <input
              type="text"
              id="from"
              className="w-full px-4 py-[10px] rounded-md bg-gray-900 bg-opacity-50 text-white border-2 border-yellow-400 focus:outline-Numberne focus:ring-2 focus:ring-yellow-500 shadow-lg hover:border-yellow-500 placeholder-white/50"
              placeholder="Enter starting point"
            />
          </div>

          {/* To Field */}
          <div className="flex flex-col">
            <label htmlFor="to" className="text-gray-900 mb-1 font-medium">
              To<span className="ml-2">:</span>
            </label>
            <input
              type="text"
              id="to"
              className="w-full px-4 py-[10px] rounded-md bg-gray-900 bg-opacity-50 text-white border-2 border-yellow-400 focus:outline-Numberne focus:ring-2 focus:ring-yellow-500 shadow-lg hover:border-yellow-500 placeholder-white/50"
              placeholder="Enter destination"
            />
          </div>

          {/* Telegram Number Field */}
          <div className="flex flex-col">
            <label htmlFor="telegram" className="text-gray-900 mb-1 font-medium">
              Telegram Number<span className="ml-2">:</span>
            </label>
            <input
              type="text"
              id="telegram"
              className="w-full px-4 py-[10px] rounded-md bg-gray-900 bg-opacity-50 text-white border-2 border-yellow-400 focus:outline-Numberne focus:ring-2 focus:ring-yellow-500 shadow-lg hover:border-yellow-500 placeholder-white/50"
              placeholder="Enter Telegram number"
            />
          </div>

          {/* Ticket Number Field */}
          <div className="flex flex-col">
            <label htmlFor="ticket" className="text-gray-900 mb-1 font-medium">
              Number Of Tickets<span className="ml-2">:</span>
            </label>
            <div className="flex items-center">
              <button
                type="button"
                className="px-3 py-2 bg-yellow-400 text-gray-900 font-bold rounded-l-md border-2 border-yellow-500 hover:bg-yellow-500"
                onClick={() => {
                  const ticketInput = document.getElementById("ticket");
                  if (ticketInput.value > 1) {
                    ticketInput.value = parseInt(ticketInput.value) - 1;
                  }
                }}
              >
                -
              </button>
              <input
                type="number"
                id="ticket"
                defaultValue="1"
                min="1"
                className="w-16 text-center px-4 py-2 bg-gray-900 bg-opacity-50 text-white border-t-2 border-b-2 border-yellow-400 focus:outline-none"
                readOnly
              />
              <button
                type="button"
                className="px-3 py-2 bg-yellow-400 text-gray-900 font-bold rounded-r-md border-2 border-yellow-500 hover:bg-yellow-500"
                onClick={() => {
                  const ticketInput = document.getElementById("ticket");
                  ticketInput.value = parseInt(ticketInput.value) + 1;
                }}
              >
                +
              </button>
            </div>
          </div>


          {/* Next Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-[10px] bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-md shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Homepage;