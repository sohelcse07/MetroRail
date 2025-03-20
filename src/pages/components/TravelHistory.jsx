import React from "react";

const TravelHistory = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg mt-8 p-6 lg:p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-primary">Travel History</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr className="bg-primary text-white">
              {[
                "Source",
                "Destination",
                "Num of Seats",
                "Price",
                "Date",
                "Time",
                "Status",
                "Ticket Status",
                "QR Image",
                "Ticket",
              ].map((header, idx) => (
                <th key={idx} className="px-4 py-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                source: "Mirpur 11",
                destination: "Mirpur 10",
                seats: "5",
                price: "90.00",
                date: "Jan 5, 2022",
                time: "8:35 a.m.",
                status: "Cancelled",
                ticketStatus: "Refunded",
                qr: "-",
                ticket: "Download Ticket",
              },
              {
                source: "Mirpur 11",
                destination: "Mirpur 10",
                seats: "10",
                price: "225.00",
                date: "Jan 10, 2022",
                time: "8:35 a.m.",
                status: "Confirmed",
                ticketStatus: "Paid",
                qr: "/path/to/qr-code.jpg",
                ticket: "Download Ticket",
              },
            ].map((entry, idx) => (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="px-4 py-2">{entry.source}</td>
                <td className="px-4 py-2">{entry.destination}</td>
                <td className="px-4 py-2">{entry.seats}</td>
                <td className="px-4 py-2">{entry.price}</td>
                <td className="px-4 py-2">{entry.date}</td>
                <td className="px-4 py-2">{entry.time}</td>
                <td
                  className={`px-4 py-2 ${entry.status === "Cancelled"
                      ? "text-danger"
                      : "text-success"
                    }`}
                >
                  {entry.status}
                </td>
                <td
                  className={`px-4 py-2 ${entry.ticketStatus === "Refunded"
                      ? "text-warning"
                      : "text-success"
                    }`}
                >
                  {entry.ticketStatus}
                </td>
                <td className="px-4 py-2">
                  {entry.qr !== "-" ? (
                    <img
                      src={entry.qr}
                      alt="QR Code"
                      className="h-8 w-8 rounded"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-2 text-info underline cursor-pointer">
                  {entry.ticket}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TravelHistory;