"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoQuestion } from "react-icons/go";
import Image from "next/image";

const Question = () => {
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
              aute irure dolor in reprehenderit
            </p>

            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-sm md:text-base text-indigo-900 font-bold data-[state=open]:text-green-500">
                  <div className="flex items-center gap-2">
                    <GoQuestion className="w-6 h-6 flex-shrink-0 text-green-600" />
                    Non consectetur a erat nam at lectus urna duis?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base font-heading text-gray-800">
                  Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id
                  volutpat lacus laoreet non curabitur gravida. Venenatis lectus
                  magna fringilla urna porttitor rhoncus dolor purus non.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-sm md:text-base text-indigo-900 font-bold data-[state=open]:text-green-500">
                  <div className="flex items-center gap-2">
                    <GoQuestion className="w-6 h-6 flex-shrink-0 text-green-600" />
                    Feugiat scelerisque varius morbi enim nunc faucibus a
                    pellentesque?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base font-heading text-gray-800">
                  Dolor sit amet consectetur adipiscing elit pellentesque
                  habitant morbi. Id interdum velit laoreet id donec ultrices.
                  Fringilla phasellus faucibus scelerisque eleifend donec
                  pretium. Est pellentesque elit ullamcorper dignissim. Mauris
                  ultrices eros in cursus turpis massa tincidunt dui.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-sm md:text-base text-indigo-900 font-bold data-[state=open]:text-green-500">
                  <div className="flex items-center gap-2">
                    <GoQuestion className="w-6 h-6 flex-shrink-0 text-green-600" />
                    Dolor sit amet consectetur adipiscing elit pellentesque?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base font-heading text-gray-800">
                  Eleifend mi in nulla posuere sollicitudin aliquam ultrices
                  sagittis orci. Faucibus pulvinar elementum integer enim. Sem
                  nulla pharetra diam sit amet nisl suscipit. Rutrum tellus
                  pellentesque eu tincidunt. Lectus urna duis convallis convallis
                  tellus. Urna molestie at elementum eu facilisis sed odio morbi
                  quis
                </AccordionContent>
              </AccordionItem>
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
