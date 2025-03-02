"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from './ui/button';

const Gallery = () => {
  const images = [
    '/gallery/gallery-1.jpg',
    '/gallery/gallery-2.jpg',
    '/gallery/gallery-3.jpg',
    '/gallery/gallery-4.jpg',
    '/gallery/gallery-5.jpg',
    '/gallery/gallery-6.jpg',
    '/gallery/gallery-7.jpg',
    '/gallery/gallery-8.jpg',
  ];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  };
  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto mb-12">   
        <div className='flex items-center'>

        <h2 className='text-sm font-light text-gray-600 mr-4'>GALLERY</h2>
        <div className='flex-glow-0 w-28 h-[1px] bg-green-500'/>
        </div>
          <span className="text-2xl font-semibold text-indigo-900">CHECK OUR GALLERY</span>
      </div>

      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {images.map((src, index) => (
            <div key={index} className="relative aspect-video">
              <Button
                className="h-full w-full p-0 overflow-hidden rounded-none"
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transform transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Button>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeftIcon className="w-12 h-12" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronRightIcon className="w-12 h-12" />
              </button>

              <div className="relative w-full max-w-6xl h-[90vh]">
                <Image
                  src={images[selectedIndex]}
                  alt={`Selected image ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;