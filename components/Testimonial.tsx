"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { BiSolidStar, BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import "swiper/css";
import "swiper/css/pagination";
import Loading from "./ui/loading";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  designation: string;
  image: string;
  rating: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://admin.clickpoint.com.np/public/api/testimonials",
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch testimonials: ${response.status} ${response.statusText}`,
          );
        }

        const data: Testimonial[] = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          throw new Error("No testimonials found");
        }
      } catch (err: unknown) {
        const error = err instanceof Error 
          ? err 
          : new Error("An unknown error occurred");
        setError(error);
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <section className="text-center font-semibold"><Loading /></section>;
  }

  if (error) {
    return (
      <section className="text-center text-red-500 font-semibold"> 
        Error loading testimonials: {error.message}
      </section>
    );
  }

  if (!testimonials) { 
    return <section className="text-center font-semibold">No testimonials available.</section>;
  }

  return (
    <section id="testimonials" className="relative py-16 bg-gray-900">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-custom-blue to-transparent" />
      <div className="absolute inset-0 z-0">
        <Image
          src="/testimonials/testimonials-bg.jpg"
          alt="Testimonials background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          speed={600}
          centeredSlides={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="swiper-init"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="max-w-2xl mx-auto backdrop-blur-sm p-8 relative">
                <div className="relative w-24 h-24 mx-auto mb-2 border-4 border-gray-600 rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = "/fallback-image.png";
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-white text-center">
                  {testimonial.name}
                </h3>
                <h4 className="text-gray-400 text-sm text-center mb-4">
                  {testimonial.designation}
                </h4>
                <div className="flex justify-center mb-4 text-yellow-400">
                  {[...Array(parseInt(testimonial.rating))].map((_, i) => (
                    <BiSolidStar key={i} />
                  ))}
                </div>
                <p className="text-white font-heading italic relative px-8 text-center flex items-center justify-center">
                  <BiSolidQuoteLeft className="text-2xl text-gray-400 mr-2" />
                  <span>{testimonial.content}</span>
                  <BiSolidQuoteRight className="text-2xl text-gray-400 ml-2" />
                </p>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-pagination !bottom-0 mt-8" />
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
