"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      AOS.init({
        duration: 1000, // Animation duration
        once: true, // Whether animation should happen only once - while scrolling down
        delay: 100, // Delay after scrolling before animation starts
        easing: "ease-in-out", // Animation easing
      });
    }
  }, [isFirstLoad]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 md:pt-0 pb-[120px] md:pb-0 flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg-2.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          quality={75}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a136c] to-[#0b0264] mix-blend-multiply"></div>
      </div>

      {/* Refined Waves */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[150px] md:h-[100px] overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-[150px] md:h-[100px] animate-waves"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255,255,255,0.2)"
            d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,224C672,235,768,213,864,208C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96V320H0Z"
          ></path>
        </svg>
        <svg
          className="absolute bottom-0 w-full h-[180px] md:h-[150px] animate-waves-reverse"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255,255,255,0.3)"
            d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,224C672,235,768,213,864,208C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96V320H0Z"
          ></path>
        </svg>
      </div>

      {/* Content Container */}
      <div className="container max-w-7xl mx-auto px-4 relative z-20 mt-12 md:mt-0">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}
          <div
            className="lg:w-1/2 text-center lg:text-left order-1"
            data-aos="fade-right"
          >
            <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl text-gray-300 font-bold mb-6 leading-tight">
              <span className="block mb-2">Build Your Landing Page</span>
              <span className="inline-block">
                With{" "}
                <span className="text-white underline decoration-green-600 underline-offset-4 md:underline-offset-8">
                  Bootslander
                </span>
              </span>
            </h1>
            <p className="font-heading font-semibold text-lg md:text-xl mb-6 md:mb-8 text-gray-300/70 max-w-2xl mx-auto lg:mx-0">
              We are a team of talented designers making websites with Next.js
            </p>
            <div className="flex flex-col items-center sm:flex-row justify-center lg:justify-start gap-4 md:gap-6">
              <Button className="bg-green-400 hover:bg-green-500 rounded-3xl px-6 py-4 md:px-8 md:py-6 font-heading text-white text-md">
                Get Started
              </Button>
              <div className="flex items-center gap-2">
                <div className="border-2 border-green-300 p-2 rounded-full">
                  <FaPlay className="text-green-300" size={14} />
                </div>
                <a
                  href="#"
                  className="text-white hover:text-green-400 text-sm md:text-base"
                >
                  Watch Video
                </a>
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div
            className="lg:w-1/2 order-2 mt-12 md:mt-12 lg:mt-0 mb-16 md:mb-0"
            data-aos="zoom-out"
          >
            <div className="relative max-w-md mx-auto animate-float">
            <Image
                src="/images/hero-img.png"
                alt="Hero Image"
                width={500}
                height={500}
                priority
                className="w-full relative z-10"
                quality={90}
              />
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes waves {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
        .animate-waves {
          animation: waves 2s ease-in-out infinite;
        }
        .animate-waves-reverse {
          animation: waves 8s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
