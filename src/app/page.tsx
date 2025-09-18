"use client";

import Image from "next/image";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import Script from "next/script";
import { Suspense } from "react";

export default function Home() {
  // Use useEffect to initialize state on the client side only
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // Initialize as false
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false); // Initialize as false

  // Array of all 8 photos
  const photos = [
    { src: "/ruben/photo0.png", alt: "Rúben 0" },
    { src: "/ruben/photo1.jpg", alt: "Rúben 1" },
    { src: "/ruben/photo2.jpg", alt: "Rúben 2" },
    { src: "/ruben/photo3.jpg", alt: "Rúben 3" },
    { src: "/ruben/photo4.jpg", alt: "Rúben 4" },
    { src: "/ruben/photo5.jpg", alt: "Rúben 5" },
    { src: "/ruben/photo6.jpg", alt: "Rúben 6" },
    { src: "/ruben/photo7.jpg", alt: "Rúben 7" },
    { src: "/ruben/photo8.jpg", alt: "Rúben 8" },
  ];

  // Client-side initialization
  useEffect(() => {
    setMounted(true);
    setShowConfetti(true); // Now set to true on client only
    setIsAutoPlaying(true); // Now set to true on client only
    
    // Stop confetti after 8 seconds
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play functionality - only runs on client
  useEffect(() => {
    if (!mounted) return; // Skip if not mounted yet
    
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setCurrentPhotoIndex((prevIndex) =>
          prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change photo every 3 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, photos.length, mounted]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return null; // Or a simple loading state
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-white p-6">
      {showConfetti && <Confetti />}

      {/* Title */}
      <h1 className="text-4xl text-center font-bold mt-12 animate-bounce drop-shadow-lg">
        🎂 Happy Birthday!🎉
        <p className="text-4xl text-center font-bold mt-4 animate-bounce drop-shadow-lg">
          Rúben
        </p>
      </h1>
      <p className="text-xl mt-4 text-center max-w-xl">
        Wishing you an amazing day filled with joy, laughter, and love 💖
      </p>

      {/* Wrap dynamic content in Suspense */}
      <Suspense fallback={<div>Loading photos...</div>}>
        {/* Photo Carousel */}
        <section className="mt-10 relative w-full max-w-xl">
          <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-square">
            <Image
              src={photos[currentPhotoIndex].src}
              alt={photos[currentPhotoIndex].alt}
              fill
              className="object-cover transition-opacity duration-500"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={toggleAutoPlay}
              className={`px-4 py-2 ${
                isAutoPlaying ? "bg-red-600" : "bg-green-600"
              } text-white rounded-lg hover:opacity-90 transition`}
            >
              {isAutoPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
          </div>
        </section>
      </Suspense>

      {/* Video Message */}

      {/* Buy Me a Coffee Button */}
      <section className="mt-8 p-4">
        <h2 className="text-xl font-semibold mb-6 text-center text-white animate-pulse">
          Want to buy Rúben a birthday cake?
        </h2>
        
        <div className="flex justify-center">
          <a
            href="https://www.buymeacoffee.com/ruihuang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-[#5F7FFF] text-white font-medium rounded-lg hover:scale-110 hover:bg-opacity-90 transition-all duration-300 animate-bounce shadow-lg"
          >
            <span className="mr-2 ">🎂</span>
            Buy Rúben a birthday cake
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm opacity-80">
        Made by Chinezinhooooo
      </footer>

      {/* Buy Me a Coffee Script */}
      <Script
        src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
        strategy="lazyOnload"
      />
    </main>
  );
}
