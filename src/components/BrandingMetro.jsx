import React, { useState } from 'react';
import TrainSvg from '../components/TrainSvg';
import { Train, Ticket, Scan, QrCode, Smartphone, Clock, Zap, UserCheck } from 'lucide-react';

const BrandingMetro = () => {
  const [ticketType, setTicketType] = useState('single');
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Train className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MetroLink</h1>
                <p className="text-sm text-gray-600">Seamless Urban Mobility</p>
              </div>
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Next Generation Ticketing
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Digital Metro Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revolutionizing urban transport with QR-based tickets and permanent travel passes. 
            No more lost cards, just seamless journeys.
          </p>
        </div>

        {/* Ticket Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Ticket Selection */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setTicketType('single')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${ticketType === 'single' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <Ticket className={`h-8 w-8 mb-2 ${ticketType === 'single' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${ticketType === 'single' ? 'text-blue-600' : 'text-gray-600'}`}>Single Journey</span>
                <span className="text-sm text-gray-500">One-time use</span>
              </button>
              
              <button
                onClick={() => setTicketType('permanent')}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${ticketType === 'permanent' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <Clock className={`h-8 w-8 mb-2 ${ticketType === 'permanent' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${ticketType === 'permanent' ? 'text-blue-600' : 'text-gray-600'}`}>Permanent Pass</span>
                <span className="text-sm text-gray-500">Unlimited travel</span>
              </button>
            </div>

            {/* Ticket Details */}
            {ticketType === 'single' ? (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Single Journey Features</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <QrCode className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span>QR code generated instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Scan className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span>Scan at station gates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <UserCheck className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span>Valid for one journey within 2 hours</span>
                  </li>
                </ul>
                
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Permanent Pass Benefits</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <QrCode className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span>One-time QR setup in Telegram bot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Scan className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span>Daily automatic validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <UserCheck className="h-5 w-5 text-blue-500 mt-0.5" />
                    <span>Unlimited travel for selected duration</span>
                  </li>
                </ul>
               
              </div>
            )}
          </div>

          {/* QR Display */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
            {showQR ? (
              <>
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    {/* Placeholder for QR code */}
                    <QrCode className="h-32 w-32 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {ticketType === 'single' ? 'Your Journey Ticket' : 'Your Permanent Pass'}
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  {ticketType === 'single' 
                    ? 'Scan this QR code at station gates.'
                    : ' QR for Telegram bot for automatic daily validation.'}
                </p>
                
              </>
            ) : (
              <>
                <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <QrCode className="h-20 w-20 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Digital Metro Ticket
                </h3>
                <p className="text-gray-600 text-center">
                  {ticketType === 'single' 
                    ? 'Generate a QR code for your single journey ticket'
                    : 'Setup your permanent travel pass with our Telegram bot'}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Train Visualization */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">MetroLink Trains</h3>
              <p className="text-sm text-gray-500">Fully digital ticket validation</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 overflow-x-auto">
            <TrainSvg />
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">How Digital Ticketing Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Get Your Ticket</h4>
              <p className="text-gray-600">
                Purchase single journey or permanent pass directly in our app or Telegram bot
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Receive QR Code</h4>
              <p className="text-gray-600">
                Instant digital ticket delivered to your device - no physical card needed
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scan className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Scan & Travel</h4>
              <p className="text-gray-600">
                Simply scan at station gates - automatic validation for permanent passes
              </p>
            </div>
          </div>
        </div>

      
      </main>

    
    </div>
  );
}

export default BrandingMetro;