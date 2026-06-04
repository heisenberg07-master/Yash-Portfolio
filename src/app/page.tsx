"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Journey from '@/components/Journey';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/Cursor';
import CommandMenu from '@/components/CommandMenu';

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const steps = [
      { target: 30, delay: 100 },
      { target: 60, delay: 300 },
      { target: 85, delay: 500 },
      { target: 100, delay: 700 },
    ];

    let timeout: ReturnType<typeof setTimeout>;

    const runStep = (index: number) => {
      if (index >= steps.length) {
        timeout = setTimeout(() => {
          setPhase(1);
          setTimeout(onDone, 500);
        }, 200);
        return;
      }
      timeout = setTimeout(() => {
        setProgress(steps[index].target);
        setPhase(index);
        runStep(index + 1);
      }, steps[index].delay);
    };

    runStep(0);
    return () => clearTimeout(timeout);
  }, [onDone]);

  const msgs = ['Initializing...', 'Loading assets...', 'Almost ready...', 'Welcome!'];

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-dark-900 flex items-center justify-center flex-col transition-all duration-500 ${
        phase === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-600/10 blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-violet-600/10 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-primary-600/40">
            <span className="text-3xl font-black text-white">Y</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-black text-white">
            Yash<span className="gradient-text">.</span>Saraf
          </h1>
          <p className="text-slate-400 text-sm mt-1">Full Stack Developer & MCA Graduate</p>
        </div>

        {/* Progress */}
        <div className="w-48 mx-auto">
          <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2563EB, #7C3AED, #06B6D4)',
              }}
            />
          </div>
          <p className="text-slate-500 text-xs mt-2 text-center">{msgs[Math.min(phase, msgs.length - 1)]}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Component mounted on client side
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved as 'light' | 'dark');
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <>
      <CustomCursor />

      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <div
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} custom-cursor-active`}
      >
        <CommandMenu theme={theme} onToggleTheme={toggleTheme} />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Journey />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
