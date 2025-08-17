import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, Users, Briefcase, CheckCircle, Shield, Settings, Bell, BarChart3, Calendar, MapPin, Star, TrendingUp, UserCheck, AlertTriangle, Plus, Filter, Search, Edit3, Eye, Trash2, Download, Upload, Camera } from 'lucide-react';
import { adminStats, destinationData as initialDestinationData, DestinationData, userData as initialUserData, UserData } from '../data/adminMockData';
import AdminStatCard from '../components/AdminStatCard';
import DestinationManagementCard from '../components/DestinationManagementCard';
import RecentBookings from '../components/RecentBookings';
import TopDestinations from '../components/TopDestinations';
import AdminDestinationModal from '../components/AdminDestinationModal';
import AdminUserModal from '../components/AdminUserModal';
import AdminBookingModal from '../components/AdminBookingModal';
import type { BookingData } from '../components/AdminBookingModal';
import { useCurrency } from '../contexts/CurrencyContext';
import Price from '../components/Price';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const STORAGE_KEYS = {
    destinations: 'admin_destinations',
    users: 'admin_users',
    bookings: 'admin_bookings',
  } as const;

  // Admin avatar persistence
  const ADMIN_AVATAR_KEY = 'admin_avatar';
  const [adminAvatar, setAdminAvatar] = useState<string | null>(() => {
    try {
      return localStorage.getItem(ADMIN_AVATAR_KEY);
    } catch {
      return null;
    }
  });
  useEffect(() => {
    try {
      if (adminAvatar) localStorage.setItem(ADMIN_AVATAR_KEY, adminAvatar);
      else localStorage.removeItem(ADMIN_AVATAR_KEY);
    } catch {}
  }, [adminAvatar]);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const onPickAdminAvatar = () => avatarInputRef.current?.click();
  const onAdminAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (dataUrl) setAdminAvatar(dataUrl);
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = '';
  };

  const [destinations, setDestinations] = useState<DestinationData[]>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEYS.destinations);
      return s ? JSON.parse(s) : initialDestinationData;
    } catch {
      return initialDestinationData;
    }
  });

  const [users, setUsers] = useState<UserData[]>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEYS.users);
      return s ? JSON.parse(s) : initialUserData;
    } catch {
      return initialUserData;
    }
  });

  const [bookings, setBookings] = useState<BookingData[]>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEYS.bookings);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.destinations, JSON.stringify(destinations)); } catch {}
  }, [destinations]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users)); } catch {}
  }, [users]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings)); } catch {}
  }, [bookings]);

  const [destinationModalOpen, setDestinationModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<DestinationData | undefined>(undefined);
  const [editingUser, setEditingUser] = useState<UserData | undefined>(undefined);
  const [editingBooking, setEditingBooking] = useState<BookingData | undefined>(undefined);

  const handleDestinationSave = (destination: DestinationData) => {
    if (destination.id) {
      setDestinations(prev => prev.map(dest => dest.id === destination.id ? destination : dest));
    } else {
      const nextId = Math.max(0, ...destinations.map(d => d.id)) + 1;
      const newDestination = {
        ...destination,
        id: nextId,
        bookings: 0,
        revenue: 0,
        totalBookings: 0,
        rating: 0
      };
      setDestinations(prev => [...prev, newDestination]);
    }
    
    setDestinationModalOpen(false);
    setEditingDestination(undefined);
  };

  const handleDestinationDelete = (id: number) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
  };

  const handleUserSave = (user: UserData) => {
    if (user.id) {
      setUsers(prev => prev.map(u => u.id === user.id ? user : u));
    } else {
      const nextId = Math.max(0, ...users.map(u => u.id)) + 1;
      const newUser = { ...user, id: nextId };
      setUsers(prev => [...prev, newUser]);
    }
    
    setUserModalOpen(false);
    setEditingUser(undefined);
  };

  const handleUserDelete = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleBookingSave = (booking: BookingData) => {
    if (booking.id) {
      setBookings(prev => prev.map(b => b.id === booking.id ? booking : b));
    } else {
      const nextId = Math.max(0, ...bookings.map(b => b.id ?? 0)) + 1;
      setBookings(prev => [...prev, { ...booking, id: nextId }]);
    }
    setBookingModalOpen(false);
    setEditingBooking(undefined);
  };

  const handleBookingDelete = (id: number) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const openDestinationModal = (destination?: DestinationData) => {
    setEditingDestination(destination);
    setDestinationModalOpen(true);
  };

  const openUserModal = (user?: UserData) => {
    setEditingUser(user);
    setUserModalOpen(true);
  };

  const openBookingModal = (booking?: BookingData) => {
    setEditingBooking(booking);
    setBookingModalOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onAddDestination={() => openDestinationModal()} onAddUser={() => openUserModal()} onAddBooking={() => openBookingModal()} />;
      case 'bookings':
        return (
          <BookingsManagementTab 
            bookings={bookings}
            onAddBooking={() => openBookingModal()} 
            onEditBooking={openBookingModal}
            onDeleteBooking={handleBookingDelete}
          />
        );
      case 'users':
        return <UsersManagementTab users={users} onAddUser={() => openUserModal()} onEditUser={openUserModal} onDeleteUser={(u) => handleUserDelete(u.id)} />;
      case 'destinations':
        return <DestinationsTab destinations={destinations} onAddDestination={() => openDestinationModal()} onEditDestination={openDestinationModal} onDeleteDestination={(d) => handleDestinationDelete(d.id)} />;
      case 'analytics':
        return <AnalyticsTab />;
      default:
        return <OverviewTab onAddDestination={() => openDestinationModal()} onAddUser={() => openUserModal()} onAddBooking={() => openBookingModal()} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen pt-20 lg:pt-24">
      <div className="container-mobile py-6 lg:py-8">
        {/* Professional Admin Header */}
        <header className="bg-white rounded-2xl shadow-classic p-6 lg:p-8 mb-8 border border-gray-100">
          <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:justify-between lg:items-start">
            {/* Admin Profile Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1">
              <div className="relative flex-shrink-0">
                {adminAvatar ? (
                  <img
                    src={adminAvatar}
                    alt="Admin avatar"
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    <Shield size={32} />
                  </div>
                )}
                <button
                  type="button"
                  onClick={onPickAdminAvatar}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                  aria-label="Upload admin avatar"
                >
                  <Camera size={14} />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onAdminAvatarChange}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 truncate">Admin Dashboard</h1>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full self-start">
                    Super Admin
                  </span>
                </div>
                <p className="text-gray-600 mb-2 text-sm lg:text-base">System Administrator • Full Access</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users size={14} className="text-blue-500 flex-shrink-0" />
                    {users.length} total users
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} className="text-emerald-500 flex-shrink-0" />
                    89 active bookings
                  </span>
                </div>
              </div>
            </div>
            
            {/* Admin Action Buttons */}
            <div className="flex items-center justify-start lg:justify-end gap-3 flex-shrink-0">
              <button className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </button>
              <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button 
                onClick={() => openDestinationModal()}
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Destination</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </header>

        {/* Enhanced Admin Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminStatCardPrimary 
            icon={DollarSign} 
            title="Monthly Revenue" 
            value="$127,450" 
            numericValue={127450}
            subtitle="+12.5% from last month"
            gradient="from-emerald-600 to-emerald-700"
            isCurrency
          />
          <AdminStatCardLocal 
            icon={Users} 
            title="Total Users" 
            value={users.length.toString()} 
            numericValue={users.length}
            change="+23 this week"
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <AdminStatCardLocal 
            icon={Briefcase} 
            title="Active Bookings" 
            value="89" 
            numericValue={89}
            change="+5 today"
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
          <AdminStatCardLocal 
            icon={CheckCircle} 
            title="Completed Trips" 
            value="342" 
            numericValue={342}
            change="+18 this month"
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />
        </div>

        {/* Professional Admin Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-classic border border-gray-100 p-2 mb-8">
          <nav className="flex items-center overflow-x-auto">
            <div className="flex space-x-1 min-w-max">
              <AdminTabButton icon={BarChart3} label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
              <AdminTabButton icon={Briefcase} label="Bookings" isActive={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
              <AdminTabButton icon={Users} label="Users" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
              <AdminTabButton icon={MapPin} label="Destinations" isActive={activeTab === 'destinations'} onClick={() => setActiveTab('destinations')} />
              <AdminTabButton icon={TrendingUp} label="Analytics" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            </div>
          </nav>
        </div>

        {/* Tab Content with subtle transition */}
        <div key={activeTab} className="transition-all duration-300 ease-out opacity-100 translate-y-0 will-change-transform">
          {renderContent()}
        </div>

        {/* Modals */}
        <AdminDestinationModal
          isOpen={destinationModalOpen}
          onClose={() => {
            setDestinationModalOpen(false);
            setEditingDestination(undefined);
          }}
          destination={editingDestination}
          onSave={handleDestinationSave}
        />

        <AdminUserModal
          isOpen={userModalOpen}
          onClose={() => {
            setUserModalOpen(false);
            setEditingUser(undefined);
          }}
          user={editingUser}
          onSave={handleUserSave}
        />

        <AdminBookingModal
          isOpen={bookingModalOpen}
          onClose={() => {
            setBookingModalOpen(false);
            setEditingBooking(undefined);
          }}
          booking={editingBooking}
          onSave={handleBookingSave}
        />
      </div>
    </div>
  );
};

// Count-up hook
function useCountUp(target: number, duration = 1000, startOnView = true) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let raf = 0;
    let start = 0;
    let started = !startOnView;
    const el = ref.current;
    let io: IntersectionObserver | null = null;
    const run = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setValue(Math.floor(target * p));
      if (p < 1) raf = requestAnimationFrame(run);
    };
    const begin = () => {
      if (started) return;
      started = true;
      raf = requestAnimationFrame(run);
    };
    if (startOnView && el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) begin();
      }, { threshold: 0.2 });
      io.observe(el);
    } else {
      begin();
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (io && el) io.unobserve(el);
    };
  }, [target, duration, startOnView]);
  return { value, ref } as const;
}

// Enhanced Admin Stat Card Components
const AdminStatCardPrimary: React.FC<{ 
  icon: React.ElementType; 
  title: string; 
  value: string; 
  subtitle?: string;
  gradient: string;
  numericValue?: number; // optional for count-up
  prefix?: string;
  suffix?: string;
  isCurrency?: boolean;
}> = ({ icon: Icon, title, value, subtitle, gradient, numericValue, prefix = '', suffix = '', isCurrency = false }) => {
  const { value: n, ref } = useCountUp(numericValue ?? 0, 900);
  const { format } = useCurrency();
  const display = numericValue != null 
    ? (isCurrency ? `${format(numericValue ? n : 0)}` : `${prefix}${n.toLocaleString()}${suffix}`)
    : value;
  return (
    <div className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex items-start justify-between mb-4">
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right" ref={ref}>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-xl font-bold">{display}</p>
          {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

const AdminStatCardLocal: React.FC<{ 
  icon: React.ElementType; 
  title: string; 
  value: string; 
  change?: string;
  color: string;
  bgColor: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
}> = ({ icon: Icon, title, value, change, color, bgColor, numericValue, prefix = '', suffix = '' }) => {
  const { value: n, ref } = useCountUp(numericValue ?? 0, 800);
  const display = numericValue != null ? `${prefix}${n.toLocaleString()}${suffix}` : value;
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-classic hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right" ref={ref}>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{display}</p>
          {change && <p className="text-xs text-emerald-600 mt-1">{change}</p>}
        </div>
      </div>
    </div>
  );
};

// Enhanced Admin Tab Button
const AdminTabButton: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

// Admin Overview Tab
const OverviewTab: React.FC<{ 
  onAddDestination: () => void; 
  onAddUser: () => void; 
  onAddBooking: () => void;
}> = ({ onAddDestination, onAddUser, onAddBooking }) => (
  <div className="space-y-8">
    {/* Quick Admin Actions */}
    <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminQuickActionCard 
          icon={Plus} 
          title="Add Destination" 
          description="Create new tour package"
          color="bg-emerald-600"
          onClick={onAddDestination}
        />
        <AdminQuickActionCard 
          icon={UserCheck} 
          title="Verify Users" 
          description="Review pending accounts"
          color="bg-blue-600"
          onClick={onAddUser}
        />
        <AdminQuickActionCard 
          icon={Download} 
          title="Export Data" 
          description="Generate reports"
          color="bg-purple-600"
          onClick={() => console.log('Export data functionality')}
        />
        <AdminQuickActionCard 
          icon={AlertTriangle} 
          title="System Alerts" 
          description="Check notifications"
          color="bg-amber-600"
          onClick={() => console.log('System alerts functionality')}
        />
      </div>
    </div>

    {/* Recent Activity & Analytics */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium" onClick={onAddBooking}>View All</button>
        </div>
        <RecentBookings />
      </div>

      <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Top Destinations</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium">Manage</button>
        </div>
        <TopDestinations />
      </div>
    </div>

    {/* System Status */}
    <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">System Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SystemStatusItem title="Server Status" status="Online" color="text-emerald-600" />
        <SystemStatusItem title="Database" status="Healthy" color="text-emerald-600" />
        <SystemStatusItem title="Payment Gateway" status="Active" color="text-emerald-600" />
      </div>
    </div>
  </div>
);

// Bookings Management Tab
const BookingsManagementTab: React.FC<{ 
  bookings: BookingData[];
  onAddBooking: () => void; 
  onEditBooking: (booking: BookingData) => void;
  onDeleteBooking: (id: number) => void;
}> = ({ bookings, onAddBooking, onEditBooking, onDeleteBooking }) => (
  <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <Filter size={16} />
          Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <Download size={16} />
          Export
        </button>
        <button className="btn-primary flex items-center gap-2" onClick={onAddBooking}>
          <Plus size={16} />
          Add Booking
        </button>
      </div>
    </div>
    <div className="space-y-4">
      {bookings.length === 0 && (
        <div className="p-4 text-gray-500 border border-gray-200 rounded-xl">No bookings yet.</div>
      )}
      {bookings.map(b => (
        <BookingManagementItem key={b.id} booking={b} onEdit={onEditBooking} onDelete={() => onDeleteBooking(b.id!)} />
      ))}
    </div>
  </div>
);

// Users Management Tab
const UsersManagementTab: React.FC<{ 
  users: UserData[];
  onAddUser: () => void; 
  onEditUser: (user: UserData) => void;
  onDeleteUser: (user: UserData) => void;
}> = ({ users, onAddUser, onEditUser, onDeleteUser }) => (
  <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={onAddUser}>
          <Plus size={16} />
          Add User
        </button>
      </div>
    </div>
    <div className="space-y-4">
      {users.map(user => (
        <UserManagementItem key={user.id} user={user} onEdit={onEditUser} onDelete={() => onDeleteUser(user)} />
      ))}
    </div>
  </div>
);

const UserManagementItem: React.FC<{ 
  user: UserData;
  onEdit: (user: UserData) => void;
  onDelete: () => void;
}> = ({ user, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? Shield : Users;
  };

  const RoleIcon = getRoleIcon(user.role);

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${user.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'} rounded-xl flex items-center justify-center`}>
          <RoleIcon className={`w-6 h-6 ${user.role === 'admin' ? 'text-purple-600' : 'text-blue-600'}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900">{user.name}</h4>
            {user.verified && <CheckCircle className="w-4 h-4 text-emerald-600" />}
            {user.role === 'admin' && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                Admin
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">
            {user.email} • {user.membershipLevel} Member • {user.totalBookings} bookings
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
          {user.status}
        </span>
        <button 
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" 
          onClick={() => onEdit(user)}
        >
          <Edit3 size={16} />
        </button>
        <button 
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
          onClick={onDelete}
          aria-label="Delete user"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

// Destinations Tab
const DestinationsTab: React.FC<{ 
  destinations: DestinationData[];
  onAddDestination: () => void; 
  onEditDestination: (destination: DestinationData) => void;
  onDeleteDestination: (destination: DestinationData) => void;
}> = ({ destinations, onAddDestination, onEditDestination, onDeleteDestination }) => (
  <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Destinations Management</h2>
      <button className="btn-primary flex items-center gap-2" onClick={onAddDestination}>
        <Plus size={16} />
        Add Destination
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map(dest => (
        <DestinationManagementCard key={dest.id} destination={dest} onEdit={onEditDestination} onDelete={onDeleteDestination} />
      ))}
    </div>
  </div>
);

// Analytics Tab
const AnalyticsTab: React.FC = () => (
  <div className="space-y-8">
    <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Analytics</h3>
      <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Revenue Chart Placeholder</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">User Growth</h3>
        <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">User Growth Chart</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Destinations</h3>
        <div className="h-48 bg-gray-50 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">Destinations Chart</p>
        </div>
      </div>
    </div>
  </div>
);

// Helper Components
const AdminQuickActionCard: React.FC<{ 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  color: string;
  onClick: () => void;
}> = ({ icon: Icon, title, description, color, onClick }) => (
  <button 
    onClick={onClick}
    className={`${color} text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left`}
  >
    <Icon className="w-8 h-8 mb-3" />
    <h4 className="font-semibold mb-1">{title}</h4>
    <p className="text-sm opacity-90">{description}</p>
  </button>
);

const SystemStatusItem: React.FC<{ 
  title: string; 
  status: string; 
  color: string;
}> = ({ title, status, color }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
    <span className="font-medium text-gray-900">{title}</span>
    <span className={`font-semibold ${color}`}>{status}</span>
  </div>
);

const BookingManagementItem: React.FC<{ 
  booking: BookingData;
  onEdit: (booking: BookingData) => void;
  onDelete: () => void;
}> = ({ booking, onEdit, onDelete }) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
        <Briefcase className="w-6 h-6 text-emerald-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{booking.destination} - {booking.customerName}</h4>
        <p className="text-sm text-gray-600">{booking.startDate} • <Price amountUSD={booking.totalPrice} /> • {booking.status}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => onEdit(booking)}>
        <Edit3 size={16} />
      </button>
      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={onDelete} aria-label="Delete booking">
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

export default AdminDashboard;
