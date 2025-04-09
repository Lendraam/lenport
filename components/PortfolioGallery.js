"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const portfolioItems = [
  {
    src: "/analisis.jpg",
    alt: "Analisis Proyek",
    title: "Analisis Proyek",
    description:
      "Studi mendalam mengenai kebutuhan pengguna dan analisis sistem sebagai fondasi pembuatan aplikasi.",
    detailedDescription:
      "Proyek ini melibatkan pemahaman yang mendalam terhadap permasalahan pengguna. Proses analisis meliputi wawancara dengan pengguna, pemetaan kebutuhan fungsional dan non-fungsional, serta analisis kekuatan dan kelemahan sistem yang ada. Dengan pendekatan yang sistematis, kami menyusun dokumentasi analisis yang menjadi acuan untuk pengembangan aplikasi lebih lanjut.",
  },
  {
    src: "/chatbot.jpg",
    alt: "Chatbot AI",
    title: "Chatbot AI",
    description:
      "Proyek chatbot berbasis AI untuk menjawab pertanyaan secara otomatis, dibangun dengan teknologi NLP modern.",
    detailedDescription:
      "Chatbot ini menggunakan Natural Language Processing (NLP) untuk memproses dan memahami pertanyaan pengguna dalam bahasa alami. Menggunakan model AI berbasis machine learning, chatbot ini dapat menjawab pertanyaan dengan tingkat akurasi yang tinggi dan terus belajar dari setiap interaksi untuk meningkatkan kualitas responsnya. Dilengkapi dengan integrasi API, chatbot ini dapat digunakan dalam berbagai aplikasi customer service.",
  },
  {
    src: "/koperasi.png",
    alt: "Koperasi App",
    title: "Koperasi App",
    description:
      "Aplikasi pengelolaan simpan pinjam koperasi yang user-friendly dan terhubung ke database online.",
    detailedDescription:
      "Aplikasi ini dirancang untuk memudahkan pengelolaan transaksi koperasi, termasuk pencatatan simpanan, pinjaman, dan pembayaran. Dengan antarmuka yang intuitif, aplikasi ini memungkinkan anggota koperasi untuk mengakses data mereka secara real-time. Backend aplikasi menggunakan database online yang aman, memungkinkan data disimpan dengan aman dan diakses kapan saja, dari mana saja.",
  },
  {
    src: "/webdev.png",
    alt: "Web Development",
    title: "Web Development",
    description:
      "Berbagai proyek pengembangan website dengan stack modern seperti Next.js, Tailwind CSS, dan Firebase.",
    detailedDescription:
      "Dalam pengembangan proyek web ini, kami memanfaatkan teknologi terbaru untuk menghasilkan situs yang cepat, responsif, dan mudah digunakan. Dengan menggunakan Next.js untuk server-side rendering dan Tailwind CSS untuk styling, situs ini tidak hanya memiliki kinerja tinggi tetapi juga desain yang bersih dan minimalis. Firebase digunakan untuk autentikasi pengguna dan penyimpanan data secara real-time, memberikan pengalaman pengguna yang mulus dan dinamis.",
  },
];

export default function PortfolioGallery({ selected, setSelected }) {
  return (
    <section className="min-h-screen bg-[var(--background)] py-12 px-6 transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--foreground)] mb-10">
        Galeri Portfolio
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-2xl shadow-lg bg-[var(--card)] hover:shadow-xl transition-colors duration-300 cursor-pointer"
            onClick={() => setSelected?.(item)}
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.03, rotateY: 5 }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={400}
              className="object-cover w-full h-64"
              layout="responsive"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--background)] text-[var(--foreground)] p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl relative transition-colors duration-300">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="text-2xl font-semibold mb-3">{selected.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {selected.detailedDescription}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
