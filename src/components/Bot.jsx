import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiMessageSquare } from 'react-icons/fi';
import BotImage from "../assets/bot.png";
import { useLocation } from 'react-router-dom';

const Bot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const location=useLocation();


  
  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    const userMessage = { sender: 'user', text: message };
    setConversation(prev => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await axios.post(
        'https://metro-rail-smart-ticket.onrender.com/chatbot/api/customer-care',
        { user_question: message }
      );
      
      const botMessage = { sender: 'bot', text: response.data.response };
      setConversation(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." };
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (
    location.pathname === "/userdashboard" ||
    location.pathname.startsWith("/dashboard")
  )
    return null;

  return (
    <div className="fixed bottom-8 md:right-8 z-50">
      {/* Bot Icon Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 500);
        }}
        className="w-16 h-16 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center"
        style={{ display: isOpen ? 'none' : 'flex' }}
        aria-label="Open chat bot"
      >
        <img 
          src={BotImage} 
          alt="Chatbot" 
          className="w-full h-full object-cover"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0,
              scale: 0.5,
              transformOrigin: 'bottom right',
              x: 100,
              y: 100
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              transition: { 
                type: 'spring',
                damping: 25,
                stiffness: 300
              }
            }}
            exit={{ 
              opacity: 0,
              scale: 0.5,
              x: 100,
              y: 100,
              transition: { 
                duration: 0.2 
              }
            }}
            className="w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FiMessageSquare className="w-6 h-6" />
                <h3 className="font-semibold">Metro Support</h3>
              </div>
              <motion.button 
                onClick={() => setIsOpen(false)}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-full hover:bg-indigo-700 transition"
                aria-label="Close chat"
              >
                <FiX className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Conversation */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {conversation.length === 0 ? (
                <div className="text-center text-gray-500 h-full flex items-center justify-center">
                  <p>How can I help you today?</p>
                </div>
              ) : (
                conversation.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </motion.div>
                ))
              )}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-xs">
                    <div className="flex space-x-2">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ref={inputRef}
                  autoFocus
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  <FiSend className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bot;