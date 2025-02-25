import React, { useState } from "react";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  // import axiosSecure from useAxiosSecure hook
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate()

  const places = [
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

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [teleNumber, setTeleNumber] = useState("");
  const [ticketCount, setTicketCount] = useState(1)

  const [dropdownOpen, setDropdownOpen] = useState({ from: false, to: false });

  const handleFromSelect = (place) => {
    setFrom(place);
    if (place === to) setTo("");
    setDropdownOpen({ ...dropdownOpen, from: false });
  };

  const handleToSelect = (place) => {
    setTo(place);
    if (place === from) setFrom("");
    setDropdownOpen({ ...dropdownOpen, to: false });
  };


  const handleTicketForm = (e) => {
    e.preventDefault()
    if (!from || !to || !teleNumber || !ticketCount) {
      alert("You must submit all the fields")
      return
    }

    const ticketInfo = {
      from: from,
      to: to,
      ticket_number: ticketCount,
      telegram_number: teleNumber
    };

    // console.log(ticketInfo);
    // console.log(JSON.stringify(ticketInfo));

    axiosSecure.post("/single-journey/payment/initiate", ticketInfo)
      .then(res => {
        console.log(res.data);
        if (res.data.payment_url) {
          window.open(res.data.payment_url, "_blank");
        }
      })
      .catch(err => {
        console.error("API Error:", err);
        // alert("Failed to initiate payment. Please try again.");
      });
  }

  return (
    <div className="bg-transparent min-h-screen mt-20">

      {/* Form Section */}
      <div className="mx-auto max-w-2xl p-8 border-3 border-teal-400 rounded-lg text-white bg-white/10 backdrop-blur-md shadow-lg">
        <h2 className="text-3xl font-extrabold text-teal-950 mb-6 text-center">
          Single Journey Ticket
        </h2>

        <form onSubmit={handleTicketForm} className="space-y-8">
          {/* Custom From Dropdown */}
          <div className="flex flex-col relative">
            <label htmlFor="from" className="text-gray-950 text-xl mb-1 font-semibold">
              From<span className="ml-2">:</span>
            </label>
            <div
              className="w-full px-4 py-[10px] rounded-md bg-gray-950 bg-opacity-50 text-white border-2 border-teal-400 cursor-pointer"
              onClick={() =>
                setDropdownOpen({ ...dropdownOpen, from: !dropdownOpen.from })
              }
            >
              {from || "Select starting point"}
            </div>
            {dropdownOpen.from && (
              <ul className="absolute z-10 w-full bg-gray-800 bg-opacity-90 rounded-md mt-20 max-h-40 overflow-auto shadow-lg">
                {places
                  .filter((place) => place !== to)
                  .map((place, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-teal-500 hover:text-gray-950 cursor-pointer"
                      onClick={() => handleFromSelect(place)}
                    >
                      {place}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Custom To Dropdown */}
          <div className="flex flex-col relative">
            <label htmlFor="to" className="text-gray-950 text-xl mb-1 font-semibold">
              To<span className="ml-2">:</span>
            </label>
            <div
              className="w-full px-4 py-[10px] rounded-md bg-gray-950 bg-opacity-50 text-white border-2 border-teal-400 cursor-pointer"
              onClick={() =>
                setDropdownOpen({ ...dropdownOpen, to: !dropdownOpen.to })
              }
            >
              {to || "Select destination"}
            </div>
            {dropdownOpen.to && (
              <ul className="absolute z-10 w-full bg-gray-800 bg-opacity-90 rounded-md mt-20 max-h-40 overflow-auto shadow-lg">
                {places
                  .filter((place) => place !== from)
                  .map((place, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-teal-500 hover:text-gray-950 cursor-pointer"
                      onClick={() => handleToSelect(place)}
                    >
                      {place}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Telegram Number Field */}
          <div className="flex flex-col">
            <label htmlFor="telegram" className="text-gray-950 text-xl mb-1 font-semibold">
              Telegram Number<span className="ml-2">:</span>
            </label>

            <input
              onChange={(e) => setTeleNumber(e.target.value)}
              type="text"
              id="telegram"
              className="w-full px-4 py-[10px] rounded-md bg-gray-950 bg-opacity-50 text-white placeholder-white border-2 border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg hover:border-teal-500 placeholder-white/50"
              placeholder="Enter Telegram number"
              required
            />
          </div>

          {/* Ticket Number Field */}
          <div className="flex flex-col">
            <label htmlFor="ticket" className="text-gray-950 text-xl mb-1 font-semibold">
              Number Of Tickets<span className="ml-2">:</span>
            </label>
            <div className="flex items-center">
              <button
                type="button"
                className="px-3 py-2 bg-teal-400 text-gray-950 font-bold rounded-l-md border-2 border-teal-500 hover:bg-teal-500"
                onClick={() => setTicketCount(ticketCount > 1 ? ticketCount - 1 : 1)}
              >
                -
              </button>
              <input
                type="number"
                id="ticket"
                value={ticketCount}
                min="1"
                className="w-16 text-center px-4 py-2 bg-gray-950 bg-opacity-50 text-white border-t-2 border-b-2 border-teal-400 focus:outline-none"
                readOnly
              />
              <button
                type="button"
                className="px-3 py-2 bg-teal-400 text-gray-950 font-bold rounded-r-md border-2 border-teal-500 hover:bg-teal-500"
                onClick={() => setTicketCount(ticketCount < 5 ? ticketCount + 1 : ticketCount)}
              >
                +
              </button>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-[10px] bg-teal-400 hover:bg-teal-500 text-gray-950 font-bold rounded-md shadow-xl transition-all duration-300 transform hover:scale-105"
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


