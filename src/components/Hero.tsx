"use client";
import { useState, useEffect, useRef } from 'react';
import { Download, ArrowRight, Mail, ChevronDown, Briefcase, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import MagneticWrapper from './MagneticWrapper';
import AnimatedLogo from './AnimatedLogo';

const titles = [
  'Associate Software Engineer',
  'Full Stack Developer',
  'React & Node.js Developer',
  'MCA Graduate',
  'Open to Opportunities',
];

const techIcons = [
  { label: 'React', color: '#61DAFB', symbol: '⚛' },
  { label: 'Node.js', color: '#339933', symbol: '⬡' },
  { label: 'TypeScript', color: '#3178C6', symbol: 'TS' },
  { label: 'Python', color: '#F7CC42', symbol: '🐍' },
  { label: 'MongoDB', color: '#47A248', symbol: '🍃' },
  { label: 'Docker', color: '#2496ED', symbol: '🐋' },
];

function TypeWriter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = titles[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setCurrentIndex(i => (i + 1) % titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex]);

  return (
    <div className="h-7 sm:h-8 flex items-center">
      <span className="text-base sm:text-xl font-semibold gradient-text">{displayText}</span>
      <span className="ml-0.5 w-0.5 h-5 sm:h-6 bg-primary-600 rounded-full cursor-blink inline-block" />
    </div>
  );
}

function DeveloperIllustration() {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm mx-auto animate-float">
      {/* Glow background */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-600/20 via-violet-600/10 to-cyan-500/20 blur-3xl scale-110" />

      {/* Main card */}
      <div className="relative bg-white dark:bg-dark-700 rounded-3xl p-6 shadow-2xl shadow-primary-600/20 border border-gray-100 dark:border-dark-600">
        {/* Monitor top bar */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 mx-3 h-5 rounded bg-gray-100 dark:bg-dark-600" />
        </div>

        {/* Code screen */}
        <div className="bg-dark-900 rounded-2xl p-4 font-mono text-xs leading-relaxed shadow-inner">
          <div className="flex gap-2 mb-3">
            <span className="text-slate-500">1</span>
            <span className="text-blue-400">const</span>
            <span className="text-green-400">Yash</span>
            <span className="text-white">=</span>
            <span className="text-yellow-300">{'{'}</span>
          </div>
          <div className="flex gap-2 mb-2 pl-4">
            <span className="text-slate-500">2</span>
            <span className="text-cyan-400">role</span>
            <span className="text-white">:</span>
            <span className="text-orange-300">"Full Stack Dev"</span><span className="text-white">,</span>
          </div>
          <div className="flex gap-2 mb-2 pl-4">
            <span className="text-slate-500">3</span>
            <span className="text-cyan-400">skills</span>
            <span className="text-white">:</span>
            <span className="text-yellow-300">["React"</span><span className="text-white">,</span>
          </div>
          <div className="flex gap-2 mb-2 pl-8">
            <span className="text-slate-500">4</span>
            <span className="text-yellow-300">"Node.js"</span><span className="text-white">,</span>
            <span className="text-yellow-300">"Python"</span><span className="text-white">],</span>
          </div>
          <div className="flex gap-2 mb-2 pl-4">
            <span className="text-slate-500">5</span>
            <span className="text-cyan-400">status</span>
            <span className="text-white">:</span>
            <span className="text-green-400">"hiring"</span><span className="text-white">,</span>
          </div>
          <div className="flex gap-2 pl-4">
            <span className="text-slate-500">6</span>
            <span className="text-cyan-400">passion</span>
            <span className="text-white">:</span>
            <span className="text-pink-400">true</span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="text-slate-500">7</span>
            <span className="text-yellow-300">{'}'}</span>
            <span className="w-2 h-4 bg-primary-500 rounded-sm cursor-blink inline-block mt-0.5" />
          </div>
        </div>

        {/* Avatar area */}
        <div className="mt-5 flex items-center gap-4">
          <AnimatedLogo className="w-16 h-16 rounded-2xl" />
          <div>
            <p className="font-bold text-dark-900 dark:text-white text-sm">Yash Saraf</p>
            <p className="text-xs text-dark-400 dark:text-slate-400">MCA Graduate</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Available for work</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: 'Projects', value: '5+' },
            { label: 'Internships', value: '2' },
            { label: 'Skills', value: '15+' },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 dark:bg-dark-600 rounded-xl px-2 py-2 text-center">
              <p className="text-sm font-bold gradient-text">{s.value}</p>
              <p className="text-[10px] text-dark-400 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating tech badges — hidden on mobile to avoid overlap */}
      {techIcons.slice(0, 4).map((icon, i) => {
        const positions = [
          '-top-4 -left-4',
          '-top-4 -right-4',
          '-bottom-4 -left-4',
          '-bottom-4 -right-4',
        ];
        const delays = ['0s', '1.5s', '3s', '4.5s'];
        return (
          <div
            key={icon.label}
            className={`hidden sm:flex absolute ${positions[i]} w-10 h-10 rounded-xl bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 shadow-lg items-center justify-center text-sm font-bold`}
            style={{
              animation: `float 6s ease-in-out infinite`,
              animationDelay: delays[i],
              color: icon.color,
            }}
          >
            {icon.symbol}
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            setMousePos({
              x: (e.clientX - rect.left) / rect.width,
              y: (e.clientY - rect.top) / rect.height,
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    const el = heroRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-dark-900"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="orb w-[600px] h-[600px] bg-primary-600/10 dark:bg-primary-600/5 -top-40 -left-40"
          style={{
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
            transition: 'transform 0.8s ease-out',
            animation: 'blob 7s infinite',
          }}
        />
        <div
          className="orb w-[500px] h-[500px] bg-violet-600/8 dark:bg-violet-600/5 top-1/3 -right-40"
          style={{
            transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)`,
            transition: 'transform 0.8s ease-out',
            animation: 'blob 7s infinite 2s',
          }}
        />
        <div
          className="orb w-[400px] h-[400px] bg-cyan-500/8 dark:bg-cyan-500/5 -bottom-40 left-1/3"
          style={{
            transform: `translate(${mousePos.x * 15}px, ${-mousePos.y * 15}px)`,
            transition: 'transform 0.8s ease-out',
            animation: 'blob 7s infinite 4s',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-max w-full pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-4 sm:space-y-6 lg:pr-8">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-xs sm:text-sm font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              Available for Work
              <Briefcase className="w-3.5 h-3.5" />
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none">
                <span className="text-dark-900 dark:text-white block">Hi, I'm</span>
                <span className="gradient-text block mt-1">Yash Saraf</span>
              </h1>
            </div>

            {/* Typewriter */}
            <TypeWriter />

            {/* Bio */}
            <p className="text-sm sm:text-base lg:text-lg text-dark-500 dark:text-slate-400 leading-relaxed max-w-xl">
              Passionate MCA graduate building modern, scalable web applications.
              Strong foundation in full-stack development with hands-on experience
              in <span className="text-primary-600 dark:text-primary-400 font-medium">React</span>,{' '}
              <span className="text-primary-600 dark:text-primary-400 font-medium">Node.js</span>, and{' '}
              <span className="text-primary-600 dark:text-primary-400 font-medium">cloud technologies</span>.
              Ready to contribute to ambitious engineering teams.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-dark-400 dark:text-slate-500 text-sm">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span>Pune, India</span>
              <span className="mx-2">·</span>
              <span className="text-green-600 dark:text-green-400 font-medium">Open to Remote & On-site</span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-1 sm:pt-2">
              <MagneticWrapper>
                <a
                  href="/Yash_Saraf_ASE_Resume.pdf"
                  download="Yash_Saraf_ASE_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </MagneticWrapper>
              <MagneticWrapper>
                <button
                  onClick={() => handleNavClick('#projects')}
                  className="btn-outline flex items-center gap-2 text-sm"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </button>
              </MagneticWrapper>
              <MagneticWrapper>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-dark-600 dark:text-slate-300 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </button>
              </MagneticWrapper>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm text-dark-400 dark:text-slate-500">Find me on:</span>
              {[
                { icon: FaGithub, href: 'https://github.com/heisenberg07-master', label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/yash-saraf-5885791a6/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:yashsaraf2312@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 flex items-center justify-center text-dark-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right - Developer Illustration */}
          <div className="flex items-center justify-center lg:justify-end">
            <DeveloperIllustration />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 lg:mt-20">
          <button
            onClick={() => handleNavClick('#about')}
            className="flex flex-col items-center gap-2 text-dark-300 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll Down</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
            </div>
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-primary-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
