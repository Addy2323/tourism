export interface AdminStat {
  title: string;
  value: string;
  change: string;
  color: string;
}

export interface DestinationData {
  id: number;
  name: string;
  bookings: number;
  revenue: number;
  rating: number;
  status: 'Active' | 'Inactive';
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
    bookings: 45,
    revenue: 112455,
    rating: 4.9,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Zanzibar Beach',
    bookings: 38,
    revenue: 49362,
    rating: 4.8,
    status: 'Active',
  },
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
    price: 3200,
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