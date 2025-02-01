'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface Booking {
  id: string;
  location_name: string;
  nights: number;
  guests: number;
  total_price: number;
  booking_date: string;
  status: string;
}

export default function BookingsPage() {
  const { user } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('booking_date', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user]);

  if (!user) {
    return (
      <div className={`${pixelify.className} min-h-screen bg-gradient-custom p-8`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Please sign in to view your bookings</h1>
          <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${pixelify.className} min-h-screen bg-gradient-custom p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Bookings</h1>
          <Link href="/" className="text-gray-600 hover:text-gray-800">
            ← Back to Home
          </Link>
        </div>

        {loading ? (
          <p>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl mb-4">You haven't made any bookings yet.</p>
            <Link
              href="/"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Explore Places to Stay
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{booking.location_name}</h2>
                    <p className="text-gray-600">
                      {new Date(booking.booking_date).toLocaleDateString()} •{' '}
                      {booking.nights} night{booking.nights !== 1 ? 's' : ''} •{' '}
                      {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${booking.total_price}</p>
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
