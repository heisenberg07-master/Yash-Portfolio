"use client";
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Download, Moon, Sun } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
      setScrolled(scrollTop > 20);

      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[1001] transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #2563EB, #7C3AED, #06B6D4)',
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-gray-100/50 dark:border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-max">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-2 group"
            >
              <AnimatedLogo className="w-10 h-10 rounded-xl shadow-lg group-hover:shadow-primary-600/40" />
              <span className="font-bold text-lg text-dark-900 dark:text-white">
                Yash<span className="gradient-text">.</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    activeSection === link.href.slice(1)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-dark-600 dark:text-slate-400 hover:text-dark-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-primary-600 to-violet-600 transition-all duration-300 ${
                      activeSection === link.href.slice(1) ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                className="w-9 h-9 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 flex items-center justify-center text-dark-600 dark:text-slate-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:shadow-md"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {/* Resume Button */}
              <a
                href="/Yash_Saraf_ASE_Resume.pdf"
                download="Yash_Saraf_ASE_Resume.pdf"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold btn-primary"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-9 h-9 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 flex items-center justify-center text-dark-600 dark:text-slate-300 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-dark-700 px-4 py-4 space-y-1">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'bg-primary-50 dark:bg-primary-600/10 text-primary-600 dark:text-primary-400'
                    : 'text-dark-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-gray-100 dark:border-dark-700">
              <a
                href="/Yash_Saraf_ASE_Resume.pdf"
                download="Yash_Saraf_ASE_Resume.pdf"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold btn-primary"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
