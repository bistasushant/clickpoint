"use client";
import React, { useEffect, useState } from "react";
import { BiPhoneCall, BiEnvelope } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import Loading from "./ui/loading";
import { toast } from "sonner"; // Import the toast function

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<{
    address: string;
    phone: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", 
    subject: "",
    message: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          "https://admin.clickpoint.com.np/public/api/contactdetail",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setContactInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  const handleAddressClick = () => {
    if (contactInfo) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        contactInfo.address + " ClickPoint Innovations"
      )}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    try {
      const response = await fetch(
        "https://admin.clickpoint.com.np/public/api/contactus",
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); 
      } else {
        toast.error("Failed to send message."); 
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    }
  };

  if (loading) {
    return (
      <section id="contact" className="py-12 md:py-16" data-aos="fade-up">
        <div className="container max-w-7xl mx-auto px-4">
          <Loading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="contact" className="py-12 md:py-16" data-aos="fade-up">
        <div className="container max-w-7xl mx-auto px-4">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </section>
    );
  }

  if (!contactInfo) {
    return (
      <section id="contact" className="py-12 md:py-16" data-aos="fade-up">
        <div className="container max-w-7xl mx-auto px-4">
          <p className="text-center font-semibold">Contact information is not available.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-12 md:py-16" data-aos="fade-up">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center">
            <h2 className="text-sm font-light text-gray-600 mr-4">CONTACT</h2>
            <div className="flex-grow-0 w-16 sm:w-28 h-[1px] bg-green-500" />
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-indigo-900">
            CHECK OUR CONTACT
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-6">
            <div
              className="flex items-start gap-4 cursor-pointer"
              onClick={handleAddressClick}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleAddressClick();
              }}
            >
              <div className="border-0 bg-green-50 rounded-full px-3 py-3">
                <IoLocationOutline className="text-2xl text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-900 mb-1">
                  Address
                </h3>
                <p className="text-dark font-light text-sm">
                  {contactInfo.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="border-0 bg-green-50 rounded-full px-3 py-3">
                <BiPhoneCall className="text-2xl text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-900 mb-1">
                  Call Us
                </h3>
                <p className="text-dark font-light text-sm">
                  {contactInfo.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="border-0 bg-green-50 rounded-full px-3 py-3">
                <BiEnvelope className="text-2xl text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-900 mb-1">
                  Email Us
                </h3>
                <p className="text-dark font-light text-sm">
                  {contactInfo.email}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-1">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {formError && <p className="text-red-600">{formError}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-green-500 focus:outline-none rounded-md"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-green-500 focus:outline-none rounded-md max-w-full"
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number" 
                    className="w-full px-4 py-3 border border-gray-300 focus:border-green-500 focus:outline-none rounded-md"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-green-500 focus:outline-none rounded-md"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-green-500 focus:outline-none rounded-md"
                    placeholder="Message"
                    required
                  />
                </div>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="px-8 py-3 md:py-6 bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
