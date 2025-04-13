"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function HomePage() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start bg-[var(--background)] text-[var(--foreground)] px-4 py-12 md:px-10 transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Kiri */}
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Digital Lab Pribadi
          </motion.h1>

          <motion.p
            className="text-base md:text-lg leading-relaxed text-slate-500 dark:text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Tempat eksplorasi ide, eksperimen coding, dan berbagai project unik yang saya buat.
            Mulai dari <span className="font-semibold text-blue-600 dark:text-blue-400">Portofolio Interaktif</span>, 
            <span className="font-semibold text-green-600 dark:text-green-400"> AI Chatbot</span>, 
            <span className="font-semibold text-yellow-500 dark:text-yellow-400"> Form Kontak Aktif</span>, 
            hingga <span className="font-semibold text-red-500 dark:text-red-400">Sistem Rating Otomatis</span>.
          </motion.p>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/home">
              <button className="px-6 py-2 text-white bg-blue-600 rounded-full shadow-[0_0_15px_#3b82f6] hover:shadow-[0_0_25px_#3b82f6] transition duration-300 hover:scale-105 hover:-translate-y-1">
                Mulai Jelajahi
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Kanan */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Image
            src="/onodera.gif"
            alt="Ilustrasi Website"
            width={240}
            height={240}
            className="rounded-xl object-contain w-[80%] sm:w-[280px] md:w-[300px] hover:scale-105 transition-all duration-300"
            priority
          />
        </motion.div>
      </div>

      {/* Tentang Kosaki */}
      <motion.div
        className="mt-24 px-6 py-12 bg-[var(--background)] text-[var(--foreground)] rounded-2xl shadow-lg max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center md:items-start gap-8 transition-all duration-300 border border-gray-300 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-pink-600 dark:text-pink-400 mb-4">
            Siapa itu Kosaki Onodera?
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Kosaki Onodera</strong> adalah karakter utama dalam anime dan manga <strong>Nisekoi</strong> karya Naoshi Komi.
            Ia dikenal sebagai gadis pemalu, penyayang, dan lembut yang menyimpan perasaan pada Lendra sejak kecil.
          </p>
          <p className="mt-3 text-base md:text-lg text-slate-600 dark:text-slate-300">
            Ia lahir pada <strong>3 Juni</strong>, memiliki hobi membuat kue, dan membantu keluarganya mengelola toko wagashi (kue tradisional Jepang).
            Sosok Kosaki adalah representasi klasik dari cinta pertama yang hangat dan penuh harapan.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href="https://myanimelist.net/character/52723/Kosaki_Onodera"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-md transition hover:scale-105"
            >
              <ExternalLink size={16} />
              MyAnimeList Kosaki
            </a>
            <a
              href="https://nisekoi.fandom.com/wiki/Kosaki_Onodera"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-purple-500 hover:bg-purple-600 rounded-full shadow-md transition hover:scale-105"
            >
              <ExternalLink size={16} />
              Fandom Nisekoi
            </a>
          </div>
        </div>

        <div className="md:w-1/3 flex justify-center">
          <Image
            src="/kosaki.gif"
            alt="Kosaki Onodera"
            width={240}
            height={240}
            className="rounded-xl object-contain hover:scale-105 transition-all duration-300"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
