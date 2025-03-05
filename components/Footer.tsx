import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useSettings } from "./Setting";
import Image from "next/image";
import Loading from "./ui/loading";
import { useEffect, useState } from "react";
import React from "react";

const socialIcons = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  xTwitter: FaXTwitter,
  linkedin: FaLinkedin,
};

export default function Footer() {
  const { settings, loading: settingsLoading, error: settingsError } = useSettings();
  const [contactInfo, setContactInfo] = useState<{
    address: string;
    phone: string;
    email: string;
    facebook: string | null;
    instagram: string | null;
    xTwitter: string | null;
    linkedin: string | null;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (settingsLoading || loading) {
    return <footer className="text-center"><Loading /></footer>;
  }

  if (settingsError) {
    return (
      <footer className="text-center text-red-600 font-semibold">
        Error loading footer settings.
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="text-center text-red-600 font-semibold">
        Error loading contact details.
      </footer>
    );
  }

  if (!contactInfo) {
    return (
      <footer className="text-center text-red-600 font-semibold">
        Contact information is not available.
      </footer>
    );
  }

  const siteTitle = settings?.site_title || "ClickPoint Innovations";
  const logoUrl = settings?.logo || "/default-logo.png";

  const handleAddressClick = () => {
    if (contactInfo) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        contactInfo.address + " ClickPoint Innovations"
      )}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  return (
    <footer className="bg-violet-950 text-white py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer About */}
          <div>
            <Link href="/" className="flex items-center justify-center md:justify-start">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={120}
                  height={120}
                  className="rounded-xl"
                />
              )}
            </Link>
            <div className="mt-4 text-center md:text-left">
              <p
                className="cursor-pointer hover:text-green-400"
                onClick={handleAddressClick}
              >
                {contactInfo.address}
              </p>
              <p className="mt-3">
                <strong>Phone:</strong> {contactInfo.phone}
              </p>
              <p>
                <strong>Email:</strong> {contactInfo.email}
              </p>
            </div>
            <div className="flex justify-center md:justify-start mt-4 space-x-4">
              {Object.entries(socialIcons).map(([key, Icon]) => {
                const url = contactInfo[key as keyof typeof contactInfo];
                return url ? (
                  <Link key={key} href={url} target="_blank" className="hover:text-green-500">
                    <div className="border rounded-full px-2 py-2 hover:border-green-500">
                      <Icon size={24} />
                    </div>
                  </Link>
                ) : null;
              })}
            </div>
          </div>

          {/* Useful Links */}
          <div className="footer-links">
            <h4 className="text-lg font-semibold mb-4 text-center md:text-left">Useful Links</h4>
            <ul className="space-y-1.5 font-light text-center md:text-left">
              <li>
                <Link href="#" className="hover:text-green-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-center md:text-left">Our Services</h4>
            <ul className="space-y-1.5 font-light text-center md:text-left">
              <li>
                <Link href="#" className="hover:text-green-400">
                  Web Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400">
                  Product Management
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-400">
                  Graphic Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-center md:text-left">Our Newsletter</h4>
            <p className="font-medium text-center md:text-left">
              Subscribe to our newsletter and receive the latest news about our
              products and services!
            </p>
            <form
              action="forms/newsletter.php"
              method="post"
              className="php-email-form mt-4"
            >
              <div className="flex flex-col md:flex-row">
                <input
                  type="email"
                  name="email"
                  className="border border-gray-600 focus:bg-violet-950 focus:border-green-500 text-white rounded-md py-2 px-4 focus:outline-none flex-grow mb-2 md:mb-0 md:mr-2"
                  placeholder="Your Email"
                  required
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="border-b border-gray-600 mt-6" />
      </div>

      <div className="container mx-auto px-4 mt-8 text-center">
        <p>
          © <span>Copyright</span>
          <strong className="px-1">{siteTitle}</strong>
          <span>All Right Reserved</span>
        </p>
        <h2>
          Designed by{" "}
          <span className="text-green-500 hover:text-green-600 font-semibold">
            {siteTitle}
          </span>
        </h2>
      </div>
    </footer>
  );
}
