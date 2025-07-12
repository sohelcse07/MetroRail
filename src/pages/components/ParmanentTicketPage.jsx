import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import PermanentTicketSkeleton from "../../components/skeleton/PermanentTicketSkeleton";
import { jsPDF } from "jspdf";
import { useUser } from "../../context/UserContext";
import StatusAlert from "../../components/StatusAlert";

const PermanentTicketPage = () => {
  const { token } = useAuth();
  const { user } = useUser();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    validity_years: 2,
    telegram_number: "",
  });
  const [actionLoading, setActionLoading] = useState({
    create: false,
    update: false,
    reset: false,
    delete: false,
  });
  const [missingFields, setMissingFields] = useState([]);

  // Minimum balance requirements
  const MIN_BALANCE = {
    2: 100,
    5: 200,
    10: 300,
  };

  useEffect(() => {
    if (user?.phone_number) {
      setFormData((prev) => ({
        ...prev,
        telegram_number: user.phone_number.slice(2),
      }));
    }
  }, [user]);

  // Fetch ticket data
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/permanent-journey/ticket/get`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setTicket(response.data);
        setFormData({
          validity_years: response.data.validity_years,
          telegram_number: response.data.telegram_number || "",
        });
        setError(null);
        setMissingFields([]);
      } catch (err) {
        if (err.response?.status === 404) {
          setTicket(null);
          setError(null);
        } else {
          setError(err.response?.data || "Failed to fetch ticket");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchTicket();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionLoading({ ...actionLoading, update: true });
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/permanent-journey/ticket/update`,
        { validity_years: formData.validity_years },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setTicket(response.data);
      setError(null);
      setAlertStatus(200); // Success status
      setAlertMessage("Ticket updated successfully!");
    } catch (err) {
      let errorMessage = "Failed to update ticket";
      let statusCode = 400; // Default error status

      if (err.response) {
        statusCode = err.response.status;
        if (err.response.data?.error) {
          errorMessage = err.response.data.error;
          // Handle specific error cases
          if (errorMessage.includes("minimum wallet balance")) {
            const years = formData.validity_years;
            errorMessage = `You need a minimum wallet balance of ${MIN_BALANCE[years]}.00 BDT for ${years} years.`;
          } else if (errorMessage.includes("Update charge required")) {
            errorMessage = `Ticket not updated because not enough balance. ${errorMessage}`;
          }
        }
      }

      setError(errorMessage);
      setAlertStatus(statusCode);
      setAlertMessage(errorMessage);
    } finally {
      setActionLoading({ ...actionLoading, update: false });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setActionLoading({ ...actionLoading, create: true });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/permanent-journey/ticket/create`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setTicket(response.data);
      setError(null);
      setMissingFields([]);
      setAlertStatus(201); // Created status
      setAlertMessage("Ticket created successfully!");
    } catch (err) {
      let errorMessage = "Failed to create ticket";
      let statusCode = 400; // Default error status
      let missingFields = [];

      if (err.response) {
        statusCode = err.response.status;
        if (err.response.data?.error) {
          errorMessage = err.response.data.error;
          // Handle specific error cases
          if (errorMessage === "User does not have enough data.") {
            missingFields = err.response.data.missing_fields || [];
            errorMessage = "Please complete your profile information";
          } else if (errorMessage.includes("minimum wallet balance")) {
            const years = formData.validity_years;
            errorMessage = `You need a minimum wallet balance of ${MIN_BALANCE[years]}.00 BDT for ${years} years.`;
          }
        }
      }

      setError(errorMessage);
      setMissingFields(missingFields);
      setAlertStatus(statusCode);
      setAlertMessage(errorMessage);
    } finally {
      setActionLoading({ ...actionLoading, create: false });
    }
  };

  const handleReset = async () => {
    setActionLoading({ ...actionLoading, reset: true });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/permanent-journey/ticket/reset`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setTicket(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Failed to reset ticket");
    } finally {
      setActionLoading({ ...actionLoading, reset: false });
    }
  };

  const handleDelete = async () => {
    setActionLoading({ ...actionLoading, delete: true });
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/permanent-journey/ticket/delete`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setTicket(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Failed to delete ticket");
    } finally {
      setActionLoading({ ...actionLoading, delete: false });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const downloadQRAsPDF = () => {
    if (!ticket?.qr_code) return;

    const pdf = new jsPDF();
    const img = new Image();
    img.src = ticket.qr_code;

    img.onload = () => {
      // Calculate dimensions to center the QR code
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const qrSize = 100; // Size of QR code in the PDF
      const x = (pageWidth - qrSize) / 2;
      const y = (pageHeight - qrSize) / 2 - 20;

      // Add QR code image
      pdf.addImage(img, "PNG", x, y, qrSize, qrSize);

      // Add title
      pdf.setFontSize(16);
      pdf.text("Permanent Journey Ticket", pageWidth / 2, 20, {
        align: "center",
      });

      // Add ticket details
      pdf.setFontSize(12);
      pdf.text(`Ticket ID: ${ticket.uuid}`, pageWidth / 2, y + qrSize + 15, {
        align: "center",
      });
      pdf.text(
        `Valid until: ${new Date(ticket.expiry_date).toLocaleDateString()}`,
        pageWidth / 2,
        y + qrSize + 25,
        { align: "center" }
      );

      // Save the PDF
      pdf.save(`permanent-ticket-${ticket.uuid}.pdf`);
    };
  };

  if (loading) {
    return <PermanentTicketSkeleton />;
  }

  // const renderError = () => {
  //   if (!error) return null;

  //   let errorMessage = "";
  //   if (typeof error === "object") {
  //     if (error.error) {
  //       errorMessage = error.error;
  //       if (errorMessage.includes("minimum wallet balance")) {
  //         const years = formData.validity_years;
  //         errorMessage = `You need a minimum wallet balance of ${MIN_BALANCE[years]}.00 BDT for ${years} years.`;
  //       } else if (errorMessage.includes("Update charge required")) {
  //         errorMessage = `Ticket not updated because not enough balance. ${error.error}`;
  //       }
  //     } else {
  //       errorMessage = JSON.stringify(error);
  //     }
  //   } else {
  //     errorMessage = error.toString();
  //   }

  //   return (
  //     <div className="container mx-auto px-4 py-8 max-w-3xl">
  //       <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
  //         <div className="flex items-center">
  //           <div className="flex-shrink-0">
  //             <svg
  //               className="h-5 w-5 text-red-500"
  //               viewBox="0 0 20 20"
  //               fill="currentColor"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
  //                 clipRule="evenodd"
  //               />
  //             </svg>
  //           </div>
  //           <div className="ml-3">
  //             <h3 className="text-sm font-medium text-red-800">
  //               {errorMessage}
  //             </h3>
  //             {missingFields.length > 0 && (
  //               <div className="mt-2">
  //                 <p className="text-xs text-red-700">Missing fields in your profile:</p>
  //                 <ul className="list-disc list-inside text-xs text-red-700">
  //                   {missingFields.map((field) => (
  //                     <li key={field}>{field}</li>
  //                   ))}
  //                 </ul>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Permanent Journey Ticket
          </h1>
          <p className="text-sm text-gray-600">
            {!ticket
              ? "Create your permanent journey ticket"
              : "Manage your existing ticket"}
          </p>
        </div>

        {/* {renderError()} */}
        {alertMessage && (
          <StatusAlert statusCode={alertStatus} message={alertMessage} />
        )}

        {!ticket ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              Create New Ticket
            </h2>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Validity Period
                </label>
                <select
                  name="validity_years"
                  value={formData.validity_years}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value={2}>2 Years (100 BDT)</option>
                  <option value={5}>5 Years (200 BDT)</option>
                  <option value={10}>10 Years (300 BDT)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Your wallet will be charged{" "}
                  {MIN_BALANCE[formData.validity_years]} BDT
                </p>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Telegram Number (Optional)
                </label>
                <input
                  type="text"
                  name="telegram_number"
                  value={
                    formData.telegram_number
                  }
                  onChange={handleChange}
                  placeholder="e.g. 01712345678"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Provide your Telegram number for notifications
                </p>
              </div>

              <button
                type="submit"
                disabled={actionLoading.create}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex justify-center items-center text-sm"
              >
                {actionLoading.create ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Create Permanent Ticket"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-3 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 sm:mb-0">
                  Your Ticket Details
                </h2>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                  Active until{" "}
                  {new Date(ticket.expiry_date).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Ticket ID
                  </p>
                  <p className="text-sm font-medium text-gray-800 break-all">
                    {ticket.uuid}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Validity
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {ticket.validity_years} Years
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Created
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(ticket.updated_at).toLocaleDateString()}
                  </p>
                </div>
                {ticket.telegram_number && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Telegram Number
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {ticket.telegram_number}
                    </p>
                  </div>
                )}
              </div>

              {ticket.qr_code && (
                <div className="flex flex-col items-center mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    QR Code
                  </p>
                  <div className="p-2 bg-white border border-gray-200 rounded-md shadow-xs">
                    <img
                      src={ticket.qr_code}
                      alt="Ticket QR Code"
                      className="w-40 h-40"
                    />
                  </div>
                  <button
                    onClick={downloadQRAsPDF}
                    className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-500 hover:underline flex items-center cursor-pointer"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download QR Code as PDF
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Update Ticket
              </h2>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Change Validity Period
                  </label>
                  <select
                    name="validity_years"
                    value={formData.validity_years}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value={2}>2 Years (100 BDT)</option>
                    <option value={5}>5 Years (200 BDT)</option>
                    <option value={10}>10 Years (300 BDT)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.validity_years !== ticket.validity_years && (
                      <>
                        Update charge:{" "}
                        {Math.abs(
                          MIN_BALANCE[formData.validity_years] -
                            MIN_BALANCE[ticket.validity_years]
                        )}
                        .00 BDT
                      </>
                    )}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={
                    actionLoading.update ||
                    formData.validity_years === ticket.validity_years
                  }
                  className={`w-full text-white py-2 px-4 rounded-md transition duration-200 mb-4 flex justify-center items-center text-sm ${
                    formData.validity_years === ticket.validity_years
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {actionLoading.update ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating...
                    </>
                  ) : formData.validity_years === ticket.validity_years ? (
                    "No changes to update"
                  ) : (
                    "Update Validity Period"
                  )}
                </button>
              </form>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleReset}
                  disabled={actionLoading.reset}
                  className="flex-1 bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition duration-200 flex justify-center items-center text-sm"
                >
                  {actionLoading.reset ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Resetting...
                    </>
                  ) : (
                    "Reset Ticket UUID"
                  )}
                </button>

                <button
                  onClick={handleDelete}
                  disabled={actionLoading.delete}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 flex justify-center items-center text-sm"
                >
                  {actionLoading.delete ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Delete Ticket"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermanentTicketPage;
