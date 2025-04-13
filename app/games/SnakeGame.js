"use client";

import { useEffect, useRef, useState } from "react";

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const box = 20;
  const canvasSize = 400;
  const [snake, setSnake] = useState([{ x: 9 * box, y: 10 * box }]);
  const [food, setFood] = useState(randomFood());
  const [dx, setDx] = useState(1);
  const [dy, setDy] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef();

  function randomFood() {
    return {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function draw() {
      ctx.fillStyle = "#0f172a"; // background
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Draw snake
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#22c55e" : "#16a34a";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#1e293b";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
      }

      // Draw food
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(food.x, food.y, box, box);

      const headX = snake[0].x + dx * box;
      const headY = snake[0].y + dy * box;

      // Game over conditions
      if (
        headX < 0 ||
        headY < 0 ||
        headX >= canvasSize ||
        headY >= canvasSize ||
        collision(headX, headY, snake)
      ) {
        clearInterval(intervalRef.current);
        setGameOver(true);
        return;
      }

      const newHead = { x: headX, y: headY };

      let newSnake = [...snake];
      if (headX === food.x && headY === food.y) {
        setScore((prev) => prev + 1);
        setFood(randomFood());
      } else {
        newSnake.pop();
      }

      newSnake.unshift(newHead);
      setSnake(newSnake);
    }

    intervalRef.current = setInterval(draw, 120);

    function handleKey(e) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp" && dy === 0) {
          setDx(0);
          setDy(-1);
        } else if (e.key === "ArrowDown" && dy === 0) {
          setDx(0);
          setDy(1);
        } else if (e.key === "ArrowLeft" && dx === 0) {
          setDx(-1);
          setDy(0);
        } else if (e.key === "ArrowRight" && dx === 0) {
          setDx(1);
          setDy(0);
        }
      }
    }

    window.addEventListener("keydown", handleKey, { passive: false });

    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener("keydown", handleKey);
    };
  }, [snake, dx, dy, food]);

  function collision(x, y, array) {
    return array.some((segment) => segment.x === x && segment.y === y);
  }

  const restartGame = () => {
    setSnake([{ x: 9 * box, y: 10 * box }]);
    setFood(randomFood());
    setDx(1);
    setDy(0);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-2">🐍 Snake Game</h1>
      <div className="flex items-center gap-6 mb-4">
        <p className="text-lg">🎯 Score: <span className="font-semibold">{score}</span></p>
        {gameOver && (
          <button
            onClick={restartGame}
            className="px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold"
          >
            🔁 Restart
          </button>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="border-4 border-green-500 bg-slate-800"
      />
      <p className="mt-4 text-sm text-slate-400">Gunakan tombol panah untuk bermain.</p>
    </div>
  );
}
