import Link from "next/link";
import { games } from "@/lib/games";

export default function GamesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
          All <span className="text-gradient">Games</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Choose from our collection of interactive games. Click on any game below to start playing instantly!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <Link key={game.id} href={`/${game.id}`}>
            <div className="glass group rounded-3xl p-6 h-full flex flex-col transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_10px_40px_rgba(139,92,246,0.3)] cursor-pointer relative overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-400/50 dark:hover:border-violet-500/50">
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${game.color} transition-all duration-500`}></div>
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl shadow-lg mb-6 transform group-hover:rotate-12 transition-transform duration-500 group-hover:scale-110`}>
                {game.icon}
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors relative z-10">
                {game.name}
              </h2>
              
              <p className="text-slate-600 dark:text-slate-400 flex-1 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors relative z-10">
                {game.description}
              </p>
              
              <div className="mt-6 flex items-center text-sm font-bold text-blue-500 dark:text-blue-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors relative z-10">
                Play Now
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
