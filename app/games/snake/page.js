import SnakeGame from "@/components/games/SnakeGame";

export default function SnakePage() {
  return (
    <div className="p-8 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-4">🐍 Snake Game</h1>
      <SnakeGame />
    </div>
  );
}
