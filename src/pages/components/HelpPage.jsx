import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Contact from "../../components/Contact";

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I buy a metro ticket using the system?",
      answer: "You can buy a ticket either from the web application or directly through our Telegram bot. Just enter your start and destination stations, number of tickets, and Telegram number, then proceed with payment through SSLCOMMERZ. A QR code will be sent to your Telegram inbox instantly."
    },
    {
      question: "What is the difference between a single journey ticket and a permanent ticket?",
      answer: "A single journey ticket is valid for one-time use and doesn't require an account. A permanent ticket is for frequent travelers—it requires account registration, allows wallet top-ups, and generates a reusable QR code that auto-deducts fare based on travel distance."
    },
    {
      question: "Is the QR code valid forever once I buy a ticket?",
      answer: "No. Single journey QR codes are valid for 2 hours only. This helps prevent misuse and ensures system efficiency. Permanent ticket holders can reuse their QR code, but the system will check wallet balance and validate the trip in real-time."
    },
    {
      question: "How does the system detect fare and prevent fraud?",
      answer: "Our system uses an Automated Fare Collection (AFC) mechanism (simulated via Telegram scanner) that verifies your QR code at both entry and exit points. If a user travels further than their booked destination, the system flags it and applies a penalty."
    },
    {
      question: "What happens if my internet is down or I lose my QR code?",
      answer: "If you're using a permanent ticket, your QR code is saved in your dashboard and can be regenerated anytime. For single journey users, make sure to download your QR immediately after purchase or access it via Telegram. An internet connection is needed to receive tickets, so ensure access before traveling."
    }
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Help Center</h1>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className={`w-full flex justify-between items-center p-4 text-left ${activeIndex === index ? 'bg-primary/10' : 'bg-white'}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-primary transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-40' : 'max-h-0'}`}
                >
                  <div className="p-4 bg-gray-50 text-gray-600 border-t border-gray-200">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-4">Our customer support team is available 24/7 to assist you.</p>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            Contact Support
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <Dialog
        open={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl rounded-xl bg-white">
            <div className="relative">
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              
              {/* Modified Contact component for modal */}
                <Contact isModal={true} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default HelpPage;