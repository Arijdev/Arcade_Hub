"use client";

import { useState } from "react";

type Player = "X" | "O" | "";

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(""));
  const [turn, setTurn] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const checkWinner = (currentBoard: Player[]) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], line: [a, b, c] };
      }
    }
    if (!currentBoard.includes("")) return { winner: "Draw", line: null };
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.map((cell, i) => i === index ? turn : cell);
    setBoard(newBoard);

    const winResult = checkWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner as Player | "Draw");
      setWinningLine(winResult.line);
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 relative w-full">
      <div className="text-center mb-10 relative z-10 w-full">
        <h1 className="text-4xl md:text-6xl font-black text-gradient mb-4">
          Tic Tac Toe
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-lg">
          The classic game rebuilt with a premium aesthetic. Play with a friend!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center relative z-10 w-full">
        {/* Game Board */}
        <div className="glass p-6 md:p-8 rounded-3xl w-full max-w-[320px] md:max-w-[420px]">
          <div className="grid grid-cols-3 gap-3 md:gap-4 w-full mx-auto">
            {board.map((cell, idx) => {
              const isWinningCell = winningLine?.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  className={`relative w-full h-full aspect-square rounded-2xl flex items-center justify-center text-5xl md:text-7xl font-black transition-all duration-300 shadow-sm
                    ${cell === "" && winner === null ? "hover:scale-[1.05] hover:shadow-md hover:bg-white/50 dark:hover:bg-slate-700/50 cursor-pointer" : "cursor-default"}
                    ${cell === "X" ? "text-blue-600 dark:text-blue-400" : "text-rose-500 dark:text-rose-400"}
                    ${isWinningCell ? "bg-white dark:bg-slate-700 shadow-lg scale-[1.05] ring-4 ring-emerald-400/50 animate-pulse" : "bg-white/30 dark:bg-slate-800/40"}
                    ${winner && !isWinningCell && winner !== "Draw" ? "opacity-40 grayscale" : ""}
                  `}
                  disabled={cell !== "" || winner !== null}
                >
                  <span className={`transform transition-transform duration-500 ${cell !== "" ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                    {cell}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Info Panel */}
        <div className="glass p-8 rounded-3xl flex flex-col items-center w-full max-w-sm">
          <div className="text-3xl font-black mb-8 h-12 flex items-center justify-center">
            {winner ? (
              winner === "Draw" ? (
                <span className="text-yellow-500 dark:text-yellow-400">It&apos;s a Draw! 🤝</span>
              ) : (
                <span className="text-emerald-500 dark:text-emerald-400 animate-pulse">{winner} Wins! 🏆</span>
              )
            ) : (
              <span className="text-slate-800 dark:text-slate-200">
                Turn: <span className={turn === "X" ? "text-blue-600 dark:text-blue-400" : "text-rose-500 dark:text-rose-400"}>{turn}</span>
              </span>
            )}
          </div>

          <button
            onClick={resetGame}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-bold text-xl shadow-xl hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
          >
            {winner ? "Play Again" : "Restart Game"}
          </button>
        </div>
      </div>
    </div>
  );
}
