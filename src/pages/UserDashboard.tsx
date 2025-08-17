import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import Price from '../components/Price';
import { Calendar, MapPin, Heart, Star, Bell, Settings, Briefcase, User, Award, Camera, Edit3, Phone, Mail, Globe, CreditCard, Gift, TrendingUp, Clock, CheckCircle, AlertCircle, Plus, Filter, Search } from 'lucide-react';
import { mockBookings, type Booking } from '../data/mockData';
import BookingCard from '../components/BookingCard.tsx';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, updateUser } = useAuth();
  const initials = ((user?.name || 'User').split(' ').map(w => w[0]).slice(0,2).join('') || 'U').toUpperCase();
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const onPickAvatar = () => avatarInputRef.current?.click();
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (dataUrl) updateUser({ avatar: dataUrl });
    };
    reader.readAsDataURL(file);
    // reset input so selecting same file again still triggers change
    e.currentTarget.value = '';
  };

  // LocalStorage-backed state
  const STORAGE_KEYS = {
    bookings: 'user_bookings',
    savedTrips: 'user_saved_trips',
  } as const;

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEYS.bookings);
      return s ? JSON.parse(s) : mockBookings;
    } catch {
      return mockBookings;
    }
  });

  type SavedTrip = { id: number; title: string; days: number; price: number; image?: string };
  const defaultSaved: SavedTrip[] = [
    { id: 1, title: 'Kilimanjaro Trek', days: 5, price: 2499, image: '/images/destinations/kilimanjaro.jpg' },
    { id: 2, title: 'Zanzibar Beach Escape', days: 4, price: 1299, image: '/images/destinations/zanzibar.jpg' },
    { id: 3, title: 'Serengeti Safari', days: 7, price: 2799, image: '/images/destinations/serengeti.jpg' },
  ];
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEYS.savedTrips);
      return s ? JSON.parse(s) : defaultSaved;
    } catch {
      return defaultSaved;
    }
  });

  // Persist
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings)); } catch {}
  }, [bookings]);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.savedTrips, JSON.stringify(savedTrips)); } catch {}
  }, [savedTrips]);

  // CRUD handlers
  const addBooking = () => {
    const nextId = Math.max(0, ...bookings.map(b => b.id)) + 1;
    const newBooking: Booking = {
      id: nextId,
      title: 'Custom Trip',
      location: 'New Destination',
      dates: new Date().toLocaleDateString(),
      price: 999,
      guests: 1,
      guide: 'TBD',
      status: 'Pending',
      image: '/images/destinations/placeholder.jpg'
    };
    setBookings(prev => [newBooking, ...prev]);
  };
  const deleteBooking = (id: number) => setBookings(prev => prev.filter(b => b.id !== id));

  const addSavedTrip = () => {
    const nextId = Math.max(0, ...savedTrips.map(t => t.id)) + 1;
    setSavedTrips(prev => [{ id: nextId, title: 'New Saved Trip', days: 3, price: 899, image: '/images/destinations/placeholder.jpg' }, ...prev]);
  };
  const updateSavedTrip = (id: number, patch: Partial<SavedTrip>) => {
    setSavedTrips(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)));
  };
  const deleteSavedTrip = (id: number) => setSavedTrips(prev => prev.filter(t => t.id !== id));

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab bookings={bookings} />;
      case 'bookings':
        return <BookingsTab bookings={bookings} onAdd={addBooking} onDelete={deleteBooking} />;
      case 'saved':
        return <SavedTripsTab trips={savedTrips} onAdd={addSavedTrip} onUpdate={updateSavedTrip} onDelete={deleteSavedTrip} />;
      case 'profile':
        return <ProfileTab userName={user?.name || ''} userEmail={user?.email || ''} userPhone={user?.phone || ''} onSave={(updates) => updateUser(updates)} />;
      case 'rewards':
        return <RewardsTab />;
      default:
        return <OverviewTab bookings={bookings} />;
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
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile avatar"
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {initials}
                  </div>
                )}
                <button
                  type="button"
                  onClick={onPickAvatar}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  <Camera size={14} />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onAvatarChange}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 truncate">{user?.name || 'Guest User'}</h1>
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
            numericValue={12}
            change="+2 this year"
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard 
            icon={Heart} 
            title="Wishlist" 
            value="8" 
            numericValue={8}
            change="2 new saves"
            color="text-rose-600"
            bgColor="bg-rose-50"
          />
          <StatCard 
            icon={Award} 
            title="Rewards Points" 
            value="2,450" 
            numericValue={2450}
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

        {/* Tab Content with subtle transition */}
        <div key={activeTab} className="transition-all duration-300 ease-out opacity-100 translate-y-0 will-change-transform">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Count-up hook (lightweight, no deps)
function useCountUp(target: number, duration = 900, startOnView = true) {
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
const OverviewTab: React.FC<{ bookings: Booking[] }> = ({ bookings }) => (
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
        {bookings.slice(0, 2).map(booking => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  </div>
);

// Enhanced Bookings Tab
const BookingsTab: React.FC<{ bookings: Booking[]; onAdd: () => void; onDelete: (id: number) => void }> = ({ bookings, onAdd, onDelete }) => (
  <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <Filter size={16} />
          Filter
        </button>
        <button className="btn-primary flex items-center gap-2" onClick={onAdd}>
          <Calendar size={16} />
          Add Booking
        </button>
      </div>
    </div>
    <div className="space-y-6">
      {bookings.length === 0 && (
        <div className="p-4 text-gray-500 border border-gray-200 rounded-xl">No bookings yet.</div>
      )}
      {bookings.map(booking => (
        <div key={booking.id} className="relative group">
          <BookingCard booking={booking} />
          <button
            onClick={() => onDelete(booking.id)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs border border-red-200 text-red-600 rounded-md bg-white/80 hover:bg-red-50"
            aria-label="Delete booking"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);

// Professional Saved Trips Tab
const SavedTripsTab: React.FC<{ trips: { id: number; title: string; days: number; price: number; image?: string }[]; onAdd: () => void; onUpdate: (id: number, patch: Partial<{ title: string; days: number; price: number }>) => void; onDelete: (id: number) => void; }> = ({ trips, onAdd, onUpdate, onDelete }) => (
  <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Saved Trips</h2>
      <div className="flex items-center gap-3">
        <span className="text-gray-500">{trips.length} saved destinations</span>
        <button className="btn-primary flex items-center gap-2" onClick={onAdd}>
          <Plus size={16} /> Add Saved Trip
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map(item => (
        <SavedTripCard key={item.id} trip={item} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  </div>
);

// Comprehensive Profile Tab (editable)
const ProfileTab: React.FC<{ userName: string; userEmail: string; userPhone: string; onSave: (u: { name?: string; email?: string; phone?: string }) => void }> = ({ userName, userEmail, userPhone, onSave }) => {
  const { format } = useCurrency();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: userName, email: userEmail, phone: userPhone });
  useEffect(() => {
    setForm({ name: userName, email: userEmail, phone: userPhone });
  }, [userName, userEmail, userPhone]);

  const handleSave = () => {
    onSave({ name: form.name, email: form.email, phone: form.phone });
    setEdit(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
            <div className="flex items-center gap-2">
              {!edit ? (
                <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700" onClick={() => setEdit(true)}>
                  <Edit3 size={16} />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700" onClick={() => setEdit(false)}>Cancel</button>
                  <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700" onClick={handleSave}>Save</button>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!edit ? (
              <>
                <ProfileField label="Full Name" value={form.name || '—'} />
                <ProfileField label="Email" value={form.email || '—'} />
                <ProfileField label="Phone" value={form.phone || '—'} />
                <ProfileField label="Nationality" value="United States" />
                <ProfileField label="Passport Number" value="US123456789" />
              </>
            ) : (
              <>
                <EditableField label="Full Name" value={form.name} onChange={(v) => setForm(s => ({ ...s, name: v }))} />
                <EditableField label="Email" value={form.email} onChange={(v) => setForm(s => ({ ...s, email: v }))} type="email" />
                <EditableField label="Phone" value={form.phone} onChange={(v) => setForm(s => ({ ...s, phone: v }))} />
                <ProfileField label="Nationality" value="United States" />
                <ProfileField label="Passport Number" value="US123456789" />
              </>
            )}
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Travel Preferences</h3>
          <div className="space-y-4">
            <PreferenceItem label="Trip Style" value="Adventure & Wildlife" />
            <PreferenceItem label="Budget Range" value={`${format(2000)} - ${format(5000)}`} />
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
};

// Professional Rewards Tab
const RewardsTab: React.FC = () => {
  const { format } = useCurrency();
  return (
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
              <p className="text-sm opacity-90">Current Tier</p>
              <p className="text-lg font-bold">Silver</p>
            </div>
          </div>
        </div>
 
        <div className="mb-6">
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '70%' }}></div>
          </div>
          <div className="flex justify-between text-sm opacity-90 mt-2">
            <span>0</span>
            <span>3,000</span>
          </div>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RewardItem title={`${format(50)} Trip Credit`} points="500 points" />
          <RewardItem title="Free Airport Transfer" points="300 points" />
          <RewardItem title="Upgrade to Premium Room" points="800 points" />
        </div>
      </div>
 
      <div className="bg-white rounded-2xl shadow-classic p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Redeem Points</h3>
        <div className="space-y-4">
          <RewardItem title={`${format(50)} Trip Credit`} points="500 points" />
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
  );
};

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

const SavedTripCard: React.FC<{ trip: { id: number; title: string; days: number; price: number; image?: string }; onUpdate: (id: number, patch: Partial<{ title: string; days: number; price: number }>) => void; onDelete: (id: number) => void; }> = ({ trip, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: trip.title, days: trip.days.toString(), price: trip.price.toString() });
  useEffect(() => { setForm({ title: trip.title, days: String(trip.days), price: String(trip.price) }); }, [trip.id]);
  return (
    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
      <div className="aspect-video bg-gray-200 rounded-lg mb-4" style={{ backgroundImage: trip.image ? `url(${trip.image})` : undefined, backgroundSize: 'cover' }}></div>
      {!editing ? (
        <>
          <h4 className="font-semibold text-gray-900 mb-2">{trip.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{trip.days} days • From <Price amountUSD={trip.price} /></p>
          <div className="flex gap-2">
            <button className="btn-primary flex-1 text-sm">View Details</button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm" onClick={() => setEditing(true)}>Edit</button>
            <button className="px-3 py-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 text-sm" onClick={() => onDelete(trip.id)}>Delete</button>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={form.title} onChange={(e) => setForm(s => ({ ...s, title: e.target.value }))} />
          <div className="grid grid-cols-2 gap-2">
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" type="number" value={form.days} onChange={(e) => setForm(s => ({ ...s, days: e.target.value }))} />
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" type="number" value={form.price} onChange={(e) => setForm(s => ({ ...s, price: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm" onClick={() => setEditing(false)}>Cancel</button>
            <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-sm" onClick={() => { onUpdate(trip.id, { title: form.title, days: Number(form.days), price: Number(form.price) }); setEditing(false); }}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

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

// Small editable input helper
const EditableField: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string }> = ({ label, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    />
  </div>
);

export default UserDashboard;
