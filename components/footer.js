"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-6 mt-10 shadow-inner">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Info Kiri */}
        <div className="text-center md:text-left text-base">
          © {new Date().getFullYear()} Lendra Afrizan. All rights reserved.
        </div>

        {/* Icon Sosial */}
        <div className="flex gap-5 text-xl">
          <a
            href="https://github.com/lendra"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/lendra"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:lendra@email.com"
            className="hover:text-blue-600 transition duration-300"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
