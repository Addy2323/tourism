import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
}

const ConsultationModal: React.FC<ModalProps> = ({ onClose }) => {
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Book an Expert Consultation</h2>
              <p className="text-gray-600 mb-6">
                Have questions? Want to fine-tune your itinerary? Schedule a free, no-obligation call with one of our Tanzania travel specialists.
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
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700">What would you like to discuss?</label>
                  <textarea id="topic" rows={3} placeholder="e.g., Safari options, best time to visit, specific interests" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 font-medium">
                  <Calendar className="w-5 h-5" />
                  <span>Request a Call</span>
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-emerald-600 mb-4">Request Received!</h2>
              <p className="text-gray-600">We'll be in touch via email shortly to schedule your consultation.</p>
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

export default ConsultationModal;