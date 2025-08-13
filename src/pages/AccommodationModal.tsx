import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ModalProps {
  onClose: () => void;
}

const accommodations = [
  { name: 'Luxury Safari Lodges', image: 'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Experience the wild in ultimate comfort and style.' },
  { name: 'Boutique Beach Resorts', image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Relax on pristine beaches with world-class amenities.' },
  { name: 'Authentic Tented Camps', image: 'https://images.pexels.com/photos/2397653/pexels-photo-2397653.jpeg?auto=compress&cs=tinysrgb&w=400', description: 'Get closer to nature without sacrificing comfort.' },
];

const AccommodationModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Accommodations</h2>
          <p className="text-gray-600 mb-6">
            We offer a curated selection of accommodations to suit every style and budget. Here's a glimpse of what you can expect.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {accommodations.map(acc => (
              <div key={acc.name} className="border rounded-lg overflow-hidden">
                <img src={acc.image} alt={acc.name} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800">{acc.name}</h3>
                  <p className="text-sm text-gray-500">{acc.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
             <Link to="/destinations" onClick={onClose} className="inline-block py-3 px-6 border border-transparent rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 font-medium">
                Explore All Destinations
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationModal;