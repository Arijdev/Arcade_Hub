"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const BASE_SPEED = 150;

type Point = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const directionRef = useRef(direction);
  const lastProcessedDirectionRef = useRef(direction); // Crucial for preventing rapid double-turn self-collision

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Make sure food doesn't spawn on the snake
      const onSnake = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!onSnake) break;
    }
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    lastProcessedDirectionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    generateFood(INITIAL_SNAKE);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (lastProcessedDirectionRef.current.y === 0) {
            setDirection({ x: 0, y: -1 });
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (lastProcessedDirectionRef.current.y === 0) {
            setDirection({ x: 0, y: 1 });
          }
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (lastProcessedDirectionRef.current.x === 0) {
            setDirection({ x: -1, y: 0 });
          }
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (lastProcessedDirectionRef.current.x === 0) {
            setDirection({ x: 1, y: 0 });
          }
          break;
        case " ":
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameOver]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const currentDir = directionRef.current;
        lastProcessedDirectionRef.current = currentDir;

        const newHead = {
          x: head.x + currentDir.x,
          y: head.y + currentDir.y,
        };

        // Check Wall Collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          setHighScore((prev) => Math.max(prev, score));
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          setHighScore((prev) => Math.max(prev, score));
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food Collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          generateFood(newSnake);
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    // Increase speed as score increases (max speed capped)
    const currentSpeed = Math.max(60, BASE_SPEED - Math.floor(score / 50) * 10);
    const interval = setInterval(moveSnake, currentSpeed);
    return () => clearInterval(interval);
  }, [food, isGameOver, isPaused, score, generateFood]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-8 px-4 relative">
      <div className="text-center mb-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black text-gradient-primary mb-2 drop-shadow-sm">
          Snake Game
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">Use WASD/Arrows to move. Space to pause.</p>
      </div>

      <div className="flex gap-6 mb-8 relative z-10">
        <div className="glass-panel px-8 py-3 rounded-2xl flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Score</span>
          <span className="text-3xl font-black text-emerald-500">{score}</span>
        </div>
        <div className="glass-panel px-8 py-3 rounded-2xl flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">High Score</span>
          <span className="text-3xl font-black text-teal-600 dark:text-teal-400">{highScore}</span>
        </div>
      </div>

      <div className="relative glass p-4 md:p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(16,185,129,0.15)] z-10">
        {/* Game Grid */}
        <div 
          className="bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-xl overflow-hidden relative shadow-inner"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            width: "min(85vw, 450px)",
            height: "min(85vw, 450px)",
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnakeIndex = snake.findIndex((s) => s.x === x && s.y === y);
            const isHead = isSnakeIndex === 0;
            const isBody = isSnakeIndex > 0;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className="w-full h-full relative"
              >
                {/* Checkerboard Pattern */}
                <div className={`absolute inset-0 ${ (x + y) % 2 === 0 ? 'bg-black/5 dark:bg-white/5' : '' }`}></div>
                
                {isHead && (
                  <div className="absolute inset-0.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-md z-20 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
                )}
                
                {isBody && (
                  <div className={`absolute inset-[1px] bg-gradient-to-br from-green-400 to-emerald-500 rounded-sm z-10 opacity-${Math.max(40, 100 - isSnakeIndex * 2)}`}></div>
                )}
                
                {isFood && (
                  <div className="absolute inset-1 bg-gradient-to-br from-rose-400 to-red-500 rounded-full z-10 shadow-[0_0_15px_rgba(244,63,94,0.6)] animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Overlays */}
        {(isGameOver || isPaused) && (
          <div className="absolute inset-0 z-30 bg-white/60 dark:bg-slate-950/70 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
            {isGameOver ? (
              <>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-500 mb-2">Game Over!</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-8 text-xl font-medium">Final Score: <span className="font-bold text-emerald-500">{score}</span></p>
                <button
                  onClick={resetGame}
                  className="py-3 px-10 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xl shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-[0.98]"
                >
                  Play Again
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-black text-blue-500 mb-8 animate-pulse">Paused</h2>
                <button
                  onClick={() => setIsPaused(false)}
                  className="py-3 px-10 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold text-xl shadow-lg transition-all active:scale-[0.98]"
                >
                  Resume
                </button>
              </>
            )}
          </div>
        )}
      </div>
      
      {/* Mobile Controls */}
      <div className="mt-8 grid grid-cols-3 gap-3 md:hidden relative z-10">
        <div />
        <button onClick={() => { if(lastProcessedDirectionRef.current.y === 0) setDirection({x:0, y:-1}) }} className="glass-panel p-5 rounded-2xl active:bg-slate-300/50 dark:active:bg-slate-700/50 text-2xl flex items-center justify-center">⬆️</button>
        <div />
        <button onClick={() => { if(lastProcessedDirectionRef.current.x === 0) setDirection({x:-1, y:0}) }} className="glass-panel p-5 rounded-2xl active:bg-slate-300/50 dark:active:bg-slate-700/50 text-2xl flex items-center justify-center">⬅️</button>
        <button onClick={() => { if(lastProcessedDirectionRef.current.y === 0) setDirection({x:0, y:1}) }} className="glass-panel p-5 rounded-2xl active:bg-slate-300/50 dark:active:bg-slate-700/50 text-2xl flex items-center justify-center">⬇️</button>
        <button onClick={() => { if(lastProcessedDirectionRef.current.x === 0) setDirection({x:1, y:0}) }} className="glass-panel p-5 rounded-2xl active:bg-slate-300/50 dark:active:bg-slate-700/50 text-2xl flex items-center justify-center">➡️</button>
      </div>
    </div>
  );
}
