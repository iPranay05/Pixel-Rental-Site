import Image from "next/image";
import { Pixelify_Sans } from 'next/font/google'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

const featuredLocations = [
  {
    id: 1,
    name: "Mushroom Kingdom Castle",
    game: "Super Mario",
    price: "150",
    image: "/mario-castle.png",
    description: "Live like royalty in Princess Peach's iconic castle",
  },
  {
    id: 2,
    name: "Minecraft Village House",
    game: "Minecraft",
    price: "80",
    image: "/minecraft-house.jpg",
    description: "Cozy village house with farm and crafting tables",
  },
  {
    id: 3,
    name: "Zelda's Temple",
    game: "Legend of Zelda",
    price: "200",
    image: "/zelda-temple.jpg",
    description: "Ancient temple with mysterious puzzles and gardens",
  },
];

const gameWorlds = [
  {
    name: "Super Mario World",
    locations: 50,
    image: "/mario-world.jpg"
  },
  {
    name: "Minecraft Realms",
    locations: 100,
    image: "/minecraft-world.png"
  },
  {
    name: "Zelda Universe",
    locations: 75,
    image: "/zelda-world.jpg"
  }
];

export default function Home() {
  return (
    <main className={`${pixelify.className} bg-gradient-custom min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl text-black">Rental Space</h1>
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link href="/bookings" className="hover:text-gray-600">
                My Bookings
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="hover:text-gray-600">Login</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="hover:text-gray-600">Signup</Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="max-w-lg">
            <h1 className="text-6xl text-black mb-6">Inspiring Location for Your Next Stay</h1>
            <p className="text-xl text-black mb-4">Find the perfect space to stay with our rental service.</p>
            <p className="text-xl text-black">We offer a wide range of accommodations to suit every budget and preference.</p>
          </div>
          <div className="w-1/2">
            <Image 
              src="/pixel.png" 
              alt="hero" 
              width={400} 
              height={300} 
              className="w-[600px] h-[500px] rounded-[40px] object-cover" 
            />
          </div>
        </div>

        <div className="flex w-full max-w-sm items-center space-x-2 mt-8">
          <Input type="search" placeholder="Search by location" />
          <Button type="submit">Search</Button>
        </div>

        <div className="absolute right-[170px] mt-4 flex gap-20 bg-black rounded-full">
          <div className="p-6 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-white ml-2">2000+</p>
          </div>
          <div className="p-6 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-white ml-2">Unique locations</p>
          </div>
        </div>

        <section className="mt-32">
          <h2 className="text-4xl font-bold text-black mb-8">Featured Pixel Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredLocations.map((location) => (
              <div key={location.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:transform hover:scale-105 transition-all">
                <Image
                  src={location.image}
                  alt={location.name}
                  width={300}
                  height={200}
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h3 className="text-2xl font-bold text-black mb-2">{location.name}</h3>
                <p className="text-gray-700 mb-2">{location.game}</p>
                <p className="text-gray-600 mb-4">{location.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-black">${location.price}/night</p>
                  <Link href={`/places/${location.id}`}>
                    <Button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-4xl font-bold text-black mb-8">Explore Game Worlds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gameWorlds.map((world) => (
              <div key={world.name} className="relative group">
                <Image
                  src={world.image}
                  alt={world.name}
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm rounded-b-lg">
                  <h3 className="text-2xl font-bold text-white">{world.name}</h3>
                  <p className="text-white/80">{world.locations} locations</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 mb-16 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Ready for Your Pixel Adventure?</h2>
          <p className="text-xl text-black mb-8">Book your stay in the most unique gaming locations!</p>
          <Button className="bg-black text-white px-8 py-4 rounded-lg text-xl hover:bg-gray-800">
            Start Exploring
          </Button>
        </section>
      </div>
    </main>
  );
}
