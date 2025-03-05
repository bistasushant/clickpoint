"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  BsBuildings,
  BsClipboardPulse,
  BsCommand,
  BsGraphUpArrow,
} from "react-icons/bs";
import Loading from "./ui/loading";

// Define the type for aboutData
interface AboutData {
  main_title: string;
  main_content: string;
  services: {
    service_title: string;
    service_content: string;
    service_icon: string; 
  }[];
}

const iconMap: Record<string, React.ElementType> = {
  BsBuildings,
  BsClipboardPulse,
  BsCommand,
  BsGraphUpArrow,
};

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          "https://admin.clickpoint.com.np/public/api/aboutus",
          {
            headers: { Accept: "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }

        const data: AboutData = await response.json();
        setAboutData(data);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <section><Loading /></section>;
  if (error) return <section className="text-center mt-6 text-red-500 font-semibold">Error: {error.message}</section>;
  if (!aboutData) return <section className="text-center font-semibold">No data found</section>;

  return (
    <section id="about" className="py-12 md:py-16 lg:py-24 bg-white" data-aos="fade-up">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 xl:gap-12 overflow-hidden">
          {/* Content Column */}
          <div className="lg:w-5/12 space-y-4">
            <div className="bg-gray-100 rounded-md w-fit px-3 py-2">
              <h3 className="text-base md:text-lg font-semibold font-heading text-green-600">
                About Us
              </h3>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-indigo-900 leading-tight">
              {aboutData.main_title}
            </h2>
            <p className="text-gray-700 font-heading text-base sm:text-md">
              {aboutData.main_content}
            </p>
            <Button className="font-heading bg-green-600 hover:bg-green-700 text-sm md:text-md px-4 py-3 md:p-5 transition-all">
              Read More <FaArrowRightLong className="ml-2" />
            </Button>
          </div>

          {/* Icon Boxes Grid */}
          <div className="lg:w-7/12 mt-8 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {aboutData.services.map((item, index) => {
                // Dynamically use the icon string from the API response
                const IconComponent = iconMap[item.service_icon];

                return (
                  <div
                    key={index}
                    className="p-6 sm:p-6 md:p-8 bg-white rounded-xl border-2 border-gray-100 shadow-lg transition-all"
                    data-aos="fade-up"
                    data-aos-delay={`${(index % 2) * 100 + 100}`}
                  >
                    {/* Only render icon if valid */}
                    {IconComponent && (
                      <div className="group bg-gray-100 w-[70px] h-[70px] rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
                        <IconComponent
                          size={28}
                          className="text-green-600 group-hover:text-white transition-colors duration-300"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold font-heading text-indigo-900 mt-4 mb-2">
                      {item.service_title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {item.service_content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
