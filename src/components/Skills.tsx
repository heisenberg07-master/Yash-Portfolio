"use client";
import { useEffect, useRef, useState } from 'react';
import { Code2, Database, Server, Terminal, Cloud, Wrench, BookOpen, Layers } from 'lucide-react';

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

interface Skill {
  name: string;
  level: number;
  color: string;
  icon?: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Code2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    skills: [
      { name: 'React.js', level: 80, color: '#61DAFB', icon: '⚛' },
      { name: 'JavaScript', level: 82, color: '#F7DF1E', icon: 'JS' },
      { name: 'TypeScript', level: 72, color: '#3178C6', icon: 'TS' },
      { name: 'HTML5 / CSS3', level: 88, color: '#E34F26', icon: '🌐' },
      { name: 'Tailwind CSS', level: 78, color: '#06B6D4', icon: '🎨' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
    skills: [
      { name: 'Node.js', level: 76, color: '#339933', icon: '⬡' },
      { name: 'Express.js', level: 74, color: '#000000', icon: '⚡' },
      { name: 'Python', level: 72, color: '#3776AB', icon: '🐍' },
      { name: 'REST APIs', level: 78, color: '#FF6C37', icon: '🔌' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: Database,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-500/10',
    skills: [
      { name: 'MongoDB', level: 74, color: '#47A248', icon: '🍃' },
      { name: 'PostgreSQL', level: 68, color: '#336791', icon: '🐘' },
      { name: 'MySQL / SQL', level: 72, color: '#4479A1', icon: '💾' },
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    icon: BookOpen,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 dark:bg-rose-500/10',
    skills: [
      { name: 'Jest', level: 65, color: '#C21325', icon: '🧪' },
      { name: 'Postman', level: 78, color: '#FF6C37', icon: '📮' },
      { name: 'Unit Testing', level: 62, color: '#6DB33F', icon: '✅' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    icon: Cloud,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-500/10',
    skills: [
      { name: 'Docker', level: 62, color: '#2496ED', icon: '🐋' },
      { name: 'GCP', level: 55, color: '#4285F4', icon: '☁️' },
      { name: 'Git / GitHub', level: 82, color: '#F05032', icon: '🌿' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Methodology',
    icon: Wrench,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-500/10',
    skills: [
      { name: 'VS Code', level: 90, color: '#007ACC', icon: '📝' },
      { name: 'Agile / Scrum', level: 70, color: '#2563EB', icon: '🔄' },
      { name: 'Linux / CLI', level: 68, color: '#FCC624', icon: '🖥️' },
    ],
  },
];

function SkillBar({ name, level, color, icon, visible, delay }: Skill & { visible: boolean; delay: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setWidth(level), delay);
      return () => clearTimeout(timer);
    }
  }, [visible, level, delay]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-medium text-dark-700 dark:text-slate-300">{name}</span>
        </div>
        <span className="text-xs font-bold" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 dark:bg-dark-600 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
    </div>
  );
}

const techStack = [
  { name: 'React', icon: '⚛', color: '#61DAFB' },
  { name: 'Node.js', icon: '⬡', color: '#339933' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
  { name: 'Docker', icon: '🐋', color: '#2496ED' },
  { name: 'GCP', icon: '☁️', color: '#4285F4' },
  { name: 'Git', icon: '🌿', color: '#F05032' },
  { name: 'Express', icon: '⚡', color: '#000000' },
  { name: 'Tailwind', icon: '🎨', color: '#06B6D4' },
  { name: 'Jest', icon: '🧪', color: '#C21325' },
];

export default function Skills() {
  const { ref: sectionRef, visible } = useIntersection(0.05);
  const [activeCategory, setActiveCategory] = useState('frontend');

  const active = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <section id="skills" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-max" ref={sectionRef}>
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-600/10 border border-primary-200 dark:border-primary-600/30 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            Technical Skills
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark-900 dark:text-white">
            My Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-dark-400 dark:text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto">
            Technologies I work with to build modern, scalable applications
          </p>
        </div>

        {/* Floating Tech Badges */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {techStack.map((tech, i) => (
            <div
              key={tech.name}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 rounded-full text-xs font-medium text-dark-700 dark:text-slate-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
              style={{
                borderColor: `${tech.color}30`,
                animationDelay: `${i * 100}ms`,
              }}
            >
              <span style={{ filter: 'none' }}>{tech.icon}</span>
              {tech.name}
            </div>
          ))}
        </div>

        {/* Category tabs + Skills display */}
        <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-6 sm:mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/30'
                    : 'bg-white dark:bg-dark-700 text-dark-600 dark:text-slate-300 border-gray-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-600/50'
                }`}
              >
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-white' : cat.color}`} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active Category Skills */}
          <div className="bg-gray-50/50 dark:bg-dark-800/50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-dark-700">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {active.skills.map((skill, i) => (
                <div key={skill.name} className="bg-white dark:bg-dark-700 rounded-xl p-4 border border-gray-100 dark:border-dark-600 shadow-sm">
                  <SkillBar {...skill} visible={visible} delay={i * 150} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All categories overview */}
        <div className={`mt-12 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6 text-center">
            All Categories <span className="gradient-text">Overview</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-4 rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1 group ${
                  activeCategory === cat.id
                    ? 'border-primary-300 dark:border-primary-600/50 bg-primary-50 dark:bg-primary-600/10'
                    : 'border-gray-100 dark:border-dark-600 bg-white dark:bg-dark-700 hover:border-gray-200 dark:hover:border-dark-500'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl ${cat.bgColor} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className={`w-5 h-5 ${cat.color}`} />
                </div>
                <p className="text-xs font-semibold text-dark-800 dark:text-slate-200">{cat.label}</p>
                <p className="text-xs text-dark-400 dark:text-slate-500 mt-1">{cat.skills.length} skills</p>
              </button>
            ))}
          </div>
        </div>

        {/* Learning notice */}
        <div className={`mt-8 text-center transition-all duration-700 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm font-medium">
            <Terminal className="w-4 h-4" />
            Always learning — currently exploring advanced system design, microservices, and Kubernetes
          </div>
        </div>
      </div>
    </section>
  );
}
