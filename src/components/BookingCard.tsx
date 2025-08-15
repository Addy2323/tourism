import React from 'react';
import { MapPin, Calendar, DollarSign, Users, User, Download, Mail, Star } from 'lucide-react';
import { Booking } from '../data/mockData';

interface BookingCardProps {
  booking: Booking;
}

const statusStyles: { [key: string]: string } = {
  Confirmed: 'bg-emerald-100 text-emerald-800',
  Pending: 'bg-amber-100 text-amber-800',
  Completed: 'bg-gray-200 text-gray-800',
};

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { title, location, dates, price, guests, guide, status, image } = booking;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6 p-6 hover:shadow-md transition-shadow duration-300">
      <img src={image} alt={title} className="w-full md:w-1/3 h-48 object-cover rounded-lg" />
      <div className="flex-1 flex flex-col">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
              {status}
            </span>
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-2" /> {location}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-emerald-600" /> Dates: {dates}</div>
            <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-emerald-600" /> Guests: {guests}</div>
            <div className="flex items-center"><DollarSign className="w-4 h-4 mr-2 text-emerald-600" /> Price: ${price.toLocaleString()}</div>
            <div className="flex items-center"><User className="w-4 h-4 mr-2 text-emerald-600" /> Guide: {guide}</div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            Download Itinerary
          </button>
          {status === 'Completed' ? (
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Star className="w-4 h-4" />
              Write Review
            </button>
          ) : (
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Mail className="w-4 h-4" />
              Contact Guide
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
