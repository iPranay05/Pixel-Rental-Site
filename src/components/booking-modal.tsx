'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  pricePerNight: number;
}

export function BookingModal({ isOpen, onClose, locationName, pricePerNight }: BookingModalProps) {
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const { user } = useUser();

  const totalPrice = pricePerNight * nights;

  const handleBooking = async () => {
    if (!user) {
      alert('Please sign in to book');
      return;
    }

    setIsBooking(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            user_email: user.primaryEmailAddress?.emailAddress,
            location_name: locationName,
            nights: nights,
            guests: guests,
            total_price: totalPrice,
            booking_date: new Date().toISOString(),
            status: 'confirmed'
          }
        ]);

      if (error) throw error;

      alert('Booking successful! Check your email for confirmation.');
      onClose();
    } catch (error) {
      console.error('Error booking:', error);
      alert('Failed to book. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Your Stay at {locationName}</DialogTitle>
          <DialogDescription>
            Fill in the details below to complete your booking.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Number of Nights</label>
              <Input
                type="number"
                min="1"
                value={nights}
                onChange={(e) => setNights(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Number of Guests</label>
              <Input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Price</label>
            <p className="text-2xl font-bold">${totalPrice}</p>
            <p className="text-sm text-gray-500">
              ${pricePerNight} × {nights} night{nights !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleBooking}
            disabled={isBooking}
            className="bg-black text-white hover:bg-gray-800"
          >
            {isBooking ? 'Booking...' : 'Book Now'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
