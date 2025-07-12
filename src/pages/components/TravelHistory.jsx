import React from "react";
import { useAuth } from "../../context/AuthContext";
import { format } from 'date-fns';

const TravelHistory = () => {
  const { token } = useAuth();
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
    return <div className="text-center py-8">No travel history found</div>;
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