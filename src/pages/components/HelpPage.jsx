import React, { useState } from "react";

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I recharge my account?",
      answer: "Go to the Recharge page from the main menu, enter the amount you wish to recharge, select your payment method, and confirm the transaction."
    },
    {
      question: "How do I transfer my balance?",
      answer: "Navigate to the Balance Transfer page, enter the recipient's card number or phone number, specify the amount, and confirm the transfer."
    },
    {
      question: "What should I do if my card is lost or stolen?",
      answer: "Immediately go to the Card Management section and select 'Block Card'. Then contact customer support to report the incident and request a replacement."
    },
    {
      question: "How can I check my travel history?",
      answer: "Your complete travel history is available in the 'Journeys' section of the app, showing all your completed trips with details like date, time, and fare."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit/debit cards, mobile banking (bKash, Nagad, Rocket), and cash payments at designated stations."
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
          <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;