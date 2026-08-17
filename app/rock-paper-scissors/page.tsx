"use client";

import { useState } from "react";

type Choice = "rock" | "paper" | "scissors" | null;
type Result = "win" | "lose" | "draw" | null;

const CHOICES = {
  rock: { name: "Rock", icon: "✊", defeats: "scissors", color: "from-slate-400 to-slate-600" },
  paper: { name: "Paper", icon: "✋", defeats: "rock", color: "from-blue-400 to-indigo-600" },
  scissors: { name: "Scissors", icon: "✌️", defeats: "paper", color: "from-rose-400 to-red-600" },
};

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const playGame = (choice: Choice) => {
    if (!choice || isPlaying) return;
    
    setIsPlaying(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);

    // Simulate "thinking" or shaking delay
    setTimeout(() => {
      const choicesArray = Object.keys(CHOICES) as Choice[];
      const randomChoice = choicesArray[Math.floor(Math.random() * 3)];
      setComputerChoice(randomChoice);

      if (choice === randomChoice) {
        setResult("draw");
      } else if (CHOICES[choice].defeats === randomChoice) {
        setResult("win");
        setScore((s) => ({ ...s, player: s.player + 1 }));
      } else {
        setResult("lose");
        setScore((s) => ({ ...s, computer: s.computer + 1 }));
      }
      setIsPlaying(false);
    }, 1200);
  };

  const getResultText = () => {
    if (result === "win") return <span className="text-emerald-500 dark:text-emerald-400 animate-bounce block">You Win! 🎉</span>;
    if (result === "lose") return <span className="text-rose-500 dark:text-rose-400 block">Computer Wins 😢</span>;
    if (result === "draw") return <span className="text-amber-500 dark:text-amber-400 block">It&apos;s a Draw! 🤝</span>;
    return <span className="text-slate-400 dark:text-slate-500 block">Make your choice!</span>;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 relative">
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 dark:from-orange-400 dark:to-rose-400 mb-4">
          Rock Paper Scissors
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg font-medium">
          Can you beat the computer? First to your highest score wins your pride!
        </p>
        
        <div className="flex justify-center items-center gap-8 md:gap-16">
          <div className="glass px-8 py-4 rounded-3xl flex flex-col items-center min-w-[120px] shadow-lg border-t border-white/40 dark:border-white/10">
            <span className="text-xs uppercase tracking-widest text-blue-500 font-bold mb-1">You</span>
            <span className="text-5xl font-black text-slate-800 dark:text-slate-100">{score.player}</span>
          </div>
          <div className="text-slate-300 dark:text-slate-700 font-black text-3xl">-</div>
          <div className="glass px-8 py-4 rounded-3xl flex flex-col items-center min-w-[120px] shadow-lg border-t border-white/40 dark:border-white/10">
            <span className="text-xs uppercase tracking-widest text-rose-500 font-bold mb-1">Comp</span>
            <span className="text-5xl font-black text-slate-800 dark:text-slate-100">{score.computer}</span>
          </div>
        </div>
      </div>

      <div className="glass w-full max-w-3xl p-8 md:p-12 rounded-[3rem] shadow-2xl relative z-10 border border-white/20 dark:border-white/5">
        <div className="h-16 flex items-center justify-center text-4xl font-black mb-12 transition-all duration-300">
          {isPlaying ? (
            <span className="text-slate-500 dark:text-slate-400 animate-pulse flex gap-2">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>Rock,</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>Paper,</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>Scissors...</span>
            </span>
          ) : (
            getResultText()
          )}
        </div>

        <div className="flex justify-between items-center gap-4 mb-16 relative">
          {/* Player Side */}
          <div className="flex-1 flex flex-col items-center">
            <div className={`relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full shadow-2xl transition-all duration-500 transform ${isPlaying ? 'animate-[bounce_0.5s_infinite_alternate]' : ''} ${playerChoice ? 'bg-gradient-to-br ' + CHOICES[playerChoice].color : 'bg-slate-200 dark:bg-slate-800'}`}>
              <div className="text-6xl md:text-[100px] absolute drop-shadow-lg">
                {playerChoice ? CHOICES[playerChoice].icon : "✊"}
              </div>
            </div>
            <p className="mt-6 text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-sm">You</p>
          </div>

          <div className="text-5xl md:text-6xl font-black text-slate-300 dark:text-slate-700 px-4 italic">VS</div>

          {/* Computer Side */}
          <div className="flex-1 flex flex-col items-center">
            <div className={`relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full shadow-2xl transition-all duration-500 transform ${isPlaying ? 'animate-[bounce_0.5s_infinite_alternate] scale-x-[-1]' : 'scale-x-[-1]'} ${computerChoice ? 'bg-gradient-to-br ' + CHOICES[computerChoice].color : 'bg-slate-200 dark:bg-slate-800'}`}>
              <div className="text-6xl md:text-[100px] absolute drop-shadow-lg">
                {computerChoice ? CHOICES[computerChoice].icon : "✊"}
              </div>
            </div>
            <p className="mt-6 text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase text-sm">Computer</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 md:gap-8">
          {(Object.keys(CHOICES) as Choice[]).map((c) => (
            <button
              key={c}
              disabled={isPlaying}
              onClick={() => playGame(c)}
              className={`group flex flex-col items-center p-4 md:p-6 rounded-[2rem] bg-slate-100/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-700/80 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-xl ${
                playerChoice === c && !isPlaying ? "ring-4 ring-blue-500 bg-white dark:bg-slate-700" : ""
              }`}
            >
              <span className="text-5xl md:text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                {c && CHOICES[c].icon}
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-bold capitalize hidden md:block tracking-wide">
                {c}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={() => setScore({ player: 0, computer: 0 })}
        className="mt-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline underline-offset-4 text-sm font-medium relative z-10"
      >
        Reset Scores
      </button>
    </div>
  );
}
