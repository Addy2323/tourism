import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { recentBookings, RecentBooking } from '@/data/adminMockData';

const getStatusVariant = (status: RecentBooking['status']) => {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'default';
  }
};

const RecentBookings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.user}</TableCell>
                <TableCell>{booking.destination}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
