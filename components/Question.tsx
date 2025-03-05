"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoQuestion } from "react-icons/go";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "./ui/loading";

const Question = () => {
  const [faqData, setFaqData] = useState<{
    title: string;
    description: string;
    qa: { question: string; answer: string }[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch("https://admin.clickpoint.com.np/public/api/frequest-questions", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setFaqData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []);
  if (loading) {
    return (
      <section id="features" className="py-12 md:py-16 bg-indigo-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <Loading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="features" className="py-12 md:py-16 bg-indigo-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </section>
    );
  }

  if (!faqData) {
    return (
      <section id="features" className="py-12 md:py-16 bg-indigo-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <p className="text-center font-semibold">FAQ data is not available.</p>
        </div>
      </section>
    );
  }
  return (
    <section
      id="features"
      className="py-12 md:py-16 bg-indigo-50"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="flex flex-col w-full md:w-1/2">
            <span className="text-indigo-900 text-2xl md:text-3xl mt-8 md:mt-20">
              Frequently Asked <span className="font-semibold">Questions</span>
            </span>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              {faqData.description}
            </p>

            <Accordion type="single" collapsible className="w-full mt-4">
              {faqData.qa.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm md:text-base text-indigo-900 font-bold data-[state=open]:text-green-500">
                  <div className="flex items-center gap-2">
                    <GoQuestion className="w-6 h-6 flex-shrink-0 text-green-600" />
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base font-heading text-gray-800 text-justify">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <Image
              src="/images/faq.jpg"
              alt="FAQ Illustration"
              width={800}
              height={800}
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Question;
