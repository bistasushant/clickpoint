"use client";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Walter White",
      role: "Chief Executive Officer",
      image: "/team/team-1.jpg",
      social: [FaXTwitter, FaFacebook, FaInstagram, FaLinkedin],
    },
    {
      id: 2,
      name: "Sarah Jhonson",
      role: "Product Manager",
      image: "/team/team-2.jpg",
      social: [FaXTwitter, FaFacebook, FaInstagram, FaLinkedin],
    },
    {
      id: 3,
      name: "William Anderson",
      role: "CTO",
      image: "/team/team-3.jpg",
      social: [FaXTwitter, FaFacebook, FaInstagram, FaLinkedin],
    },
  ];

  return (
    <section
      id="team"
      className="py-12 md:py-16 bg-white"
      data-aos="fade-up"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center">
            <h2 className="text-sm font-light text-gray-600 mr-4">TEAM</h2>
            <div className="flex-grow-0 w-16 sm:w-28 h-[1px] bg-green-500"  />
          </div>
          <span className="text-2xl md:text-3xl font-semibold text-indigo-900">
            CHECK OUR TEAM
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="group relative overflow-hidden"
              data-aos={`fade-up`}
              data-aos-delay={`${index * 100}`}
            >
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative mx-4 border-0 shadow-lg bg-white -top-8 p-4">
                <div className="text-indigo-900 text-xl font-semibold">
                  {member.name}
                </div>
                <div className="mt-2 border-b border-gray-400 w-16" />
                <div className="flex justify-between items-center">
                  <div className="italic text-sm mt-2 text-gray-600">
                    {member.role}
                  </div>
                  <div className="flex space-x-2">
                    {member.social.map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
