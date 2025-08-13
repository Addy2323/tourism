import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
}

const FlightBookingModal: React.FC<ModalProps> = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-8">
          {!isSubmitted ? (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Flight Booking Assistance</h2>
              <p className="text-gray-600 mb-6">
                Let our experts handle the hassle of finding the best flights for your Tanzanian adventure. Fill out the form below, and we'll get back to you with personalized flight options.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700">Travel Details</label>
                  <textarea id="details" rows={3} placeholder="e.g., preferred departure airport, travel dates, number of passengers" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 font-medium">
                  <Send className="w-5 h-5" />
                  <span>Request Flight Options</span>
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-emerald-600 mb-4">Request Sent!</h2>
              <p className="text-gray-600">Thank you! Our flight experts will be in touch with your personalized options shortly.</p>
              <button onClick={onClose} className="mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightBookingModal;