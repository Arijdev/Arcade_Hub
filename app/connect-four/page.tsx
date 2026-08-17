"use client";

import { useState, useCallback } from "react";

type Player = "Red" | "Yellow" | null;
const ROWS = 6;
const COLS = 7;

type WinInfo = {
  winner: Player | "Draw";
  winningCells: [number, number][];
};

export default function ConnectFour() {
  const [board, setBoard] = useState<Player[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>("Red");
  const [winInfo, setWinInfo] = useState<WinInfo | null>(null);

  const checkWin = useCallback((currentBoard: Player[][], row: number, col: number, player: Player): WinInfo | null => {
    // Helper to get winning cells in a direction
    const getWinCells = (dRow: number, dCol: number): [number, number][] => {
      const cells: [number, number][] = [[row, col]];
      
      // Check forward
      let r = row + dRow;
      let c = col + dCol;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && currentBoard[r][c] === player) {
        cells.push([r, c]);
        r += dRow;
        c += dCol;
      }

      // Check backward
      r = row - dRow;
      c = col - dCol;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && currentBoard[r][c] === player) {
        cells.push([r, c]);
        r -= dRow;
        c -= dCol;
      }

      return cells.length >= 4 ? cells : [];
    };

    const hWin = getWinCells(0, 1);
    if (hWin.length >= 4) return { winner: player, winningCells: hWin };

    const vWin = getWinCells(1, 0);
    if (vWin.length >= 4) return { winner: player, winningCells: vWin };

    const d1Win = getWinCells(1, 1);
    if (d1Win.length >= 4) return { winner: player, winningCells: d1Win };

    const d2Win = getWinCells(1, -1);
    if (d2Win.length >= 4) return { winner: player, winningCells: d2Win };

    return null;
  }, []);

  const handleColumnClick = (colIndex: number) => {
    if (winInfo) return;

    const newBoard = board.map(row => [...row]);
    
    // Find lowest available row in this column
    let targetRow = -1;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (!newBoard[r][colIndex]) {
        targetRow = r;
        break;
      }
    }

    // Column is full
    if (targetRow === -1) return;

    newBoard[targetRow][colIndex] = currentPlayer;
    setBoard(newBoard);

    const winResult = checkWin(newBoard, targetRow, colIndex, currentPlayer);
    if (winResult) {
      setWinInfo(winResult);
    } else {
      // Check for draw
      const isDraw = newBoard.every(row => row.every(cell => cell !== null));
      if (isDraw) {
        setWinInfo({ winner: "Draw", winningCells: [] });
      } else {
        setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
      }
    }
  };

  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setCurrentPlayer("Red");
    setWinInfo(null);
  };

  const isWinningCell = (r: number, c: number) => {
    if (!winInfo) return false;
    return winInfo.winningCells.some(([winR, winC]) => winR === r && winC === c);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 relative w-full">
      <div className="text-center mb-10 relative z-10 w-full">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 mb-4">
          Connect Four
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-lg font-medium">
          Line up 4 discs horizontally, vertically, or diagonally to win!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-center w-full max-w-[1200px] relative z-10">
        
        {/* Game Board container */}
        <div className="relative glass p-4 md:p-8 rounded-[3rem] shadow-2xl flex-1 w-full max-w-2xl mx-auto border-[16px] border-blue-600 dark:border-blue-700 bg-gradient-to-b from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-900">
          
          <div className="flex justify-between gap-1 mb-4 relative z-20">
            {/* Interactive Column Headers */}
            {Array.from({ length: COLS }).map((_, colIndex) => (
              <button
                key={colIndex}
                onClick={() => handleColumnClick(colIndex)}
                className="flex-1 h-12 rounded-xl hover:bg-white/20 transition-all flex items-center justify-center cursor-pointer group active:bg-white/30"
                disabled={!!winInfo}
              >
                {!winInfo && (
                  <div className={`w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg ${
                    currentPlayer === "Red" ? "bg-gradient-to-b from-red-400 to-red-600" : "bg-gradient-to-b from-yellow-300 to-yellow-500"
                  }`} />
                )}
                <div className="absolute top-14 bottom-0 w-[12%] bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-b-xl z-0"></div>
              </button>
            ))}
          </div>

          <div className="p-2 md:p-4 rounded-2xl flex flex-col gap-2 md:gap-3 relative z-10">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 md:gap-3 justify-between">
                {row.map((cell, colIndex) => {
                  const isWinning = isWinningCell(rowIndex, colIndex);
                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleColumnClick(colIndex)}
                      className={`flex-1 aspect-square rounded-full shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-white/30 ${
                        isWinning ? 'bg-white/20 scale-105 shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'bg-slate-900/60 dark:bg-slate-950/80'
                      }`}
                    >
                      {/* The Piece */}
                      {cell && (
                        <div className={`absolute inset-[8%] rounded-full shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.4),_0_5px_10px_rgba(0,0,0,0.5)] animate-[drop_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)] flex items-center justify-center ${
                          cell === "Red" 
                            ? "bg-gradient-to-br from-red-400 via-red-500 to-red-700" 
                            : "bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600"
                        }`}>
                          <div className={`absolute inset-[15%] rounded-full border-2 ${isWinning ? 'border-white animate-pulse' : 'border-black/10'} mix-blend-overlay`}></div>
                          {isWinning && (
                             <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Game Info Dashboard */}
        <div className="glass p-8 rounded-[3rem] flex flex-col items-center w-full max-w-xs mx-auto shrink-0 shadow-xl border border-white/20">
          <div className="w-full flex flex-col items-center justify-center min-h-[160px] mb-8">
            {winInfo ? (
              <div className="flex flex-col items-center animate-in zoom-in duration-300 text-center">
                {winInfo.winner === "Draw" ? (
                  <>
                    <span className="text-4xl mb-4">🤝</span>
                    <span className="text-2xl font-black text-slate-500 dark:text-slate-400">It&apos;s a Draw!</span>
                  </>
                ) : (
                  <>
                    <span className="text-5xl mb-4 animate-bounce">🏆</span>
                    <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${winInfo.winner === "Red" ? "from-red-500 to-rose-600" : "from-yellow-400 to-amber-500"}`}>
                      {winInfo.winner} Wins!
                    </span>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center w-full">
                <span className="text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold text-sm mb-4">Current Turn</span>
                <div className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-inner ${
                  currentPlayer === "Red" ? "bg-red-500/10 border-2 border-red-500/30" : "bg-yellow-500/10 border-2 border-yellow-500/30"
                }`}>
                  <div className={`w-6 h-6 rounded-full shadow-md ${currentPlayer === "Red" ? "bg-red-500" : "bg-yellow-400"}`}></div>
                  <span className={`text-2xl font-black ${currentPlayer === "Red" ? "text-red-500" : "text-yellow-500"}`}>
                    {currentPlayer}
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={resetGame}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-lg shadow-xl hover:shadow-blue-500/30 transition-all active:scale-95"
          >
            {winInfo ? "Play Again" : "Reset Game"}
          </button>
        </div>
      </div>
      
      {/* Add custom drop animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drop {
          0% { transform: translateY(-400%) scale(1.1); opacity: 0; }
          60% { transform: translateY(10%) scale(0.95); opacity: 1; }
          80% { transform: translateY(-5%) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
}
