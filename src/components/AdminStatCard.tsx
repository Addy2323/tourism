import React from 'react';

interface AdminStatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const colorClasses = {
  emerald: 'bg-emerald-100 text-emerald-600',
  blue: 'bg-blue-100 text-blue-600',
  amber: 'bg-amber-100 text-amber-600',
  green: 'bg-green-100 text-green-600',
};

const AdminStatCard: React.FC<AdminStatCardProps> = ({ title, value, change, icon, color }) => {
  const cardColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.emerald;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-2">{change}</p>
      </div>
      <div className={`p-4 rounded-full ${cardColor}`}>
        {icon}
      </div>
    </div>
  );
};

export default AdminStatCard;
