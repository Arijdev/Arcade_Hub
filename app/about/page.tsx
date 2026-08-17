import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Header Section */}
      <section className="w-full relative py-20 overflow-hidden">
        <div className="text-center relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
            Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">Arcade</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            We're on a mission to bring back the nostalgic joy of classic web games, rebuilt with cutting-edge web technologies.
          </p>
        </div>
      </section>

      {/* Story / Mission Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass p-8 md:p-16 rounded-[3rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Philosophy</h2>
              <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  Remember the days of Flash games? Opening a browser tab and instantly playing something fun without worrying about microtransactions, massive downloads, or account creation? 
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">Arcade Hub</strong> was born from that nostalgia. We wanted to create a place where anyone could just click and play beautifully designed games that respect your time.
                </p>
                <p>
                  We focus on high frame rates, satisfying animations, and responsive design, ensuring that whether you're on a high-end desktop or a mobile phone on a train, the experience is flawless.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-3 aspect-square shadow-inner">
                <span className="text-4xl">🚀</span>
                <span className="font-bold text-slate-900 dark:text-white">Lightning Fast</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-3 aspect-square shadow-inner translate-y-8">
                <span className="text-4xl">🎨</span>
                <span className="font-bold text-slate-900 dark:text-white">Premium UI</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-3 aspect-square shadow-inner -translate-y-8">
                <span className="text-4xl">📱</span>
                <span className="font-bold text-slate-900 dark:text-white">Responsive</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center gap-3 aspect-square shadow-inner">
                <span className="text-4xl">🆓</span>
                <span className="font-bold text-slate-900 dark:text-white">100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="w-full py-20 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm border-y border-slate-200/50 dark:border-slate-800/50 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16">Powered by Modern Web Tech</h2>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50">
                <svg viewBox="0 0 128 128" className="w-12 h-12 text-slate-900 dark:text-white fill-current"><path d="M64 128c35.346 0 64-28.654 64-64 0-35.346-28.654-64-64-64-35.346 0-64 28.654-64 64 0 35.346 28.654 64 64 64zm-1.89-20.932l-30.825-45.74v45.74h-8.835V39.068h8.835l29.497 43.766V39.068h8.835v68.001h-7.507zM91.312 84.77h8.835v22.298h-8.835V84.77z"/></svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Next.js 15</span>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50">
                <svg viewBox="0 0 128 128" className="w-12 h-12 text-sky-400 fill-current"><path d="M38.6 98.4c-8.7 0-14.9-6-14.9-14.4 0-18.7 20-33.5 48.7-33.5 13.9 0 25 3.5 31.9 9.9v-7.2c0-8.4-6.3-14.5-16.7-14.5-7.3 0-14.5 2.6-21.6 7.4l-7.2-12.7c8.8-6.1 19.3-9.5 30.6-9.5 20.4 0 34.3 11 34.3 30.4v42.5c0 4.6 2.5 7.1 6.3 7.1.6 0 1.2-.1 1.7-.2v13.5c-2.1.8-4.9 1.2-8.3 1.2-10 0-15.6-5.4-17-12.8-5.7 8.9-14.9 14.1-27.1 14.1-13 0-21.6-7.3-21.6-18.1zm21.3-30.5c-15.5 0-25 7-25 15.6 0 5 3.7 8.1 9.3 8.1 10.9 0 23.3-8.8 28.5-19.1v-8.2c-3.6-2.5-8-3.7-12.8-3.7z"/></svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Tailwind CSS</span>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50">
                <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-12 h-12 text-cyan-500 fill-current"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">React 19</span>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
