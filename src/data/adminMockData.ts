export interface AdminStat {
  title: string;
  value: string;
  change: string;
  color: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  role: 'user' | 'admin';
  status: 'Active' | 'Inactive' | 'Suspended';
  verified: boolean;
  totalBookings: number;
  totalSpent: number;
  membershipLevel: 'Basic' | 'Premium' | 'VIP';
  preferences: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  avatar?: string;
}

export interface DestinationData {
  id: number;
  name: string;
  location: string;
  description: string;
  price: number;
  duration: string;
  maxGroupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  category: 'Safari' | 'Beach' | 'Mountain' | 'Cultural' | 'Adventure';
  images: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  status: 'Active' | 'Inactive' | 'Draft';
  rating: number;
  bookings: number;
  revenue: number;
  totalBookings: number;
}

export interface RecentBooking {
  id: number;
  name: string;
  destination: string;
  price: number;
  status: 'Confirmed' | 'Pending';
}

export const adminStats: Omit<AdminStat, 'icon'>[] = [
  {
    title: 'Total Users',
    value: '1,247',
    change: '+12% from last month',
    color: 'emerald',
  },
  {
    title: 'Active Bookings',
    value: '89',
    change: '+8% from last month',
    color: 'blue',
  },
  {
    title: 'Monthly Revenue',
    value: '$156,750',
    change: '+15% from last month',
    color: 'amber',
  },
  {
    title: 'Completed Trips',
    value: '342',
    change: '+22% from last month',
    color: 'green',
  },
];

export const destinationData: DestinationData[] = [
  {
    id: 1,
    name: 'Serengeti National Park',
    location: 'Northern Tanzania',
    description: 'Experience the world\'s most spectacular wildlife migration in the vast plains of Serengeti. Home to the Big Five and countless other species, this UNESCO World Heritage site offers unparalleled safari experiences.',
    price: 2500,
    duration: '5 days',
    maxGroupSize: 8,
    difficulty: 'Easy',
    category: 'Safari',
    images: [
      '/images/serengeti-1.jpg',
      '/images/serengeti-2.jpg',
      '/images/serengeti-3.jpg'
    ],
    highlights: [
      'Great Migration viewing',
      'Big Five wildlife encounters',
      'Hot air balloon safari',
      'Maasai cultural experience',
      'Professional guide included'
    ],
    included: [
      'All meals and accommodation',
      'Game drives in 4WD vehicle',
      'Professional safari guide',
      'Park entrance fees',
      'Airport transfers'
    ],
    notIncluded: [
      'International flights',
      'Travel insurance',
      'Personal expenses',
      'Alcoholic beverages',
      'Tips and gratuities'
    ],
    status: 'Active',
    rating: 4.9,
    bookings: 45,
    revenue: 112455,
    totalBookings: 45,
  },
  {
    id: 2,
    name: 'Zanzibar Beach',
    location: 'Zanzibar Island, Tanzania',
    description: 'Relax on pristine white sand beaches with crystal clear turquoise waters. Explore Stone Town\'s rich history, spice plantations, and enjoy world-class snorkeling and diving.',
    price: 1800,
    duration: '7 days',
    maxGroupSize: 12,
    difficulty: 'Easy',
    category: 'Beach',
    images: [
      '/images/zanzibar-1.jpg',
      '/images/zanzibar-2.jpg',
      '/images/zanzibar-3.jpg'
    ],
    highlights: [
      'Pristine white sand beaches',
      'Stone Town UNESCO site',
      'Spice plantation tours',
      'Snorkeling and diving',
      'Sunset dhow cruises'
    ],
    included: [
      'Beachfront accommodation',
      'Daily breakfast',
      'Stone Town tour',
      'Spice tour',
      'Airport transfers'
    ],
    notIncluded: [
      'International flights',
      'Lunch and dinner',
      'Water sports equipment',
      'Travel insurance',
      'Personal expenses'
    ],
    status: 'Active',
    rating: 4.8,
    bookings: 38,
    revenue: 68400,
    totalBookings: 38,
  },
  {
    id: 3,
    name: 'Mount Kilimanjaro',
    location: 'Northern Tanzania',
    description: 'Conquer Africa\'s highest peak on this challenging but rewarding trek. Experience diverse ecosystems from tropical rainforest to arctic summit conditions.',
    price: 4500,
    duration: '8 days',
    maxGroupSize: 6,
    difficulty: 'Challenging',
    category: 'Mountain',
    images: [
      '/images/kilimanjaro-1.jpg',
      '/images/kilimanjaro-2.jpg',
      '/images/kilimanjaro-3.jpg'
    ],
    highlights: [
      'Summit Uhuru Peak (5,895m)',
      'Machame route trek',
      'Diverse ecosystems',
      'Professional mountain guides',
      'Certificate of achievement'
    ],
    included: [
      'Mountain hut accommodation',
      'All meals during trek',
      'Professional guides and porters',
      'Park fees and permits',
      'Emergency oxygen'
    ],
    notIncluded: [
      'International flights',
      'Pre/post trek accommodation',
      'Personal trekking gear',
      'Travel insurance',
      'Tips for guides and porters'
    ],
    status: 'Active',
    rating: 4.7,
    bookings: 22,
    revenue: 99000,
    totalBookings: 22,
  },
  {
    id: 4,
    name: 'Ngorongoro Crater',
    location: 'Northern Tanzania',
    description: 'Explore the world\'s largest intact volcanic caldera, often called "Africa\'s Eden". This natural amphitheater hosts an incredible concentration of wildlife.',
    price: 2200,
    duration: '3 days',
    maxGroupSize: 8,
    difficulty: 'Easy',
    category: 'Safari',
    images: [
      '/images/ngorongoro-1.jpg',
      '/images/ngorongoro-2.jpg',
      '/images/ngorongoro-3.jpg'
    ],
    highlights: [
      'World\'s largest volcanic caldera',
      'High concentration of wildlife',
      'Black rhino sightings',
      'Maasai villages visit',
      'Crater rim viewpoints'
    ],
    included: [
      'Lodge accommodation',
      'All meals',
      'Game drives',
      'Crater descent permit',
      'Professional guide'
    ],
    notIncluded: [
      'International flights',
      'Alcoholic beverages',
      'Personal expenses',
      'Travel insurance',
      'Optional activities'
    ],
    status: 'Active',
    rating: 4.8,
    bookings: 31,
    revenue: 68200,
    totalBookings: 31,
  },
  {
    id: 5,
    name: 'Tarangire National Park',
    location: 'Northern Tanzania',
    description: 'Famous for its large elephant herds and iconic baobab trees. Experience excellent wildlife viewing with fewer crowds than other northern parks.',
    price: 1900,
    duration: '4 days',
    maxGroupSize: 10,
    difficulty: 'Easy',
    category: 'Safari',
    images: [
      '/images/tarangire-1.jpg',
      '/images/tarangire-2.jpg',
      '/images/tarangire-3.jpg'
    ],
    highlights: [
      'Large elephant herds',
      'Ancient baobab trees',
      'Diverse bird species',
      'Tarangire River wildlife',
      'Less crowded safari experience'
    ],
    included: [
      'Safari lodge accommodation',
      'All meals',
      'Game drives',
      'Park entrance fees',
      'Professional guide'
    ],
    notIncluded: [
      'International flights',
      'Alcoholic beverages',
      'Personal expenses',
      'Travel insurance',
      'Optional walking safaris'
    ],
    status: 'Active',
    rating: 4.6,
    bookings: 28,
    revenue: 53200,
    totalBookings: 28,
  }
];

export const userData: UserData[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    joinDate: '2023-01-15',
    role: 'user',
    status: 'Active',
    verified: true,
    totalBookings: 5,
    totalSpent: 12500,
    membershipLevel: 'Premium',
    preferences: ['Safari', 'Beach', 'Cultural'],
    emergencyContact: {
      name: 'Michael Johnson',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@gmail.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, USA',
    joinDate: '2023-03-22',
    role: 'user',
    status: 'Active',
    verified: true,
    totalBookings: 3,
    totalSpent: 8900,
    membershipLevel: 'VIP',
    preferences: ['Mountain', 'Adventure'],
    emergencyContact: {
      name: 'Lisa Chen',
      phone: '+1 (555) 876-5432',
      relationship: 'Spouse'
    }
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@outlook.com',
    phone: '+1 (555) 345-6789',
    location: 'Miami, USA',
    joinDate: '2023-05-10',
    role: 'user',
    status: 'Active',
    verified: false,
    totalBookings: 2,
    totalSpent: 4200,
    membershipLevel: 'Basic',
    preferences: ['Beach', 'Cultural'],
    emergencyContact: {
      name: 'Carlos Rodriguez',
      phone: '+1 (555) 765-4321',
      relationship: 'Parent'
    }
  },
  {
    id: 4,
    name: 'David Thompson',
    email: 'david.thompson@yahoo.com',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, USA',
    joinDate: '2023-02-28',
    role: 'admin',
    status: 'Active',
    verified: true,
    totalBookings: 0,
    totalSpent: 0,
    membershipLevel: 'Basic',
    preferences: [],
    emergencyContact: {
      name: 'Jennifer Thompson',
      phone: '+1 (555) 654-3210',
      relationship: 'Spouse'
    }
  },
  {
    id: 5,
    name: 'Aisha Patel',
    email: 'aisha.patel@gmail.com',
    phone: '+1 (555) 567-8901',
    location: 'Los Angeles, USA',
    joinDate: '2023-04-18',
    role: 'user',
    status: 'Inactive',
    verified: true,
    totalBookings: 7,
    totalSpent: 15600,
    membershipLevel: 'VIP',
    preferences: ['Safari', 'Cultural', 'Adventure'],
    emergencyContact: {
      name: 'Raj Patel',
      phone: '+1 (555) 543-2109',
      relationship: 'Sibling'
    }
  }
];

export const recentBookings: RecentBooking[] = [
  {
    id: 1,
    name: 'John Doe',
    destination: 'Serengeti National Park',
    price: 2500,
    status: 'Confirmed',
  },
  {
    id: 2,
    name: 'Jane Smith',
    destination: 'Zanzibar Beach',
    price: 1800,
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    destination: 'Ngorongoro Crater',
    price: 2200,
    status: 'Confirmed',
  },
  {
    id: 4,
    name: 'Emily Davis',
    destination: 'Mount Kilimanjaro',
    price: 4500,
    status: 'Confirmed',
  },
];