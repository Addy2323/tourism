export interface Booking {
  id: number;
  title: string;
  location: string;
  dates: string;
  price: number;
  guests: number;
  guide: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  image: string;
}

export const mockBookings: Booking[] = [
  {
    id: 1,
    title: 'Serengeti Safari Adventure',
    location: 'Serengeti National Park',
    dates: 'March 15-22, 2024',
    price: 2499,
    guests: 2,
    guide: 'John Mwangi',
    status: 'Confirmed',
    image: '/images/destinations/serengeti.jpg',
  },
  {
    id: 2,
    title: 'Zanzibar Beach Getaway',
    location: 'Zanzibar Islands',
    dates: 'June 10-15, 2024',
    price: 1299,
    guests: 2,
    guide: 'Amina Hassan',
    status: 'Pending',
    image: '/images/destinations/zanzibar.jpg',
  },
  {
    id: 3,
    title: 'Ngorongoro Crater Experience',
    location: 'Ngorongoro Conservation Area',
    dates: 'August 5-8, 2024',
    price: 1799,
    guests: 2,
    guide: 'David Kimani',
    status: 'Completed',
    image: '/images/destinations/ngorongoro.jpg',
  },
];
