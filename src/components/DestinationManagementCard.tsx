import React from 'react';
import { Star, Edit, BarChart2 } from 'lucide-react';
import { DestinationData } from '../data/adminMockData';

interface DestinationManagementCardProps {
  destination: DestinationData;
}

const DestinationManagementCard: React.FC<DestinationManagementCardProps> = ({ destination }) => {
  const { name, bookings, revenue, rating, status } = destination;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-800'}`}>
          {status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Bookings</p>
          <p className="text-2xl font-bold text-gray-800">{bookings}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold text-gray-800">${revenue.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center text-amber-500 mb-6">
        <Star className="w-4 h-4 mr-1 fill-current" />
        <span className="font-semibold">{rating}</span>
        <span className="text-sm text-gray-500 ml-1">rating</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-secondary flex-1 flex items-center justify-center gap-2"><Edit size={14} /> Edit</button>
        <button className="btn-secondary flex-1 flex items-center justify-center gap-2"><BarChart2 size={14} /> Analytics</button>
      </div>
    </div>
  );
};

export default DestinationManagementCard;
