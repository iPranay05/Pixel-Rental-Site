'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/booking-modal';
import { useUser } from '@clerk/nextjs';
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

interface Location {
  id: string;
  name: string;
  game: string;
  description: string;
  price: number;
  image: string;
  amenities: string[];
}

const locations: Record<string, Location> = {
  '1': {
    id: '1',
    name: 'Mushroom Kingdom Castle',
    game: 'Super Mario World',
    description: 'Experience the magic of Princess Peach\'s iconic castle',
    price: 150,
    image: '/mario-castle.png',
    amenities: [
      'Mushroom garden',
      'Toad butler service',
      'Warp pipe transport',
      'Boss battle arena',
      'Coin collection'
    ]
  },
  '2': {
    id: '2',
    name: 'Minecraft Cottage',
    game: 'Minecraft',
    description: 'A cozy cottage built with the finest blocks',
    price: 80,
    image: '/minecraft-house.jpg',
    amenities: [
      'Crafting table',
      'Furnace',
      'Farm plot',
      'Mine entrance',
      'Storage chests'
    ]
  },
  '3': {
    id: '3',
    name: 'Hyrule Temple',
    game: 'Legend of Zelda',
    description: 'Ancient temple with breathtaking views of Hyrule',
    price: 200,
    image: '/zelda-temple.jpg',
    amenities: [
      'Sacred grounds',
      'Puzzle rooms',
      'Master sword shrine',
      'Fairy fountain',
      'Royal gardens'
    ]
  }
};

export default function PlacePage() {
  const params = useParams();
  const id = params.id as string;
  const place = locations[id];
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  if (!place) {
    return (
      <div className={`${pixelify.className} min-h-screen bg-gradient-custom p-8`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Location not found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleBookClick = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    setIsBookingModalOpen(true);
  };

  return (
    <main className={`${pixelify.className} min-h-screen bg-gradient-custom`}>
      <Link href="/" className="inline-block p-4 text-xl hover:text-gray-700">
        ← Back to Home
      </Link>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={place.image}
              alt={place.name}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{place.name}</h1>
            <p className="text-xl mb-6">{place.description}</p>
            <p className="text-3xl font-bold mb-8">${place.price}/night</p>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Amenities</h2>
              <ul className="space-y-2">
                {place.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center space-x-2">
                    <span>→ {amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              onClick={handleBookClick}
              className="mt-8 w-full bg-black text-white hover:bg-gray-800"
            >
              {isSignedIn ? 'Book Now' : 'Sign in to Book'}
            </Button>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        locationName={place.name}
        pricePerNight={place.price}
      />
    </main>
  );
}
