"use client";

import { useEffect, useRef, useState } from "react";

export default function OnoderaJump() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const [canvasSize, setCanvasSize] = useState({ width: 360, height: 500 });

  useEffect(() => {
    // Resize canvas based on screen
    const width = window.innerWidth < 400 ? window.innerWidth - 20 : 360;
    const height = window.innerHeight < 600 ? window.innerHeight - 100 : 500;
    setCanvasSize({ width, height });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const birdImg = new Image();
    birdImg.src = "/bird.png";

    let bird, pipes, frame, scoreCount, animation;

    const initGame = () => {
      bird = {
        x: 50,
        y: 150,
        width: 35,
        height: 35,
        gravity: 0.6,
        lift: -8,
        velocity: 0,
      };

      pipes = [];
      frame = 0;
      scoreCount = 0;
      setScore(0);
      setIsGameOver(false);
    };

    const jump = () => {
      if (!isGameOver) {
        bird.velocity = bird.lift;
      }
    };

    const keyHandler = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isGameOver) {
          restartGame();
        } else {
          jump();
        }
      }
    };

    const restartGame = () => {
      initGame();
      gameLoop();
    };

    const drawPipe = (pipe) => {
      ctx.fillStyle = "#16a34a";
      ctx.fillRect(pipe.x, 0, 50, pipe.top);
      ctx.fillRect(pipe.x, pipe.bottom, 50, canvas.height - pipe.bottom);
    };

    const drawBird = () => {
      ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    const drawScore = () => {
      ctx.fillStyle = "#333";
      ctx.font = "18px Arial";
      ctx.fillText(`Score: ${scoreCount}`, 10, 25);
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bird.velocity += bird.gravity;
      bird.y += bird.velocity;

      if (frame % 100 === 0) {
        const top = Math.random() * (canvas.height / 2);
        const gap = 110;
        const bottom = top + gap;
        pipes.push({ x: canvas.width, top, bottom });
      }

      for (let i = pipes.length - 1; i >= 0; i--) {
        const pipe = pipes[i];
        pipe.x -= 2;
        drawPipe(pipe);

        if (
          bird.x < pipe.x + 50 &&
          bird.x + bird.width > pipe.x &&
          (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
        ) {
          setIsGameOver(true);
          cancelAnimationFrame(animation);
          return;
        }

        if (pipe.x + 50 < 0) {
          pipes.splice(i, 1);
          scoreCount++;
          setScore(scoreCount);
        }
      }

      if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        setIsGameOver(true);
        cancelAnimationFrame(animation);
        return;
      }

      drawBird();
      drawScore();

      frame++;
      animation = requestAnimationFrame(gameLoop);
    };

    birdImg.onload = () => {
      initGame();
      gameLoop();
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
      cancelAnimationFrame(animation);
    };
  }, [canvasSize, isGameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-4">
      <h1 className="text-2xl font-bold mb-2 text-blue-800">Onodera Jump</h1>
      <canvas ref={canvasRef} className="rounded-md shadow-lg border border-gray-300" />
      <p className="text-sm text-gray-600 mt-2">Tekan <strong>Spasi</strong> untuk melompat</p>

      {isGameOver && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <p className="text-red-500 font-semibold text-lg">Game Over</p>
          <p className="text-blue-800">Score: {score}</p>
          <button
            onClick={() => location.reload()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}
