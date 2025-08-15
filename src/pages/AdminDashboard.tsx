import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Users, Briefcase, CheckCircle } from 'lucide-react';
import { adminStats, destinationData } from '../data/adminMockData';
import AdminStatCard from '../components/AdminStatCard';
import DestinationManagementCard from '../components/DestinationManagementCard';
import RecentBookings from '../components/RecentBookings';
import TopDestinations from '../components/TopDestinations';

const DestinationManagementSection: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {destinationData.map(dest => (
      <DestinationManagementCard key={dest.id} destination={dest} />
    ))}
  </div>
);

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const icons: { [key: string]: React.ReactNode } = {
    'Total Users': <Users className="text-emerald-500" />,
    'Active Bookings': <Briefcase className="text-emerald-500" />,
    'Monthly Revenue': <DollarSign className="text-emerald-500" />,
    'Completed Trips': <CheckCircle className="text-emerald-500" />,
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        {adminStats.map(stat => (
          <AdminStatCard key={stat.title} {...stat} icon={icons[stat.title]} />
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Book    ings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RecentBookings />
            <TopDestinations />
          </div>
        </TabsContent>
        <TabsContent value="bookings">
          <p>Booking management content goes here.</p>
        </TabsContent>
        <TabsContent value="users">
          <p>User management content goes here.</p>
        </TabsContent>
        <TabsContent value="destinations">
          <DestinationManagementSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
