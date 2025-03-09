import React, { useState } from "react";
import UseAxiosSecure from "../hooks/useAxiosSecure";

const MetroForm = () => {
  const axiosSecure = UseAxiosSecure();

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
  const [ticketCount, setTicketCount] = useState(1);
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
    e.preventDefault();
    if (!from || !to || !teleNumber || !ticketCount) {
      alert("You must submit all the fields");
      return;
    }

    const ticketInfo = {
      from: from,
      to: to,
      ticket_number: ticketCount,
      telegram_number: teleNumber,
    };

    axiosSecure
      .post("/single-journey/payment/initiate", ticketInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.payment_url) {
          window.open(res.data.payment_url, "_blank");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  };

  return (
    <div className="w-96 mx-auto bg-white shadow-slate-500 shadow-lg rounded-lg p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Metro Ticket Booking</h2>

      {/* From Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">From</label>
        <div className="relative">
          <div
            className="w-full px-4 py-2 border rounded bg-gray-50 text-gray-800 cursor-pointer"
            onClick={() => setDropdownOpen({ ...dropdownOpen, from: !dropdownOpen.from })}
          >
            {from || "Select starting point"}
          </div>
          {dropdownOpen.from && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto shadow-lg">
              {places
                .filter((place) => place !== to)
                .map((place, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                    onClick={() => handleFromSelect(place)}
                  >
                    {place}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* To Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">To</label>
        <div className="relative">
          <div
            className="w-full px-4 py-2 border rounded bg-gray-50 text-gray-800 cursor-pointer"
            onClick={() => setDropdownOpen({ ...dropdownOpen, to: !dropdownOpen.to })}
          >
            {to || "Select destination"}
          </div>
          {dropdownOpen.to && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-auto shadow-lg">
              {places
                .filter((place) => place !== from)
                .map((place, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                    onClick={() => handleToSelect(place)}
                  >
                    {place}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Ticket Type */}
      <div className="flex mb-4">
        <button className="w-1/2 p-2 border rounded-l-lg bg-teal-400 pointer-events-none text-white font-medium hover:bg-teal-500">
          One-way
        </button>
        <button className="w-1/2 p-2 border pointer-events-none rounded-r-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">
          No Return
        </button>
      </div>

      {/* Telegram Number Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Telegram Number</label>
        <input
          type="text"
          value={teleNumber}
          onChange={(e) => setTeleNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded bg-gray-50 text-gray-800 placeholder-gray-400"
          placeholder="Enter Telegram number"
          required
        />
      </div>

      {/* Ticket Count */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Number of Tickets</label>
        <div className="flex items-center">
          <button
            type="button"
            className="px-3 py-2 bg-teal-400 text-white font-bold rounded-l-md border border-teal-500 hover:bg-teal-500"
            onClick={() => setTicketCount(ticketCount > 1 ? ticketCount - 1 : 1)}
          >
            -
          </button>
          <input
            type="number"
            value={ticketCount}
            min="1"
            className="w-16 text-center px-4 py-2 bg-gray-100 text-gray-900 border-t border-b border-teal-400 focus:outline-none"
            readOnly
          />
          <button
            type="button"
            className="px-3 py-2 bg-teal-400 text-white font-bold rounded-r-md border border-teal-500 hover:bg-teal-500"
            onClick={() => setTicketCount(ticketCount < 5 ? ticketCount + 1 : ticketCount)}
          >
            +
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          type="submit"
          onClick={handleTicketForm}
          className="w-full py-3 bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default MetroForm;
