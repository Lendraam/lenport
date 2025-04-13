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
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      snake.forEach((segment, i) => {
        ctx.fillStyle = i === 0 ? "#22c55e" : "#16a34a";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "#1e293b";
        ctx.strokeRect(segment.x, segment.y, box, box);
      });

      ctx.fillStyle = "#ef4444";
      ctx.fillRect(food.x, food.y, box, box);

      const headX = snake[0].x + dx * box;
      const headY = snake[0].y + dy * box;

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
      const newSnake = [...snake];

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
        if (e.key === "ArrowUp" && dy === 0) setDxDy(0, -1);
        else if (e.key === "ArrowDown" && dy === 0) setDxDy(0, 1);
        else if (e.key === "ArrowLeft" && dx === 0) setDxDy(-1, 0);
        else if (e.key === "ArrowRight" && dx === 0) setDxDy(1, 0);
      }
    }

    window.addEventListener("keydown", handleKey, { passive: false });
    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener("keydown", handleKey);
    };
  }, [snake, dx, dy, food]);

  function setDxDy(newDx, newDy) {
    setDx(newDx);
    setDy(newDy);
  }

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
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <p className="text-lg sm:text-xl text-center">
          🎯 Score: <span className="font-semibold">{score}</span>
        </p>
        {gameOver && (
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-semibold"
          >
            🔁 Restart
          </button>
        )}
      </div>

      <div style={{ width: "100%", maxWidth: "400px" }}>
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="w-full border-4 border-green-500 bg-slate-800"
        />
      </div>

      <p className="mt-4 text-sm text-slate-400 text-center max-w-xs">
        Gunakan tombol panah untuk mengontrol ular. Jangan tabrak dinding atau tubuh sendiri!
      </p>

      {gameOver && (
        <div className="absolute bottom-10 p-3 bg-yellow-400 text-black rounded-full shadow">
          💀 Game Over
        </div>
      )}
    </div>
  );
}
