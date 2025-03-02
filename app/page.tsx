// app/page.tsx
"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Details from "@/components/Detail";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Question from "@/components/Question";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonial";
import { SettingsProvider } from "@/components/Setting";
import Feature from "@/components/Feature";

export default function Home() {
  return (
    <SettingsProvider>
      <Content />
    </SettingsProvider>
  );
}

function Content() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      
      <Stats />
      <Details />
      <Testimonials />
      <Question />
      <Feature />
      <Contact />
      <Footer />
    </>
  );
}
