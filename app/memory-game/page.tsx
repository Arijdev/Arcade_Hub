"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const CARD_IMAGES = [
  "/memory/sword.jpg",
  "/memory/shield.jpg",
  "/memory/potion.jpg",
  "/memory/coin.jpg",
  "/memory/chest.jpg",
  "/memory/controller.jpg",
  "/memory/arcade.jpg",
  "/memory/star.jpg"
];

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Use a ref to track flipped cards independently of render cycle for fast clicks
  const flippedCardsRef = useRef<number[]>([]);

  const initGame = () => {
    const shuffledCards = [...CARD_IMAGES, ...CARD_IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setMoves(0);
    setIsWon(false);
    setIsLocked(false);
    flippedCardsRef.current = [];
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isMatched || cards[index].isFlipped) return;

    // Flip the selected card immediately
    setCards((prev) => prev.map((card, i) => i === index ? { ...card, isFlipped: true } : card));
    flippedCardsRef.current.push(index);

    if (flippedCardsRef.current.length === 2) {
      setIsLocked(true); // Lock board
      setMoves((m) => m + 1);

      const [firstIndex, secondIndex] = flippedCardsRef.current;
      const match = cards[firstIndex].image === cards[secondIndex].image;

      if (match) {
        setCards((prev) => {
          const newCards = prev.map((card, i) => 
            i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
          );
          if (newCards.every((c) => c.isMatched)) setIsWon(true);
          return newCards;
        });
        flippedCardsRef.current = [];
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setCards((prev) => 
            prev.map((card, i) => 
              i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
            )
          );
          flippedCardsRef.current = [];
          setIsLocked(false);
        }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 relative w-full">
      <div className="text-center mb-10 relative z-10 w-full">
        <h1 className="text-4xl md:text-6xl font-black text-gradient mb-4">
          Memory Game
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6 text-lg">
          Test your memory by matching the pixel art pairs!
        </p>
        <div className="inline-flex items-center justify-center gap-6 text-lg font-semibold text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          Moves: <span className="text-purple-600 dark:text-purple-400 text-2xl">{moves}</span>
        </div>
      </div>

      <div className="glass p-6 md:p-8 rounded-3xl shadow-2xl relative z-10 w-full max-w-[600px] mx-auto">
        {isWon && (
          <div className="absolute inset-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center animate-in zoom-in duration-500">
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 mb-4 animate-bounce">
              You Won! 🎉
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-8 text-xl font-medium">Completed in <span className="text-emerald-500 font-bold">{moves}</span> moves</p>
            <button
              onClick={initGame}
              className="py-4 px-10 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xl shadow-xl hover:shadow-purple-500/30 transition-all active:scale-[0.98]"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className="relative aspect-[3/4] w-full cursor-pointer perspective-1000 group"
            >
              <div
                className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
                  card.isFlipped || card.isMatched ? "rotate-y-180" : "group-hover:scale-[1.05]"
                }`}
              >
                {/* Front (Hidden state) */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-xl md:rounded-2xl border-2 border-indigo-400/30 dark:border-indigo-500/30 flex items-center justify-center shadow-lg">
                  <span className="text-white/40 dark:text-white/20 text-4xl md:text-5xl font-black drop-shadow-md">?</span>
                </div>
                
                {/* Back (Revealed state) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center shadow-xl overflow-hidden">
                  <Image 
                    src={card.image} 
                    alt="Memory Card" 
                    fill
                    sizes="(max-width: 768px) 25vw, 15vw"
                    className={`object-cover ${card.isMatched ? 'opacity-50 grayscale contrast-125 transition-all duration-1000' : ''}`}
                    unoptimized
                  />
                  {card.isMatched && (
                    <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {!isWon && (
        <button
          onClick={initGame}
          className="mt-10 py-3 px-8 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 font-semibold transition-all border border-slate-300 dark:border-slate-700 relative z-10"
        >
          Restart Game
        </button>
      )}
    </div>
  );
}
