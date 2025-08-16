import React, { useState } from 'react';
import { Calendar, MapPin, Heart, Star, Bell, Settings, Briefcase, User, Award, Camera, Edit3, Phone, Mail, Globe, CreditCard, Gift, TrendingUp, Clock, CheckCircle, AlertCircle, Plus, Filter, Search } from 'lucide-react';
import { mockBookings } from '../data/mockData';
import BookingCard from '../components/BookingCard.tsx';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'bookings':
        return <BookingsTab />;
      case 'saved':
        return <SavedTripsTab />;
      case 'profile':
        return <ProfileTab />;
      case 'rewards':
        return <RewardsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen pt-20 lg:pt-24">
      <div className="container-mobile py-6 lg:py-8">
        {/* Professional Header with Fixed Layout */}
        <header className="bg-white rounded-2xl shadow-classic p-6 lg:p-8 mb-8 border border-gray-100">
          <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:justify-between lg:items-start">
            {/* User Profile Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  SJ
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 truncate">Sarah Johnson</h1>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full self-start">
                    Premium Member
                  </span>
                </div>
                <p className="text-gray-600 mb-2 text-sm lg:text-base">Explorer • Member since January 2023</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                    3 trips completed
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-500 flex-shrink-0" />
                    4.9 rating
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons Section */}
            <div className="flex items-center justify-start lg:justify-end gap-3 flex-shrink-0">
              <button className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
                <Plus size={16} />
                <span className="hidden sm:inline">Book Trip</span>
                <span className="sm:hidden">Book</span>
              </button>
            </div>
          </div>
        </header>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCardPrimary 
            icon={Calendar} 
            title="Next Adventure" 
            value="Serengeti Safari" 
            subtitle="Dec 15, 2024"
            gradient="from-emerald-600 to-emerald-700"
          />
          <StatCard 
            icon={MapPin} 
            title="Countries Visited" 
            value="12" 
            change="+2 this year"
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard 
            icon={Heart} 
            title="Wishlist" 
            value="8" 
            change="2 new saves"
            color="text-rose-600"
            bgColor="bg-rose-50"
          />
          <StatCard 
            icon={Award} 
            title="Rewards Points" 
            value="2,450" 
            change="+150 this month"
            color="text-amber-600"
            bgColor="bg-amber-50"
          />
        </div>

        {/* Professional Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-classic border border-gray-100 p-2 mb-8">
          <nav className="flex items-center overflow-x-auto">
            <div className="flex space-x-1 min-w-max">
              <TabButton icon={TrendingUp} label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
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

// Enhanced Stat Card Components
const StatCardPrimary: React.FC<{ 
  icon: React.ElementType; 
  title: string; 
  value: string; 
  subtitle?: string;
  gradient: string;
}> = ({ icon: Icon, title, value, subtitle, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
    <div className="flex items-start justify-between mb-4">
      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-right">
        <p className="text-sm font-medium opacity-90">{title}</p>
        <p className="text-xl font-bold">{value}</p>
        {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
      </div>
    </div>
  </div>
);

const StatCard: React.FC<{ 
  icon: React.ElementType; 
  title: string; 
  value: string; 
  change?: string;
  color: string;
  bgColor: string;
}> = ({ icon: Icon, title, value, change, color, bgColor }) => (
  <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-classic hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-start justify-between mb-4">
      <div className={`${bgColor} p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && <p className="text-xs text-emerald-600 mt-1">{change}</p>}
      </div>
    </div>
  </div>
);

// Enhanced Tab Button
const TabButton: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
      isActive 
        ? 'bg-emerald-600 text-white shadow-lg' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

// Overview Tab - New comprehensive dashboard view
const OverviewTab: React.FC = () => (
  <div className="space-y-8">
    {/* Quick Actions */}
    <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard 
          icon={Plus} 
          title="Book New Trip" 
          description="Discover amazing destinations"
          color="bg-emerald-600"
        />
        <QuickActionCard 
          icon={Search} 
          title="Explore Destinations" 
          description="Find your next adventure"
          color="bg-blue-600"
        />
        <QuickActionCard 
          icon={Gift} 
          title="Redeem Rewards" 
          description="Use your points"
          color="bg-amber-600"
        />
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
        <button className="text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
      </div>
      <div className="space-y-4">
        <ActivityItem 
          icon={CheckCircle}
          title="Trip to Zanzibar completed"
          time="2 days ago"
          color="text-emerald-600"
        />
        <ActivityItem 
          icon={Heart}
          title="Saved Kilimanjaro Trek"
          time="1 week ago"
          color="text-rose-600"
        />
        <ActivityItem 
          icon={Award}
          title="Earned 150 reward points"
          time="2 weeks ago"
          color="text-amber-600"
        />
      </div>
    </div>

    {/* Upcoming Trips Preview */}
    <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Upcoming Adventures</h3>
        <button className="text-emerald-600 hover:text-emerald-700 font-medium">View All Bookings</button>
      </div>
      <div className="space-y-4">
        {mockBookings.slice(0, 2).map(booking => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  </div>
);

// Enhanced Bookings Tab
const BookingsTab: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <Filter size={16} />
          Filter
        </button>
        <button className="btn-primary flex items-center gap-2">
          <Calendar size={16} />
          Book New Trip
        </button>
      </div>
    </div>
    <div className="space-y-6">
      {mockBookings.map(booking => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  </div>
);

// Professional Saved Trips Tab
const SavedTripsTab: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Saved Trips</h2>
      <span className="text-gray-500">8 saved destinations</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(item => (
        <SavedTripCard key={item} />
      ))}
    </div>
  </div>
);

// Comprehensive Profile Tab
const ProfileTab: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Personal Information */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
          <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
            <Edit3 size={16} />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField label="Full Name" value="Sarah Johnson" />
          <ProfileField label="Email" value="sarah.johnson@email.com" />
          <ProfileField label="Phone" value="+1 (555) 123-4567" />
          <ProfileField label="Date of Birth" value="March 15, 1990" />
          <ProfileField label="Nationality" value="United States" />
          <ProfileField label="Passport Number" value="US123456789" />
        </div>
      </div>

      {/* Travel Preferences */}
      <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Travel Preferences</h3>
        <div className="space-y-4">
          <PreferenceItem label="Trip Style" value="Adventure & Wildlife" />
          <PreferenceItem label="Budget Range" value="$2,000 - $5,000" />
          <PreferenceItem label="Group Size" value="Small Groups (2-8)" />
          <PreferenceItem label="Accommodation" value="Mid-range to Luxury" />
        </div>
      </div>
    </div>

    {/* Emergency Contacts */}
    <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Emergency Contacts</h3>
        <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
          <Plus size={16} />
          Add Contact
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmergencyContact name="John Johnson" relation="Spouse" phone="+1 (555) 987-6543" />
        <EmergencyContact name="Mary Johnson" relation="Mother" phone="+1 (555) 456-7890" />
      </div>
    </div>
  </div>
);

// Professional Rewards Tab
const RewardsTab: React.FC = () => (
  <div className="space-y-8">
    {/* Rewards Overview */}
    <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">2,450 Points</h2>
          <p className="opacity-90">You're 550 points away from Gold status!</p>
        </div>
        <div className="text-right">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <Award className="w-8 h-8 mb-2" />
            <p className="text-sm font-medium">Silver Member</p>
          </div>
        </div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1">
        <div className="bg-white rounded-lg h-3 relative overflow-hidden">
          <div className="bg-amber-500 h-full w-4/5 rounded-lg"></div>
        </div>
      </div>
    </div>

    {/* Rewards Actions */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Redeem Points</h3>
        <div className="space-y-4">
          <RewardItem title="$50 Trip Credit" points="500 points" />
          <RewardItem title="Free Airport Transfer" points="300 points" />
          <RewardItem title="Upgrade to Premium Room" points="800 points" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Points History</h3>
        <div className="space-y-4">
          <PointsHistory action="Trip to Zanzibar" points="+150" date="Dec 1" />
          <PointsHistory action="Referral Bonus" points="+100" date="Nov 28" />
          <PointsHistory action="Review Bonus" points="+25" date="Nov 25" />
        </div>
      </div>
    </div>
  </div>
);

// Helper Components
const QuickActionCard: React.FC<{ icon: React.ElementType; title: string; description: string; color: string }> = 
({ icon: Icon, title, description, color }) => (
  <button className={`${color} text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left`}>
    <Icon className="w-8 h-8 mb-3" />
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm opacity-90">{description}</p>
  </button>
);

const ActivityItem: React.FC<{ icon: React.ElementType; title: string; time: string; color: string }> = 
({ icon: Icon, title, time, color }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
    <Icon className={`w-5 h-5 ${color}`} />
    <div className="flex-1">
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
);

const SavedTripCard: React.FC = () => (
  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
    <h4 className="font-semibold text-gray-900 mb-2">Kilimanjaro Trek</h4>
    <p className="text-sm text-gray-600 mb-3">5 days • From $2,499</p>
    <button className="w-full btn-primary text-sm">View Details</button>
  </div>
);

const ProfileField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
    <p className="text-gray-900 font-medium">{value}</p>
  </div>
);

const PreferenceItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

const EmergencyContact: React.FC<{ name: string; relation: string; phone: string }> = ({ name, relation, phone }) => (
  <div className="p-4 bg-gray-50 rounded-xl">
    <h4 className="font-semibold text-gray-900">{name}</h4>
    <p className="text-sm text-gray-600">{relation}</p>
    <p className="text-sm text-gray-900 mt-1">{phone}</p>
  </div>
);

const RewardItem: React.FC<{ title: string; points: string }> = ({ title, points }) => (
  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
    <span className="font-medium text-gray-900">{title}</span>
    <span className="text-emerald-600 font-semibold">{points}</span>
  </div>
);

const PointsHistory: React.FC<{ action: string; points: string; date: string }> = ({ action, points, date }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
    <div>
      <p className="font-medium text-gray-900">{action}</p>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <span className="text-emerald-600 font-semibold">{points}</span>
  </div>
);

export default UserDashboard;
