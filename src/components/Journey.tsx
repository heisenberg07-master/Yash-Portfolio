"use client";
import { useRef, useEffect, useState } from 'react';
import { GraduationCap, Code2, Briefcase, Rocket, Target, BookOpen, Award, Cpu } from 'lucide-react';

function useIntersection(threshold = 0.05) {
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

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  tags: string[];
  current?: boolean;
}

const timeline: TimelineItem[] = [
  {
    year: '2020 – 2023',
    title: 'Bachelor of Science (BSc) Computer Science',
    subtitle: 'Sandip University, Nashik',
    desc: 'Completed BSc in Computer Science with GPA 7.67/10. Built strong fundamentals in programming, data structures, algorithms, and computer science principles. Discovered passion for coding through web development projects.',
    icon: GraduationCap,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-600/10',
    tags: ['BSc', 'Programming Fundamentals', 'Data Structures', 'Algorithms'],
  },
  {
    year: '2022',
    title: 'Started Building Web Projects',
    subtitle: 'Self-Learning & Side Projects',
    desc: 'Began exploring web development independently. Built small HTML/CSS/JavaScript projects. Started learning React and discovered a genuine love for frontend development and UI design.',
    icon: Code2,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-600/10',
    tags: ['HTML', 'CSS', 'JavaScript', 'React Basics', 'Self-Learning'],
  },
  {
    year: '2023 – 2025',
    title: 'Master of Computer Applications (MCA)',
    subtitle: 'Tilak Maharashtra Vidyapeeth, Pune',
    desc: 'Pursuing MCA with GPA 5.82/10. Deepened expertise in software engineering with focus on full-stack development, database systems, cloud computing, and software design patterns. Built multiple academic and personal projects.',
    icon: BookOpen,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-600/10',
    tags: ['MCA', 'Full Stack', 'System Design', 'Advanced CS'],
  },
  {
    year: 'Oct 2024 – Jan 2025',
    title: 'Business Development Executive',
    subtitle: 'DevTown, Bengaluru',
    desc: 'Collaborated with cross-functional teams achieving 15% customer base increase and 20% revenue growth. Managed concurrent tasks in fast-paced environment, documented business processes, and participated in team meetings.',
    icon: Briefcase,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-600/10',
    tags: ['DevTown', 'Business Development', 'Startup Culture', 'CRM'],
  },
  {
    year: 'Sep 2024 – Oct 2024',
    title: 'Python Developer Intern',
    subtitle: 'CipherByte Technologies, Remote',
    desc: 'First hands-on software engineering role. Developed applications using coding standards with ~95% test reliability. Debugged existing software improving performance by ~25%. Performed code reviews and documented changes improving project efficiency by ~10%.',
    icon: Cpu,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-600/10',
    tags: ['Python', 'REST APIs', 'Backend Development', 'CipherByte'],
  },
  {
    year: '2024 – 2025',
    title: 'Full Stack Projects',
    subtitle: 'Building Real Applications',
    desc: 'Applied classroom and internship learning to build production-quality full-stack projects. Created Lumina Events Booking App and URL Shortener using React, Node.js, Express, and MongoDB — solidifying MERN stack expertise.',
    icon: Rocket,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-600/10',
    tags: ['MERN Stack', 'Lumina Events', 'URL Shortener', 'Full Stack'],
  },
  {
    year: 'Jul 2025',
    title: 'MCA Graduate — Seeking Opportunities',
    subtitle: 'Ready to Make an Impact',
    desc: 'Completed MCA degree at Tilak Maharashtra Vidyapeeth. Actively building skills in cloud technologies, DevOps, and advanced system design. Open to full-time roles and internships to contribute and grow into a senior engineer.',
    icon: Award,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-600/10',
    tags: ['MCA Graduate', 'Open to Work', 'Full Stack', 'Cloud Learning'],
    current: true,
  },
  {
    year: 'Near Future',
    title: 'Goal: Senior Software Engineer',
    subtitle: 'The Journey Continues',
    desc: 'Aiming to join an ambitious engineering team, grow through impactful projects, and evolve into a full-stack architect who builds scalable, maintainable, and meaningful software products.',
    icon: Target,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-600/10',
    tags: ['System Design', 'Leadership', 'Scale', 'Impact'],
  },
];

export default function Journey() {
  const { ref, visible } = useIntersection(0.05);

  return (
    <section id="journey" className="section-padding bg-gray-50/50 dark:bg-dark-800/30">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-600/10 border border-primary-200 dark:border-primary-600/30 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium mb-4">
            <Rocket className="w-4 h-4" />
            My Coding Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark-900 dark:text-white">
            From Curiosity to <span className="gradient-text">Craft</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-dark-400 dark:text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto">
            Every milestone that shaped my growth as a software engineer
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-5 sm:left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-violet-300 to-cyan-300 dark:from-primary-700 dark:via-violet-700 dark:to-cyan-700 lg:-translate-x-1/2" />

          <div className="space-y-6 sm:space-y-8">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`relative transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Timeline node */}
                <div className="absolute left-5 sm:left-8 lg:left-1/2 -translate-x-1/2 z-10 top-4 sm:top-5">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${item.bgColor} border-2 border-white dark:border-dark-900 flex items-center justify-center shadow-lg ${item.current ? 'ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-dark-900' : ''}`}>
                    <item.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.color}`} />
                  </div>
                  {item.current && (
                    <div className="absolute inset-0 rounded-full">
                      <span className={`absolute inset-0 rounded-full ${item.bgColor} animate-ping opacity-50`} />
                    </div>
                  )}
                </div>

                {/* Card — Mobile right side, Desktop alternating */}
                <div className="ml-14 sm:ml-20 lg:ml-0 lg:w-[calc(50%-2rem)]" style={i % 2 === 0 ? { marginLeft: undefined } : {}}>
                  <div className={`${i % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'} bg-white dark:bg-dark-700 rounded-2xl p-4 sm:p-5 border border-gray-100 dark:border-dark-600 shadow-sm hover:shadow-lg hover:shadow-primary-600/5 transition-all duration-300 hover:-translate-y-1`}>
                    {/* Year badge */}
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold ${item.bgColor} ${item.color} border border-current/20`}>
                        {item.year}
                      </span>
                      {item.current && (
                        <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Now
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-dark-900 dark:text-white text-sm sm:text-base leading-tight">{item.title}</h3>
                    <p className={`text-xs sm:text-sm font-medium ${item.color} mt-0.5`}>{item.subtitle}</p>
                    <p className="text-xs sm:text-sm text-dark-500 dark:text-slate-400 mt-1.5 sm:mt-2 leading-relaxed">{item.desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-gray-50 dark:bg-dark-600 text-dark-500 dark:text-slate-400 border border-gray-100 dark:border-dark-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom inspiration quote */}
        <div className={`mt-10 sm:mt-16 text-center transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 rounded-2xl bg-gradient-to-br from-primary-600/5 to-violet-600/5 dark:from-primary-600/10 dark:to-violet-600/10 border border-primary-100 dark:border-primary-600/20">
            <p className="text-base sm:text-lg font-semibold text-dark-700 dark:text-slate-200 italic">
              "The best code I'll ever write is still in front of me."
            </p>
            <p className="text-xs sm:text-sm text-dark-400 dark:text-slate-500 mt-2">— My engineering philosophy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
