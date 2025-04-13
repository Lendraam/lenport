"use client";

import FlappyBird from "@/components/games/FlappyBird";

export default function FlappyBirdPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-900 text-white">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <img src="/bird.png" alt="Onodera Jump" className="inline-block w-20 h-20 mr-2" />
        Onodera Jump
      </h1>
      <FlappyBird />
    </div>
  );
}
