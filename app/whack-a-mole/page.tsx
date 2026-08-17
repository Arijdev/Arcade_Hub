"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const GAME_DURATION = 30; // seconds

export default function WhackAMole() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMole, setActiveMole] = useState<number | null>(null);
  const [whackedMole, setWhackedMole] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const moleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setWhackedMole(null);
    setActiveMole(null);
  };

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setActiveMole(null);
    if (timerRef.current) clearInterval(timerRef.current);
    if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
  }, []);

  const popMole = useCallback(function doPop() {
    if (!isPlaying) return;

    setActiveMole((prevMole) => {
      let newMole;
      do {
        newMole = Math.floor(Math.random() * 9);
      } while (newMole === prevMole);
      return newMole;
    });
    
    setWhackedMole(null); // Reset whacked state for the new mole

    // Random duration for mole to stay up (between 500ms and 1500ms)
    const popDuration = Math.random() * 800 + 600;

    moleTimerRef.current = setTimeout(() => {
      setActiveMole(null);
      // Wait a bit before popping next mole
      setTimeout(() => doPop(), Math.random() * 400 + 200);
    }, popDuration);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      // Start Game Timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Initial Mole Pop
      popMole();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
    };
  }, [isPlaying, endGame, popMole]);

  const whackMole = (index: number) => {
    if (!isPlaying || index !== activeMole || whackedMole === index) return;
    
    setScore((s) => s + 10);
    setWhackedMole(index);
    
    // Mole hides immediately after being whacked
    if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
    setTimeout(() => {
      setActiveMole(null);
      popMole();
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 relative overflow-hidden w-full">
      <div className="text-center mb-10 relative z-20 w-full">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 dark:from-red-400 dark:to-amber-400 mb-4">
          Whack-a-Mole
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg">
          Reflex test! Whack as many moles as you can before time runs out.
        </p>

        <div className="flex justify-center gap-6 md:gap-12">
          <div className="glass px-8 py-4 rounded-3xl flex flex-col items-center min-w-[140px] shadow-lg border-t border-white/40 dark:border-white/10">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Time</span>
            <span className={`text-4xl font-black ${timeLeft <= 5 && isPlaying ? 'text-red-500 animate-pulse' : 'text-slate-800 dark:text-slate-100'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="glass px-8 py-4 rounded-3xl flex flex-col items-center min-w-[140px] shadow-lg border-t border-white/40 dark:border-white/10">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Score</span>
            <span className="text-4xl font-black text-amber-500 dark:text-amber-400">{score}</span>
          </div>
        </div>
      </div>

      <div className="relative p-6 md:p-10 rounded-[3rem] bg-gradient-to-br from-green-500/30 to-emerald-700/30 dark:from-green-800/40 dark:to-emerald-900/40 border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-xl z-10 w-full max-w-[400px] md:max-w-[500px]">
        {/* Grass texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300 via-transparent to-transparent pointer-events-none rounded-[3rem]"></div>

        {!isPlaying && timeLeft === GAME_DURATION && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/40 dark:bg-slate-900/60 backdrop-blur-md rounded-[3rem]">
            <button
              onClick={startGame}
              className="py-5 px-12 rounded-full bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-black text-2xl shadow-[0_10px_30px_rgba(239,68,68,0.4)] hover:shadow-[0_15px_40px_rgba(239,68,68,0.6)] transition-all active:scale-95 transform hover:-translate-y-1"
            >
              Start Game
            </button>
          </div>
        )}

        {!isPlaying && timeLeft === 0 && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/70 dark:bg-slate-900/80 backdrop-blur-lg rounded-[3rem] animate-in zoom-in duration-500">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 mb-4 animate-bounce">Time&apos;s Up!</h2>
            <p className="text-slate-700 dark:text-slate-300 text-2xl mb-8 font-medium">Final Score: <span className="font-black text-amber-500 text-4xl">{score}</span></p>
            <button
              onClick={startGame}
              className="py-4 px-10 rounded-2xl bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-black text-xl shadow-xl hover:shadow-red-500/40 transition-all active:scale-[0.98]"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-[400px] md:max-w-[500px] mx-auto relative z-10">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="relative aspect-square w-full">
              {/* Hole (Background) */}
              <div className="absolute bottom-4 w-full h-1/2 bg-slate-900/80 rounded-[50%] border-b-8 border-slate-950 shadow-inner overflow-hidden">
                 <div className="absolute inset-0 shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)]"></div>
              </div>
              
              {/* Dirt Mound (Front) - pointer-events-none is crucial here to not block clicks on the mole! */}
              <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-b from-[#795548] to-[#4e342e] rounded-[50%] z-20 border-t-[3px] border-[#8d6e63] pointer-events-none shadow-[0_10px_20px_rgba(0,0,0,0.3)]"></div>

              {/* The Mole container */}
              <div className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-[65%] h-[75%] overflow-hidden z-10 pt-2">
                <button
                  disabled={!isPlaying}
                  onClick={() => whackMole(index)}
                  className={`absolute top-0 left-0 w-full h-full cursor-pointer transition-transform duration-[300ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    activeMole === index ? 'translate-y-0' : 'translate-y-[110%]'
                  }`}
                  style={{
                    // Faster hide transition if whacked
                    transitionDuration: whackedMole === index ? '100ms' : '300ms',
                    transitionTimingFunction: whackedMole === index ? 'ease-in' : 'cubic-bezier(0.34,1.56,0.64,1)'
                  }}
                >
                  <div className={`w-full h-full rounded-t-[3rem] bg-gradient-to-b from-[#8D6E63] to-[#4E342E] flex flex-col items-center justify-start pt-[15%] md:pt-[20%] border-[4px] md:border-[6px] border-[#3E2723] border-b-0 relative transition-all duration-150 origin-bottom shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] ${
                    whackedMole === index ? 'opacity-90 scale-y-75 scale-x-110 brightness-75 translate-y-4' : ''
                  }`}>
                    
                    {/* Ears */}
                    <div className="absolute top-[15%] -left-[10%] w-[35%] h-[25%] bg-[#6D4C41] rounded-full border-[3px] border-[#3E2723] -z-10"></div>
                    <div className="absolute top-[15%] -right-[10%] w-[35%] h-[25%] bg-[#6D4C41] rounded-full border-[3px] border-[#3E2723] -z-10"></div>

                    {/* Face Details */}
                    {whackedMole === index ? (
                      <div className="flex gap-2 md:gap-4 mb-1 md:mb-2 font-black text-2xl md:text-4xl text-slate-900 leading-none">
                        <span>X</span>
                        <span>X</span>
                      </div>
                    ) : (
                      <div className="flex gap-4 md:gap-5 mb-1 md:mb-2">
                        <div className="w-4 h-5 md:w-5 md:h-7 bg-slate-900 rounded-full shadow-inner relative overflow-hidden border-[2px] border-[#3E2723]">
                           <div className="absolute top-1 left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="w-4 h-5 md:w-5 md:h-7 bg-slate-900 rounded-full shadow-inner relative overflow-hidden border-[2px] border-[#3E2723]">
                           <div className="absolute top-1 left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Snout */}
                    <div className="relative w-10 h-7 md:w-14 md:h-10 bg-[#FFCCBC] rounded-full mt-1 flex flex-col items-center justify-start pt-1 md:pt-1.5 border-[3px] border-[#3E2723] shadow-md z-10">
                       {/* Nose */}
                       <div className="w-4 h-3 md:w-6 md:h-4 bg-pink-500 rounded-[50%] shadow-inner"></div>
                       {/* Teeth */}
                       <div className="absolute -bottom-2 md:-bottom-3 w-4 h-3 md:w-5 md:h-4 bg-white rounded-b-md border-[2px] border-[#3E2723] shadow-sm"></div>
                    </div>

                    {/* Whack Effect */}
                    {whackedMole === index && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <div className="absolute text-5xl md:text-7xl animate-ping drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">💥</div>
                        <div className="absolute -top-6 md:-top-8 text-4xl md:text-5xl animate-spin drop-shadow-md">💫</div>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
