"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Grid = (number | null)[][];
const GRID_SIZE = 4;

const getTileStyle = (value: number | null) => {
  if (!value) return "bg-slate-200/30 dark:bg-slate-800/30 backdrop-blur-sm";
  
  switch (value) {
    case 2: return "bg-white text-slate-700 shadow-sm";
    case 4: return "bg-slate-100 text-slate-800 shadow-sm";
    case 8: return "bg-orange-300 text-white shadow-md";
    case 16: return "bg-orange-400 text-white shadow-md";
    case 32: return "bg-orange-500 text-white shadow-lg";
    case 64: return "bg-red-500 text-white shadow-lg";
    case 128: return "bg-amber-400 text-white shadow-[0_0_15px_rgba(251,191,36,0.5)] text-4xl";
    case 256: return "bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.6)] text-4xl";
    case 512: return "bg-yellow-500 text-white shadow-[0_0_25px_rgba(234,179,8,0.7)] text-4xl";
    case 1024: return "bg-yellow-600 text-white shadow-[0_0_30px_rgba(202,138,4,0.8)] text-3xl";
    case 2048: return "bg-yellow-400 text-white shadow-[0_0_40px_rgba(250,204,21,1)] ring-4 ring-yellow-200 text-3xl font-black";
    default: return "bg-slate-900 text-white shadow-2xl text-3xl font-black ring-2 ring-white/20"; // > 2048
  }
};

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [hasContinued, setHasContinued] = useState(false);
  
  const touchStartRef = useRef<{x: number, y: number} | null>(null);

  // Initialize
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRandomTile = (currentGrid: Grid): Grid => {
    const emptyCells: {r: number, c: number}[] = [];
    currentGrid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell === null) emptyCells.push({r, c});
      });
    });

    if (emptyCells.length === 0) return currentGrid;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newValue = Math.random() < 0.9 ? 2 : 4;
    
    const newGrid = currentGrid.map(row => [...row]);
    newGrid[randomCell.r][randomCell.c] = newValue;
    return newGrid;
  };

  const initGame = () => {
    let newGrid: Grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setHasContinued(false);
  };

  const checkGameOver = (currentGrid: Grid) => {
    // Any empty cells?
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentGrid[r][c] === null) return false;
      }
    }
    
    // Any possible merges?
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const val = currentGrid[r][c];
        if (
          (r < GRID_SIZE - 1 && currentGrid[r + 1][c] === val) ||
          (c < GRID_SIZE - 1 && currentGrid[r][c + 1] === val)
        ) {
          return false;
        }
      }
    }
    
    return true;
  };

  const move = useCallback((direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    if (gameOver || (gameWon && !hasContinued)) return;

    let newGrid = grid.map(row => [...row]);
    let moved = false;
    let pointsGained = 0;
    let won = false;

    // Helper to process a single line (row or column)
    const processLine = (line: (number | null)[]) => {
      // Remove nulls
      const filtered = line.filter(val => val !== null) as number[];
      // Merge
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          pointsGained += filtered[i];
          if (filtered[i] === 2048) won = true;
          filtered.splice(i + 1, 1);
        }
      }
      // Pad with nulls
      while (filtered.length < GRID_SIZE) {
        filtered.push(null as unknown as number); // Type hack for padding
      }
      return filtered as unknown as (number | null)[];
    };

    if (direction === "LEFT" || direction === "RIGHT") {
      for (let r = 0; r < GRID_SIZE; r++) {
        let row = newGrid[r];
        if (direction === "RIGHT") row = row.reverse();
        
        const newRow = processLine(row);
        
        if (direction === "RIGHT") newRow.reverse();
        
        // Check if row changed
        if (newGrid[r].join(",") !== newRow.join(",")) moved = true;
        newGrid[r] = newRow;
      }
    } else if (direction === "UP" || direction === "DOWN") {
      for (let c = 0; c < GRID_SIZE; c++) {
        let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
        if (direction === "DOWN") col = col.reverse();
        
        const newCol = processLine(col);
        
        if (direction === "DOWN") newCol.reverse();
        
        // Check if col changed
        for (let r = 0; r < GRID_SIZE; r++) {
          if (newGrid[r][c] !== newCol[r]) moved = true;
          newGrid[r][c] = newCol[r];
        }
      }
    }

    if (moved) {
      newGrid = addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(s => s + pointsGained);
      
      if (won && !hasContinued) setGameWon(true);
      if (checkGameOver(newGrid)) setGameOver(true);
    }
  }, [grid, gameOver, gameWon, hasContinued]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBestScore(prev => Math.max(prev, score));
  }, [score]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case "ArrowUp": move("UP"); break;
        case "ArrowDown": move("DOWN"); break;
        case "ArrowLeft": move("LEFT"); break;
        case "ArrowRight": move("RIGHT"); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  // Touch controls
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const dx = touchEndX - touchStartRef.current.x;
    const dy = touchEndY - touchStartRef.current.y;
    
    // Minimum swipe distance
    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) move("RIGHT");
      else move("LEFT");
    } else {
      if (dy > 0) move("DOWN");
      else move("UP");
    }
    
    touchStartRef.current = null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-8 px-4 relative">
      <div className="w-full max-w-[450px] relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 drop-shadow-sm">
            2048
          </h1>
          <div className="flex gap-3">
            <div className="glass-panel px-5 py-2 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-0.5">Score</span>
              <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">{score}</span>
            </div>
            <div className="glass-panel px-5 py-2 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-0.5">Best</span>
              <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">{bestScore}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <p className="text-slate-600 dark:text-slate-400 font-medium text-sm md:text-base leading-snug pr-4">
            Join the numbers and get to the <span className="font-bold text-amber-500 dark:text-amber-400">2048 tile!</span>
          </p>
          <button
            onClick={initGame}
            className="bg-slate-800 hover:bg-slate-700 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold py-3 px-6 rounded-xl transition-all active:scale-95 whitespace-nowrap shadow-lg"
          >
            New Game
          </button>
        </div>

        {/* Game Board Container */}
        <div 
          className="relative glass p-3 md:p-4 rounded-[2rem] w-full aspect-square touch-none shadow-[0_20px_50px_rgba(245,158,11,0.15)] border border-white/20 dark:border-white/5"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Grid Background */}
          <div className="absolute inset-3 md:inset-4 grid grid-cols-4 grid-rows-4 gap-2 md:gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={`bg-${i}`} className="bg-slate-200/50 dark:bg-slate-800/40 rounded-xl w-full h-full shadow-inner" />
            ))}
          </div>

          {/* Tiles */}
          <div className="absolute inset-3 md:inset-4 grid grid-cols-4 grid-rows-4 gap-2 md:gap-3">
            {grid.map((row, r) => row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`flex items-center justify-center rounded-xl font-bold text-3xl md:text-4xl transition-all duration-150 transform ${
                  cell ? "scale-100 opacity-100" : "scale-0 opacity-0"
                } ${getTileStyle(cell)}`}
              >
                {cell}
              </div>
            )))}
          </div>

          {/* Overlays */}
          {(gameOver || (gameWon && !hasContinued)) && (
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/80 backdrop-blur-md z-20 flex flex-col items-center justify-center rounded-[2rem] animate-in zoom-in duration-300">
              <h2 className={`text-5xl font-black mb-6 drop-shadow-md ${gameWon ? 'text-amber-500' : 'text-slate-700 dark:text-white'}`}>
                {gameWon ? "You Win! 🎉" : "Game Over!"}
              </h2>
              <div className="flex flex-col gap-4 w-2/3">
                {gameWon && !hasContinued && (
                  <button
                    onClick={() => setHasContinued(true)}
                    className="w-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-bold py-4 px-6 rounded-xl transition-all active:scale-95 shadow-lg text-lg"
                  >
                    Keep Going
                  </button>
                )}
                <button
                  onClick={initGame}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-95 shadow-lg text-lg"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
        
        <p className="mt-8 text-slate-500 dark:text-slate-400 text-sm text-center font-medium bg-white/40 dark:bg-slate-900/40 p-4 rounded-xl border border-white/20 dark:border-white/5 backdrop-blur-sm">
          <strong>How to play:</strong> Use your <strong>arrow keys</strong> or <strong>swipe</strong> to move the tiles. Tiles with the same number merge into one when they touch.
        </p>
      </div>
    </div>
  );
}
