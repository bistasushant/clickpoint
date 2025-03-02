"use client";
import React, { useEffect, useState } from "react";
import Loading from "./ui/loading";
import Image from "next/image";

type Detail = {
  image: string;
  title: string;
  content: string;
};

const Details = () => {
  const [details, setDetails] = useState<Detail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Ensure loading is true at the start of fetch
      setError(null); // Clear any previous errors

      try {
        const response = await fetch(
          "https://admin.clickpoint.com.np/public/api/ourdetails",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          // Include the status code in the error message
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }

        const data: Detail[] = await response.json();
        setDetails(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err : new Error(String(err))); // Safely handle non-Error objects
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <section>
        <Loading />
      </section>
    );

  if (error)
    return (
      <section className="text-center mt-6 text-red-500 font-semibold">
        Error: {error.message}
      </section>
    );

  if (!details.length)
    return (
      <section className="text-center font-semibold">No data found</section>
    );

  return (
    <section
      id="details"
      className="py-12 md:py-16 lg:py-20"
      data-aos="fade-up"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <div className="flex items-center">
          <h2 className="text-xs sm:text-sm font-medium text-gray-600 mr-2 sm:mr-4 max-w-[100px] sm:max-w-none">
            DETAILS
          </h2>
          <div className="flex-grow-0 w-16 sm:w-28 h-[1px] bg-green-500" />
        </div>
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-indigo-900 mt-2">
          CHECK OUR DETAILS
        </p>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12">
        {details.map((detail: Detail, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center gap-6 md:gap-8"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div
              className={`w-full lg:w-1/2 ${
                index % 2 !== 0 ? "order-1 lg:order-2" : ""
              }`}
            >
              <Image
                src={detail.image}
                alt={detail.title}
                width={500}
                height={300}
                className="w-full h-auto max-w-md lg:max-w-xl mx-auto object-cover rounded-lg"
              />
            </div>
            <div
              className={`w-full lg:w-1/2 lg:pl-6 xl:pl-8 ${
                index % 2 !== 0 ? "order-2 lg:order-1" : ""
              }`}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-indigo-900">
                {detail.title}
              </h3>
              <div
                className="mb-4 text-gray-600 text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: detail.content }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Details;
