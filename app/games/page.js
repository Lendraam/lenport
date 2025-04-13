"use client";

import Link from "next/link";

const games = [
  {
    title: "🐍 Snake Game",
    href: "/games/snake",
    desc: "Klasik dan sederhana, kendalikan ular dan raih skor tertinggi!",
  },
  {
    title: "🎮 Onodera Jump",
    href: "/games/flappybird",
    desc: "Bantu Onodera melompat dan menghindari rintangan!",
  },
];

export default function GamesMenu() {
  return (
    <div className="min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-6">🎮 Game Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className="p-6 border rounded-xl shadow-lg transition-transform transform hover:scale-105 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl"
          >
            <h2 className="text-xl font-semibold text-center mb-2">{game.title}</h2>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">{game.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
