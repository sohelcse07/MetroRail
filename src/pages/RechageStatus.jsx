import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

const RechageStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(true);
  const [status, setStatus] = useState(null);
  const [amount, setAmount] = useState(0);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const statusParam = searchParams.get('status');
    const amountParam = parseFloat(searchParams.get('amount') || 0);
    const tranIdParam = searchParams.get('tran_id') || '';

    setStatus(statusParam);
    setAmount(amountParam);
    setTransactionId(tranIdParam);
  }, [location]);

  const handleBackToDashboard = () => {
    navigate('/dashboard/recharge');
  };

  const getStatusDetails = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-20 h-20 text-green-500" />,
          title: 'Payment Successful!',
          message: `Your payment of ৳${amount.toFixed(2)} has been processed successfully.`,
          bgColor: 'bg-green-50',
          textColor: 'text-green-600',
          buttonColor: 'bg-green-600 hover:bg-green-700',
        };
      case 'fail':
        return {
          icon: <XCircle className="w-20 h-20 text-red-500" />,
          title: 'Payment Failed',
          message: 'We couldn\'t process your payment. Please try again.',
          bgColor: 'bg-red-50',
          textColor: 'text-red-600',
          buttonColor: 'bg-red-600 hover:bg-red-700',
        };
      default:
        return {
          icon: <XCircle className="w-20 h-20 text-gray-500" />,
          title: 'Payment Status Unknown',
          message: 'We couldn\'t determine your payment status.',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          buttonColor: 'bg-gray-600 hover:bg-gray-700',
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`relative max-w-md w-full rounded-xl shadow-xl overflow-hidden ${statusDetails.bgColor}`}
          >
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                {statusDetails.icon}
              </div>
              
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`text-2xl font-bold mb-3 ${statusDetails.textColor}`}
              >
                {statusDetails.title}
              </motion.h2>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 mb-6"
              >
                {statusDetails.message}
              </motion.p>

              {transactionId && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-lg p-3 mb-6 text-sm text-gray-700 font-mono break-all"
                >
                  Transaction ID: {transactionId}
                </motion.div>
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={handleBackToDashboard}
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${statusDetails.buttonColor} transition-colors`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Recharge
                </button>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-opacity-30 bg-white"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-opacity-10 bg-black"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            {status === 'success' ? '✓' : '✕'}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RechageStatus;