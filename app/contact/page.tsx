"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Are the games completely free to play?",
    answer: "Yes! Every single game on Arcade Hub is 100% free forever. No microtransactions, no paywalls, and no hidden fees."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account required. We believe in instant access. Just click a game and start playing immediately."
  },
  {
    question: "How do I report a bug or glitch?",
    answer: "Please use the contact form on this page! Include the name of the game and a short description of the issue. We usually fix bugs within 48 hours."
  },
  {
    question: "Can I play these games on my phone?",
    answer: "Absolutely. Every game is built with responsive design in mind, ensuring a seamless experience across desktop, tablet, and mobile devices."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16 relative z-10 max-w-2xl mx-auto">
        <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold text-sm mb-6 border border-indigo-200 dark:border-indigo-800/50">
          We&apos;re here to help
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">Touch</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Have a game suggestion, found a bug, or just want to say hi? We&apos;d love to hear from you! Our team typically responds within 24 hours.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Contact Form */}
        <div className="glass p-8 md:p-12 rounded-[3rem] border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10 pointer-events-none"></div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Send a Message</h2>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message! This is a demo form."); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Subject</label>
              <select
                id="subject"
                className="w-full px-5 py-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 dark:text-slate-100 appearance-none"
              >
                <option>Game Suggestion</option>
                <option>Bug Report</option>
                <option>Business Inquiry</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Message</label>
              <textarea
                id="message"
                rows={5}
                placeholder="What&apos;s on your mind?"
                className="w-full px-5 py-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-slate-100 resize-none"
                required
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg">
              Send Message
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Frequently Asked</h2>
            <p className="text-slate-600 dark:text-slate-400">Can&apos;t find the answer you&apos;re looking for? Reach out to our support team.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`glass border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-indigo-500/50 dark:border-indigo-400/50 shadow-md' : 'border-slate-200/50 dark:border-slate-700/50'}`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className={`font-semibold ${openFaq === index ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-4 mt-8">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Direct Email</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">arij.chowdhuryr@gmail.com</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
