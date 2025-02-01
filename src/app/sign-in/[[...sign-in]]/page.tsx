import { SignIn } from "@clerk/nextjs";
import { Pixelify_Sans } from "next/font/google";
import Link from "next/link";

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
 
export default function Page() {
  return (
    <div className={`${pixelify.className} min-h-screen flex flex-col bg-gradient-custom`}>
      <Link href="/" className="p-4 text-2xl hover:text-gray-700">← Back to Home</Link>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
