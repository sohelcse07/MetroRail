import React from "react";
import { useAuth } from "../../context/AuthContext";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
const TravelHistory = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchTravelHistory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/scanner/journey/completed/history`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch travel history");
        }

        const data = await response.json();
        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelHistory();
  }, [token]);
  console.log(history,"history");

  if (loading) {
    return <div className="text-center py-8">Loading travel history...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-danger">Error: {error}</div>;
  }

 if (history.length === 0) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg mt-8 p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-primary">Travel History</h2>
      <div className="flex flex-col items-center justify-center py-12">
        <svg 
          className="w-24 h-24 text-gray-400 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
          />
        </svg>
        <h3 className="text-xl font-medium text-gray-500 mb-2">No Journeys Yet</h3>
        <p className="text-gray-400 max-w-md text-center">
          Your completed journeys will appear here. Start your metro adventure to see your travel history!
        </p>
       <button 
  className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
  onClick={() => navigate('/permanent-ticket')}
>
  Plan a Journey
</button>
      </div>
    </div>
  );
}
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
                "Fare",
                "Created At",
                "Completed At",
                "Expiry Date",
                "Validity (Years)",
              ].map((header, idx) => (
                <th key={idx} className="px-4 py-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((entry, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-2">{entry.start_station_name}</td>
                <td className="px-4 py-2">{entry.end_station_name}</td>
                <td className="px-4 py-2">৳{entry.fare}</td>
                <td className="px-4 py-2">
                  {format(new Date(entry.created_at), "MMM d, yyyy h:mm a")}
                </td>
                <td className="px-4 py-2">
                  {format(new Date(entry.updated_at), "MMM d, yyyy h:mm a")}
                </td>
                <td className="px-4 py-2">
                  {format(new Date(entry.expiry_date), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-2">{entry.validity_years}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TravelHistory;