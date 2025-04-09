"use client";

import React, { useState } from "react";
import PortfolioGallery from "@/components/PortfolioGallery";
import { motion } from "framer-motion";
import { FaSchool, FaUniversity, FaGraduationCap } from "react-icons/fa";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function PortfolioPage() {
  const [selected, setSelected] = useState(null);

  const timelineData = [
    {
      tahun: "2009 - 2015",
      sekolah: "SDN Linggar 3",
      deskripsi: "Tempat di mana saya pertama kali mengenal dunia pendidikan formal dan membangun fondasi karakter serta rasa ingin tahu.",
      icon: <FaSchool />,
    },
    {
      tahun: "2015 - 2018",
      sekolah: "SMPN 1 Cimanggung",
      deskripsi: "Di sini saya mulai menyukai dunia teknologi dan belajar lebih banyak tentang kerja tim dan organisasi.",
      icon: <FaSchool />,
    },
    {
      tahun: "2018 - 2021",
      sekolah: "SMK Guna Dharma Nusantara",
      deskripsi: "Mendalami keahlian di bidang RPL (Rekayasa Perangkat Lunak), aktif dalam berbagai proyek sekolah dan kompetisi IT.",
      icon: <FaGraduationCap />,
    },
    {
      tahun: "2023 - Sekarang",
      sekolah: "Universitas Ma'soem",
      deskripsi: "Melanjutkan studi di bidang teknologi informasi dan semakin fokus dalam pengembangan web dan sistem digital.",
      icon: <FaUniversity />,
    },
  ];

  return (
    <>
      <PortfolioGallery selected={selected} setSelected={setSelected} />

      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl relative transition-colors duration-300">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold mb-3">{selected.title}</h3>
            <p className="text-sm leading-relaxed">{selected.description}</p>
          </div>
        </div>
      )}

      {/* Skill Set Section */}
      <section className="my-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-blue-600 dark:text-yellow-400 mb-8">
          My Skill Set & Technologies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-center">
          {[
            { Icon: FaHtml5, name: "HTML5", color: "text-orange-500" },
            { Icon: FaCss3Alt, name: "CSS3", color: "text-blue-500" },
            { Icon: FaJsSquare, name: "JavaScript", color: "text-yellow-500" },
            { Icon: FaReact, name: "React", color: "text-blue-400" },
            { Icon: SiNextdotjs, name: "Next.js", color: "text-black dark:text-white" },
            { Icon: SiTailwindcss, name: "Tailwind CSS", color: "text-cyan-400" },
            { Icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
            { Icon: FaGitAlt, name: "Git", color: "text-red-500" },
          ].map(({ Icon, name, color }, i) => (
            <div className="text-center" key={i}>
              <Icon className={`text-6xl ${color} hover:opacity-80 transition-all duration-300`} />
              <p className="mt-2 text-sm">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="my-24 px-2 sm:px-6">
        <h2 className="text-4xl font-bold text-center text-blue-600 dark:text-yellow-400 mb-16">
          🎓 Jejak Langkah Pendidikan Saya
        </h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-400 dark:bg-yellow-400"></div>

          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
              key={index}
              className={`mb-8 flex flex-col md:flex-row items-center ${
                isLeft ? "md:justify-start" : "md:justify-end"
              }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {isLeft && (
                  <div className="md:w-1/2 px-4">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-md">
                      <div className="flex items-center gap-3 text-blue-600 dark:text-yellow-400 text-xl mb-2">
                        {item.icon}
                        <h3 className="font-bold">{item.sekolah}</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.tahun}</p>
                      <p className="text-sm leading-relaxed">{item.deskripsi}</p>
                    </div>
                  </div>
                )}

        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 dark:bg-yellow-400 border-4 border-white dark:border-gray-900 z-10 shadow-lg" />

                {!isLeft && (
                  <div className="md:w-1/2 px-4">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow-md">
                      <div className="flex items-center gap-3 text-blue-600 dark:text-yellow-400 text-xl mb-2">
                        {item.icon}
                        <h3 className="font-bold">{item.sekolah}</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.tahun}</p>
                      <p className="text-sm leading-relaxed">{item.deskripsi}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="my-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-blue-600 dark:text-yellow-400 mb-8">
          Connect with Me
        </h2>

        <div className="flex justify-center gap-8">
          {[
            { href: "https://github.com/lendraafrizan", Icon: FaGithub, color: "text-gray-800 dark:text-white" },
            { href: "https://www.linkedin.com/in/lendraafrizan", Icon: FaLinkedin, color: "text-blue-600" },
            { href: "https://twitter.com/lendraafrizan", Icon: FaTwitter, color: "text-blue-400" },
            { href: "https://www.instagram.com/lendraafrizan", Icon: FaInstagram, color: "text-pink-500" },
          ].map(({ href, Icon, color }, idx) => (
            <a href={href} target="_blank" rel="noopener noreferrer" key={idx}>
              <Icon className={`text-4xl ${color} hover:opacity-75 transition duration-300`} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
