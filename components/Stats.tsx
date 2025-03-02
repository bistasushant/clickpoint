"use client";
import React, { useState, useEffect } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { BsJournalText, BsHeadset } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import Loading from "./ui/loading";

interface Stat {
  id: string;
  title: string;
  number: string;
  icon: string;
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  CiFaceSmile: CiFaceSmile,
  BsJournalText: BsJournalText,
  BsHeadset: BsHeadset,
  IoPeopleOutline: IoPeopleOutline,
};

const Stats = () => {
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "https://admin.clickpoint.com.np/public/api/counters",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch stats: ${response.status} ${response.statusText}`
          );
        }
        const data: Stat[] = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setStats(data);
        } else {
          throw new Error("No valid data found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <section><Loading /></section>;
  }

  if (error) {
    return (
      <section className="text-center text-red-500 font-semibold">
        Error loading stats: {error.message || "Unknown error"}
      </section>
    );
  }

  if (!stats) {
    return <section className="text-center font-semibold">No data available.</section>;
  }

  return (
    <section id="stats" className="bg-gray-100" data-aos="fade-up">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            // Check if the icon exists in the map
            const IconComponent = iconMap[stat.icon] || null; // If not found, set to null
            return (
              <div
                key={stat.id}
                className="group flex flex-col items-center bg-white rounded-md shadow-lg p-4 sm:p-5 md:p-4 relative"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                {/* Icon Container */}
                {IconComponent && (
                  <div className="absolute -top-5 sm:-top-6 bg-white shadow-md rounded-full p-2 sm:p-3 border border-gray-200 group-hover:border-green-200 transition-all">
                    <IconComponent className="text-3xl text-green-500 group-hover:text-green-600 transition-colors" />
                  </div>
                )}

                {/* Content */}
                <div className="mt-8 sm:mt-10 text-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700">
                    {stat.number}
                  </span>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium">
                    {stat.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;