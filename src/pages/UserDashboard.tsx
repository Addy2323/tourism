import React, { useState } from 'react';
import { Calendar, MapPin, Heart, Star, Bell, Settings, Briefcase, User, Award } from 'lucide-react';
import { mockBookings } from '../data/mockData';
import BookingCard from '../components/BookingCard.tsx';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return <BookingsTab />;
      case 'saved':
        return <div className="p-6"><h2 className="text-xl font-semibold">Saved Trips</h2><p>Your saved trips will appear here.</p></div>;
      case 'profile':
        return <div className="p-6"><h2 className="text-xl font-semibold">Profile</h2><p>Your profile information will appear here.</p></div>;
      case 'rewards':
        return <div className="p-6"><h2 className="text-xl font-semibold">Rewards</h2><p>Your rewards points and history will appear here.</p></div>;
      default:
        return <BookingsTab />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              SJ
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, Sarah Johnson!</h1>
              <p className="text-gray-500">Member since 2023 • 3 trips completed</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button className="btn-secondary flex items-center gap-2"><Bell size={16} /> Notifications</button>
            <button className="btn-secondary flex items-center gap-2"><Settings size={16} /> Settings</button>
          </div>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCardPrimary icon={Calendar} title="Next Trip" value="Serengeti Safari" />
          <StatCard icon={MapPin} title="Total Trips" value="3" />
          <StatCard icon={Heart} title="Saved Trips" value="2" />
          <StatCard icon={Star} title="Rewards Points" value="2,450" />
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mb-8">
          <nav className="flex items-center justify-between">
            <div className="flex space-x-2">
                <TabButton icon={Briefcase} label="My Bookings" isActive={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
                <TabButton icon={Heart} label="Saved Trips" isActive={activeTab === 'saved'} onClick={() => setActiveTab('saved')} />
                <TabButton icon={User} label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                <TabButton icon={Award} label="Rewards" isActive={activeTab === 'rewards'} onClick={() => setActiveTab('rewards')} />
            </div>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Stat Card Components
const StatCardPrimary: React.FC<{ icon: React.ElementType; title: string; value: string }> = ({ icon: Icon, title, value }) => (
  <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg flex items-center gap-4">
    <div className="bg-white/20 p-3 rounded-lg">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const StatCard: React.FC<{ icon: React.ElementType; title: string; value: string }> = ({ icon: Icon, title, value }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex items-center gap-4">
    <div className="bg-gray-100 p-3 rounded-lg text-emerald-600">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// Tab Button Component
const TabButton: React.FC<{ icon: React.ElementType; label: string; isActive: boolean; onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'}`}>
    <Icon size={16} />
    {label}
  </button>
);

// Bookings Tab Content
const BookingsTab: React.FC = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">My Bookings</h2>
      <button className="btn-accent flex items-center gap-2">
        <Calendar size={16} />
        Book New Trip
      </button>
    </div>
    <div className="space-y-6">
      {mockBookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  </div>
);

export default UserDashboard;
