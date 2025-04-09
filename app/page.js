"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start bg-[var(--background)] text-[var(--foreground)] px-4 py-12 md:px-10 transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Bagian Atas: Tentang Website */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Kiri: Penjelasan */}
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center md:justify-start gap-3"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            🌐 Tentang Website Ini
          </motion.h1>

          <motion.p
            className="text-[var(--foreground)] text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Website ini adalah tempat untuk menampilkan karya, ide, dan eksperimen teknologi yang saya buat.
            Mulai dari <strong>portofolio interaktif</strong>, <strong>form kontak aktif</strong>,
            sistem <strong>rating berbasis database</strong>, hingga fitur <strong>AI chatbot</strong>.
          </motion.p>

          <motion.p
            className="text-[var(--foreground)] text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Dibangun menggunakan <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, dan animasi dari <strong>Framer Motion</strong>,
            website ini terus dikembangkan sebagai laboratorium digital pribadi saya.
          </motion.p>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/home">
              <button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 rounded-full transition text-sm md:text-base">
                home
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Kanan: Ilustrasi Website */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Image
            src="/onodera.gif"
            alt="Ilustrasi Website"
            width={200}
            height={200}
            className="rounded-lg object-contain w-[80%] sm:w-[300px] md:w-[320px]"
            priority
          />
        </motion.div>
      </div>

      {/* Bagian Bawah: Tentang Kosaki Onodera */}
      <motion.div
        className="mt-24 px-6 py-12 bg-[var(--background)] text-[var(--foreground)] rounded-2xl shadow-lg max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center md:items-start gap-8 transition-all duration-300 border border-gray-300 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {/* Teks Penjelasan */}
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-pink-600 dark:text-pink-400 mb-4">
            💖 Siapa itu Kosaki Onodera?
          </h2>
          <p className="text-[var(--foreground)] text-base md:text-lg leading-relaxed">
            <strong>Kosaki Onodera</strong> adalah salah satu karakter utama dari anime dan manga <strong>Nisekoi</strong> karya Naoshi Komi.
            Ia dikenal sebagai gadis pemalu, baik hati, dan penyayang yang menyimpan perasaan pada Raku Ichijo sejak kecil.
          </p>
          <p className="text-[var(--foreground)] text-base md:text-lg mt-3">
            Kosaki lahir pada <strong>3 Juni</strong>, memiliki hobi membuat kue, dan membantu keluarganya mengelola toko wagashi (kue tradisional Jepang).
            Dia adalah lambang dari cinta pertama yang lembut dan penuh harapan.
          </p>
        </div>

        {/* Gambar GIF */}
        <div className="md:w-1/3 flex justify-center">
          <Image
            src="/kosaki.gif"
            alt="Kosaki Onodera"
            width={250}
            height={250}
            className="rounded-xl object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
