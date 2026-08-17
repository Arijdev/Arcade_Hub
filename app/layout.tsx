import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcade Hub | 5 Awesome Games",
  description: "A collection of 5 fun interactive games including Tic Tac Toe, Memory Game, Snake, Rock Paper Scissors, and Whack-a-Mole.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <header className="glass sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-gradient">
                  Arcade Hub 🕹️
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
              <nav className="hidden md:block">
                <ul className="flex items-center space-x-8 font-medium">
                  <li>
                    <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/games" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      Games
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Decorative background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob pointer-events-none -z-10"></div>
          <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000 pointer-events-none -z-10"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[45rem] h-[45rem] bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000 pointer-events-none -z-10"></div>
          <div className="absolute top-[40%] left-[40%] w-[30rem] h-[30rem] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000 pointer-events-none -z-10"></div>
          
          <div className="w-full h-full flex-1 flex flex-col">
            {children}
          </div>
        </main>

        <footer className="glass border-t border-slate-200/50 dark:border-slate-800/50 pt-16 pb-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-1">
                <Link href="/" className="text-2xl font-bold text-gradient mb-4 inline-block">
                  Arcade Hub 🕹️
                </Link>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  Premium, ad-free web games built with modern technology. Instant play, no downloads required.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Platform</h3>
                <ul className="space-y-3">
                  <li><Link href="/games" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">All Games</Link></li>
                  <li><Link href="/about" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">Contact Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Top Games</h3>
                <ul className="space-y-3">
                  <li><Link href="/tic-tac-toe" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">Tic Tac Toe</Link></li>
                  <li><Link href="/2048" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">2048</Link></li>
                  <li><Link href="/memory-game" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">Memory</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                © {new Date().getFullYear()} Arcade Hub. Built with modern web tech.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Designed for pure entertainment.
              </p>
            </div>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
