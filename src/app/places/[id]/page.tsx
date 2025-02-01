'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Pixelify_Sans } from 'next/font/google';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { BookingModal } from '@/components/booking-modal';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const locations = {
  1: {
    name: "Mushroom Kingdom Castle",
    game: "Super Mario",
    price: "150",
    image: "/mario-castle.png",
    description: "Live like royalty in Princess Peach's iconic castle",
    features: [
      "Royal bedrooms",
      "Mushroom garden",
      "Star power protection",
      "Toad butler service"
    ],
    amenities: [
      "Power-up storage",
      "Warp pipe transport",
      "Coin collection",
      "Boss battle arena"
    ]
  },
  2: {
    name: "Minecraft Village House",
    game: "Minecraft",
    price: "80",
    image: "/minecraft-house.jpg",
    description: "Cozy village house with farm and crafting tables",
    features: [
      "Crafting room",
      "Storage chests",
      "Farm plot",
      "Village view"
    ],
    amenities: [
      "Enchanting table",
      "Brewing stand",
      "Furnace",
      "Bed respawn point"
    ]
  },
  3: {
    name: "Zelda's Temple",
    game: "Legend of Zelda",
    price: "200",
    image: "/zelda-temple.jpg",
    description: "Ancient temple with mysterious puzzles and gardens",
    features: [
      "Sacred chambers",
      "Puzzle rooms",
      "Hidden treasures",
      "Master sword shrine"
    ],
    amenities: [
      "Heart container storage",
      "Fairy fountain",
      "Magic restoration",
      "Shield protection"
    ]
  }
};

export default function PlaceDetails() {
  const params = useParams();
  const id = params.id as string;
  const place = locations[id as keyof typeof locations];
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleBookClick = () => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    setIsBookingModalOpen(true);
  };

  if (!place) {
    return (
      <div className={`${pixelify.className} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Location not found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className={`${pixelify.className} bg-gradient-to-br from-amber-100 to-teal-100 min-h-screen`}>
      
      <div className="pt-20 px-8">
        <Link href="/" className="text-black hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative w-full h-[400px]">
              <Image
                src={place.image}
                alt={place.name}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">{place.name}</h1>
              <p className="text-xl text-gray-700 mb-4">{place.game}</p>
              <p className="text-gray-600 mb-6">{place.description}</p>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black mb-4">Features</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {place.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="mr-2">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black mb-4">Amenities</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {place.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="mr-2">→</span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center mt-8">
                <p className="text-3xl font-bold text-black">${place.price}/night</p>
                <Button 
                  className="bg-black text-white px-8 py-4 rounded-lg text-xl hover:bg-gray-800"
                  onClick={handleBookClick}
                >
                  {isSignedIn ? 'Book Now' : 'Sign in to Book'}
                </Button>
              </div>
            </div>
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
