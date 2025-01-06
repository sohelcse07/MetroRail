import React,{useState} from "react";
import ProfileImage from "../assets/profile.png"
import { TbCoinTaka } from "react-icons/tb"; // Example for financial icon
import { MdEmail, MdDateRange, MdPhone } from "react-icons/md"; // Example for email, date, and phone icons
import { FaUser, FaIdCard } from "react-icons/fa"; // Example for user and ID icons

const UserDashboard = () => {
  const [showSecondContainer, setShowSecondContainer] = useState(false);

    const profileData = [
        { title: "Balance", value: "1.33 BDT", icon: <TbCoinTaka /> },
        { title: "E-mail", value: "sohel@gmail.com", icon: <MdEmail /> },
        { title: "Telegram Number", value: "01876404904", icon: <MdPhone /> },
        { title: "Date Of Birth", value: "02-01-2024", icon: <MdDateRange /> },
        { title: "Gender", value: "Male", icon: <FaUser /> },
        { title: "NID Verification", value: "Approved", icon: <FaIdCard /> },
    ];
    const features = [
        { label: "Recharge", icon: "💳", color: "text-red-500" },
        { label: "Balance Transfer", icon: "📲", color: "text-cyan-500" },


        { label: "Settings", icon: "⚙️", color: "text-pink-500" },

        { label: "Help", icon: "❓", color: "text-cyan-500" },
    ];
    return (
         <div className="min-h-screen  relative text-white">
    
            <div className="container mx-auto px-4 py-6 lg:py-12">
                
                {/* Personal Details Section */}
                <div className="bg-slate-500/10 backdrop-blur-lg rounded-lg p-6 lg:p-8 mb-12">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <img
                            src={ProfileImage} // Replace with actual profile image path
                            alt="Profile"
                            className="w-32 h-32 lg:w-44 lg:h-44 rounded-full border-4 border-teal-800"
                        />
                        <h1 className="text-4xl font-semibold text-white ">Ahmed Sohel</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {profileData.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center bg-gradient-to-r from-teal-700 to-teal-600 border-2 border-yellow-300 p-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                                >
                                    <div className="text-4xl text-yellow-400">
                                        {item.icon}
                                    </div>
                                    <div className="ml-4 text-start">
                                        <h2 className="text-lg font-bold text-yellow-200">{item.title}</h2>
                                        <p className="text-sm font-medium text-violet-100">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
            className="cursor-pointer text-4xl flex justify-center    text-cyan-500"
            onClick={() => setShowSecondContainer(!showSecondContainer)}
          >
            <span className=" bg-slate-900 p-4 border-2  rounded-md shadow-lg hover:bg-gray-700">
              🛠️
            </span>
          </div>
                    </div>
                </div>
            
                <div className={`bg-white/10 backdrop-blur-lg  flex justify-center items-center transition-opacity duration-1000  ${showSecondContainer?"h-auto":" hidden"}`}>
                    <div className="grid grid-cols-2  gap-4 p-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4 shadow-md"
                            >
                                <div className={`text-6xl mb-2 ${feature.color}`}>{feature.icon}</div>
                                <span className="text-white text-xl font-medium">{feature.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Travel History Section */}
                <div className="bg-slate-500/10 backdrop-blur-lg rounded-lg mt-8 p-6 lg:p-8">
                    <h2 className="text-2xl font-bold mb-6">Travel History</h2>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-sm">
                            <thead>
                                <tr className="bg-indigo-700 text-white">
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
                                        className={`${idx % 2 === 0
                                                ? "bg-indigo-700/50"
                                                : "bg-purple-700/50"
                                            } text-white`}
                                    >
                                        <td className="px-4 py-2">{entry.source}</td>
                                        <td className="px-4 py-2">{entry.destination}</td>
                                        <td className="px-4 py-2">{entry.seats}</td>
                                        <td className="px-4 py-2">{entry.price}</td>
                                        <td className="px-4 py-2">{entry.date}</td>
                                        <td className="px-4 py-2">{entry.time}</td>
                                        <td
                                            className={`px-4 py-2 ${entry.status === "Cancelled"
                                                    ? "text-red-400"
                                                    : "text-green-400"
                                                }`}
                                        >
                                            {entry.status}
                                        </td>
                                        <td
                                            className={`px-4 py-2 ${entry.ticketStatus === "Refunded"
                                                    ? "text-yellow-400"
                                                    : "text-green-400"
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
                                        <td className="px-4 py-2 text-blue-400 underline cursor-pointer">
                                            {entry.ticket}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
       
    );
};

export default UserDashboard;
