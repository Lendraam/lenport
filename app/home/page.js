"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export default function HomePage() {
  return (
    <>
      <motion.div
        className="min-h-screen flex items-center justify-center bg-[var(--background)] px-6 py-12 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Bagian Kiri: Teks */}
          <div className="text-center md:text-left space-y-6">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-yellow-400"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Selamat Datang 👋
            </motion.h1>

            <TypeAnimation
              sequence={[
                "Web Developer 🚀", 2000,
                "UI/UX Enthusiast 🎨", 2000,
                "Pembelajar Sepanjang Hayat 📚", 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-lg md:text-xl font-medium text-[var(--foreground)] block"
            />

            <motion.p
              className="text-[var(--foreground)] text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Saya <strong>Lendra Afrizan Musadad</strong>, seorang developer yang
              sedang membangun masa depan digital. Lihat portfolio saya untuk tahu
              lebih lanjut!
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row items-center gap-4 md:gap-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/portfolio">
                <button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-yellow-500 dark:text-black rounded-full hover:scale-105 transition">
                  Lihat Portfolio
                </button>
              </Link>

              {/* Icon Sosial */}
              <div className="flex gap-4 text-2xl text-blue-600 dark:text-yellow-300">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                  <FaLinkedin />
                </a>
                <a href="mailto:lendra@email.com" className="hover:scale-110 transition">
                  <FaEnvelope />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bagian Kanan: Gambar Bulat + Efek */}
          <motion.div
            className="bg-[var(--card)] backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col items-center gap-4 border border-gray-300 dark:border-gray-700 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Image
              src="/profile.jpg"
              alt="Foto Profil Lendra"
              width={240}
              height={240}
              className="rounded-full object-cover shadow-md hover:shadow-yellow-400 dark:hover:shadow-yellow-200 transition duration-300"
              priority
            />
            <span className="px-3 py-1 text-sm font-semibold bg-blue-100 dark:bg-yellow-700 dark:text-white text-blue-600 rounded-full">
              Fullstack Developer
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Section Tambahan: Highlights */}
      <section className="mt-16 mb-24 w-full">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
          transition={{ duration: 0.5 }}
        >
          {[
            {
              title: "Responsif & Mobile First",
              desc: "Tampilan optimal di semua perangkat dari desktop hingga ponsel.",
              emoji: "📱",
            },
            {
              title: "Bertenaga Next.js",
              desc: "Menggunakan framework modern untuk performa dan SEO terbaik.",
              emoji: "⚡",
            },
            {
              title: "UI Elegan",
              desc: "Mengutamakan pengalaman pengguna dengan desain bersih & interaktif.",
              emoji: "🎨",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-2xl shadow-md bg-[var(--card)] text-[var(--foreground)] border border-[var(--muted)] hover:scale-105 hover:shadow-xl transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
