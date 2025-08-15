import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { destinationData } from '@/data/adminMockData';

const TopDestinations: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Destinations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead className="text-right">Bookings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinationData.map((destination) => (
              <TableRow key={destination.id}>
                <TableCell>{destination.name}</TableCell>
                <TableCell className="text-right">{destination.bookings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopDestinations;
