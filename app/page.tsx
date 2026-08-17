import Link from "next/link";
import { games } from "@/lib/games";

const features = [
  {
    title: "Instant Play",
    description: "No downloads, no installations, no sign-ups. Jump straight into the action directly from your browser.",
    icon: (
      <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "bg-blue-100 dark:bg-blue-900/50"
  },
  {
    title: "Premium Design",
    description: "Experience games built with modern web technologies, featuring fluid animations and glassmorphism.",
    icon: (
      <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-purple-100 dark:bg-purple-900/50"
  },
  {
    title: "Cross-Platform",
    description: "Fully responsive layouts ensure the games look and feel perfect whether you are on mobile, tablet, or desktop.",
    icon: (
      <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-emerald-100 dark:bg-emerald-900/50"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Hero Section */}
      <section className="w-full relative py-20 lg:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
        {/* Floating background elements */}
        <div className="absolute top-[20%] left-[15%] text-6xl animate-float opacity-30 select-none hidden md:block">🕹️</div>
        <div className="absolute bottom-[20%] right-[15%] text-6xl animate-float animation-delay-2000 opacity-30 select-none hidden md:block">👾</div>
        <div className="absolute top-[30%] right-[25%] text-5xl animate-float animation-delay-4000 opacity-30 select-none hidden lg:block">🎲</div>
        
        <div className="text-center relative z-10 px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-8 border border-blue-200 dark:border-blue-800/50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            v1.0 is now live!
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1]">
            The Ultimate <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 animate-gradient-x">Arcade Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            Your one-stop destination for premium, beautifully designed mini-games. Re-experience the classics, rebuilt for the modern web.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/games">
              <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/30 active:scale-[0.98] flex items-center gap-3 transition-all">
                Start Playing Free
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </Link>
            <Link href="/about">
              <button className="px-10 py-5 glass text-slate-700 dark:text-slate-200 rounded-2xl font-bold text-lg hover:bg-white/40 dark:hover:bg-slate-800/60 transition-all active:scale-[0.98]">
                Discover How It's Built
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-y border-slate-200/50 dark:border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Arcade Hub?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We've obsessed over every pixel to bring you the best casual gaming experience on the web.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, i) => (
              <div key={i} className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 hover:-translate-y-2 transition-transform duration-300">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Games */}
      <section className="w-full py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Trending Games</h2>
              <p className="text-slate-600 dark:text-slate-400">See what our community is playing right now.</p>
            </div>
            <Link href="/games" className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              View All Games
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {games.slice(0, 3).map((game) => (
              <Link key={game.id} href={`/${game.id}`}>
                <div className="glass group rounded-3xl p-6 h-full flex flex-col transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_10px_40px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_10px_40px_rgba(139,92,246,0.3)] cursor-pointer relative overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-400/50 dark:hover:border-violet-500/50">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${game.color} transition-all duration-500`}></div>
                  
                  <div className={`w-full aspect-[2/1] mb-6 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-5xl shadow-inner relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                    <span className="transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">{game.icon}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {game.name}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 flex-1">
                    {game.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-4 relative z-10">
        <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[3rem] text-center border-2 border-indigo-500/20 dark:border-indigo-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 relative z-10">Ready to beat the high score?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of players enjoying our ad-free, lightning-fast mini-games. No account required.
          </p>
          
          <Link href="/games" className="relative z-10">
            <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-transform">
              Browse Game Library
            </button>
          </Link>
        </div>
      </section>
      
    </div>
  );
}
