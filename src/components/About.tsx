"use client";
import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Code2, Rocket, Users, BookOpen, Target, Heart, Lightbulb } from 'lucide-react';
import GithubGraph from './GithubGraph';

function useIntersection(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useIntersection();

  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { icon: Code2, label: 'Projects Built', value: 5, suffix: '+', color: 'from-primary-600 to-blue-400' },
  { icon: GraduationCap, label: 'MCA Degree', value: 2025, suffix: '', color: 'from-violet-600 to-purple-400' },
  { icon: Users, label: 'Internships', value: 2, suffix: '', color: 'from-cyan-500 to-teal-400' },
  { icon: BookOpen, label: 'Technologies', value: 15, suffix: '+', color: 'from-orange-500 to-amber-400' },
];

const beliefs = [
  { icon: Heart, title: 'Passion-Driven', desc: 'Every line of code is crafted with care and purpose.', color: 'text-rose-500' },
  { icon: Lightbulb, title: 'Continuous Learning', desc: 'Technology evolves fast. I evolve faster.', color: 'text-amber-500' },
  { icon: Users, title: 'Team First', desc: 'Great software is built by great teams, together.', color: 'text-emerald-500' },
  { icon: Target, title: 'Problem Solver', desc: 'Breaking complex problems into elegant solutions.', color: 'text-primary-500' },
  { icon: Rocket, title: 'Growth Mindset', desc: 'Every challenge is an opportunity to level up.', color: 'text-violet-500' },
  { icon: Code2, title: 'Clean Code', desc: 'Code that reads like a story, not a puzzle.', color: 'text-cyan-500' },
];

const focusAreas = [
  { label: 'Full Stack Development', icon: '🔧', progress: 85 },
  { label: 'React Ecosystem', icon: '⚛️', progress: 80 },
  { label: 'Backend APIs & Node.js', icon: '⚡', progress: 75 },
  { label: 'Database Design', icon: '🗄️', progress: 70 },
  { label: 'Cloud & DevOps Learning', icon: '☁️', progress: 55 },
];

function FocusBar({ label, icon, progress, visible }: { label: string; icon: string; progress: number; visible: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setWidth(progress), 300);
      return () => clearTimeout(timer);
    }
  }, [visible, progress]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-dark-700 dark:text-slate-300 flex items-center gap-2">
          <span>{icon}</span> {label}
        </span>
        <span className="text-sm font-bold gradient-text">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { ref: sectionRef, visible } = useIntersection(0.05);
  const { ref: focusRef, visible: focusVisible } = useIntersection(0.2);

  return (
    <section id="about" className="section-padding bg-gray-50/50 dark:bg-dark-800/30">
      <div className="container-max" ref={sectionRef}>
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-600/10 border border-primary-200 dark:border-primary-600/30 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4" />
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark-900 dark:text-white">
            Building the Future,<br />
            <span className="gradient-text">One Commit at a Time</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-dark-400 dark:text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto">
            A motivated MCA graduate with a passion for creating seamless digital experiences
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mb-10 sm:mb-16">
          {/* Left - Story */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Profile card */}
            <div className="glass-card p-6 border border-gray-200/50 dark:border-dark-600/50">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center shadow-xl flex-shrink-0">
                  <span className="text-4xl font-black text-white">Y</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white">Yash Saraf</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">Full Stack Developer</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="skill-pill text-xs">MCA Graduate</span>
                    <span className="skill-pill text-xs">Fresher</span>
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                      Open to Work
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-dark-600 dark:text-slate-300 leading-relaxed">
              <p>
                I'm a <strong className="text-dark-900 dark:text-white">Master of Computer Applications (MCA)</strong> graduate
                with a deep passion for building meaningful software products. My journey in tech started with curiosity and
                grew into a commitment to continuous learning and problem-solving.
              </p>
              <p>
                During my academic journey, I've built <strong className="text-dark-900 dark:text-white">full-stack applications</strong>,
                worked as a <strong className="text-dark-900 dark:text-white">Python Developer Intern</strong> at CipherByte Technologies,
                and explored business development at DevTown — giving me a unique blend of technical and interpersonal skills.
              </p>
              <p>
                I'm particularly excited about <strong className="text-dark-900 dark:text-white">scalable system design</strong>,
                modern web architectures, and contributing to engineering teams where I can grow rapidly while delivering
                real impact.
              </p>
            </div>

            {/* Education quick facts */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { label: 'Degree', value: 'MCA (2023–2025)' },
                { label: 'Specialization', value: 'Full Stack & Python Dev' },
                { label: 'Location', value: 'Pune, India' },
                { label: 'Status', value: 'Available Now' },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-dark-700 rounded-xl p-3 border border-gray-100 dark:border-dark-600">
                  <p className="text-xs text-dark-400 dark:text-slate-500 font-medium uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-semibold text-dark-900 dark:text-white mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats + Focus Areas */}
          <div className={`space-y-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 border border-gray-200/50 dark:border-dark-600/50 card-hover text-center group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-black gradient-text">
                    {visible && <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
                  </p>
                  <p className="text-xs text-dark-400 dark:text-slate-500 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Current Focus */}
            <div ref={focusRef} className="bg-white dark:bg-dark-700 rounded-2xl p-5 border border-gray-100 dark:border-dark-600 shadow-sm">
              <h3 className="font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary-600" />
                Current Focus Areas
              </h3>
              <div className="space-y-4">
                {focusAreas.map((area) => (
                  <FocusBar key={area.label} {...area} visible={focusVisible} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What I Believe In */}
        <div className={`transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl sm:text-2xl font-bold text-dark-900 dark:text-white text-center mb-6 sm:mb-8">
            What I <span className="gradient-text">Believe In</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {beliefs.map((belief, i) => (
              <div
                key={belief.title}
                className="bg-white dark:bg-dark-700 rounded-2xl p-4 border border-gray-100 dark:border-dark-600 text-center card-hover group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gray-50 dark:bg-dark-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <belief.icon className={`w-5 h-5 ${belief.color}`} />
                </div>
                <p className="text-xs font-semibold text-dark-800 dark:text-white leading-tight">{belief.title}</p>
                <p className="text-xs text-dark-400 dark:text-slate-500 mt-1 leading-relaxed hidden sm:block">{belief.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <GithubGraph />
        </div>
      </div>
    </section>
  );
}
