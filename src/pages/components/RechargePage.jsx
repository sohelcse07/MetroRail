import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const WalletComponent = () => {
  const { token } = useAuth();
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState({
    balance: true,
    history: true,
    payment: false
  });
  const [error, setError] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(500);
  const [paymentUrl, setPaymentUrl] = useState(null);

  // Fetch wallet balance
  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/wallet/balance/show`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      setBalance(response.data.balance);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch balance");
    } finally {
      setLoading(prev => ({...prev, balance: false}));
    }
  };

  // Fetch recharge history
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/wallet/recharge/history`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      setHistory(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch history");
    } finally {
      setLoading(prev => ({...prev, history: false}));
    }
  };

  // Initiate payment
  const initiatePayment = async (e) => {
    e.preventDefault();
    setLoading(prev => ({...prev, payment: true}));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/wallet/recharge/initiate`,
        { amount: paymentAmount },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      setPaymentUrl(response.data.payment_url);
      // Redirect to payment URL
      window.location.href = response.data.payment_url;
    } catch (err) {
      setError(err.response?.data || "Failed to initiate payment");
    } finally {
      setLoading(prev => ({...prev, payment: false}));
    }
  };

  useEffect(() => {
    if (token) {
      fetchBalance();
      fetchHistory();
    }
  }, [token]);

  if (loading.balance || loading.history) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              {typeof error === 'object' ? JSON.stringify(error) : error.toString()}
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Wallet</h1>
        </div>

        {/* Flex row for Balance Card and Recharge Form */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Balance Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-1">Current Balance</h2>
                <p className="text-3xl font-bold text-indigo-600">
                  ৳{balance.toFixed(2)}
                </p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-full">
                <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Recharge Form */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Recharge Wallet</h2>
            <form onSubmit={initiatePayment}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (BDT)
                </label>
                <input
                  type="number"
                  min="10"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading.payment}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 flex justify-center items-center"
              >
                {loading.payment ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : "Proceed to Payment"}
              </button>
            </form>
          </div>
        </div>

        {/* Transaction History - Full width column */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recharge History</h2>
          {history.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recharge history found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ৳{transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.card_issuer || transaction.card_type || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'SUCCESS' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(transaction.tran_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;