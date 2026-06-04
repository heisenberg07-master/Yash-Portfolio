"use client";
import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, ExternalLink, Award, TrendingUp } from 'lucide-react';

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

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  color: string;
  bgColor: string;
  logo: string;
  shortDesc: string;
  responsibilities: string[];
  skills: string[];
  highlights: { label: string; value: string }[];
}

const experiences: Experience[] = [
  {
    id: 'devtown',
    company: 'DevTown',
    role: 'Business Development Executive',
    period: 'Oct 2024 – Jan 2025',
    location: 'Bangalore',
    type: 'Internship',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-600/10',
    logo: 'DT',
    shortDesc: 'Drove outreach, partnership, and growth initiatives for a tech-education startup.',
    responsibilities: [
      'Identified and pursued new business opportunities to expand DevTown\'s student and partner network',
      'Conducted market research and competitor analysis to identify growth opportunities in the ed-tech space',
      'Engaged with potential institutional clients and educational partners, building effective communication pipelines',
      'Collaborated with the marketing team to create targeted outreach campaigns resulting in increased engagement',
      'Developed proposals and presentations for prospective partners, helping secure collaboration agreements',
      'Tracked KPIs and prepared progress reports to measure campaign effectiveness and business outcomes',
    ],
    skills: ['Business Development', 'Market Research', 'Communication', 'CRM', 'Outreach', 'Analytics'],
    highlights: [
      { label: 'Duration', value: '4 Months' },
      { label: 'Type', value: 'Internship' },
      { label: 'Mode', value: 'On-Site' },
    ],
  },
  {
    id: 'cipherbyte',
    company: 'CipherByte Technologies',
    role: 'Python Developer Intern',
    period: 'Sep 2024 – Oct 2024',
    location: 'Remote',
    type: 'Internship',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-600/10',
    logo: 'CB',
    shortDesc: 'Developed Python-based solutions, automation scripts, and contributed to backend development tasks.',
    responsibilities: [
      'Developed and maintained Python scripts for data processing, automation, and backend functionality',
      'Wrote efficient, clean, and reusable Python modules following PEP 8 coding standards and best practices',
      'Designed and implemented RESTful API endpoints to support frontend applications and internal tools',
      'Integrated third-party APIs and services, ensuring reliable data exchange and error handling',
      'Performed debugging, code reviews, and optimization of existing Python codebases',
      'Collaborated with senior developers to understand requirements and deliver features within sprint timelines',
      'Documented code and technical processes to ensure maintainability and team knowledge sharing',
    ],
    skills: ['Python', 'REST APIs', 'Automation', 'Backend Development', 'Git', 'Debugging', 'Documentation'],
    highlights: [
      { label: 'Duration', value: '3 Months' },
      { label: 'Type', value: 'Tech Internship' },
      { label: 'Stack', value: 'Python' },
    ],
  },
];

function ExperienceCard({ exp, index, visible }: { exp: Experience; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      {/* Timeline connector */}
      {index < experiences.length - 1 && (
        <div className="absolute left-6 lg:left-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-primary-300 to-transparent dark:from-primary-600/40 -translate-x-1/2 z-10" />
      )}

      <div className="bg-white dark:bg-dark-700 rounded-2xl border border-gray-100 dark:border-dark-600 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300 hover:-translate-y-1">
        {/* Card header */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Company logo */}
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${exp.bgColor} border border-current/10 flex items-center justify-center flex-shrink-0 shadow-sm`}>
              <span className={`text-lg font-black ${exp.color}`}>{exp.logo}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-dark-900 dark:text-white">{exp.role}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-base font-semibold ${exp.color}`}>{exp.company}</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${exp.bgColor} ${exp.color} border border-current/20`}>
                      {exp.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-dark-500 dark:text-slate-400 bg-gray-50 dark:bg-dark-600 hover:bg-gray-100 dark:hover:bg-dark-500 transition-colors duration-200"
                >
                  {expanded ? 'Less' : 'More'}
                  {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mt-3 text-sm text-dark-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </span>
              </div>
            </div>
          </div>

          <p className="text-dark-500 dark:text-slate-400 text-sm mt-4 leading-relaxed">{exp.shortDesc}</p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-4">
            {exp.highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-dark-600 text-xs">
                <span className="text-dark-400 dark:text-slate-500">{h.label}:</span>
                <span className="font-semibold text-dark-800 dark:text-slate-200">{h.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expanded details */}
        <div
          className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-6 pb-6 border-t border-gray-50 dark:border-dark-600 pt-4">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Responsibilities */}
              <div>
                <h4 className="text-sm font-bold text-dark-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary-600" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-dark-500 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm font-bold text-dark-900 dark:text-white mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-violet-600" />
                  Skills Applied
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref, visible } = useIntersection(0.05);

  return (
    <section id="experience" className="section-padding bg-gray-50/50 dark:bg-dark-800/30">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-600/10 border border-primary-200 dark:border-primary-600/30 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium mb-4">
            <Briefcase className="w-4 h-4" />
            Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark-900 dark:text-white">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-dark-400 dark:text-slate-400 mt-3 sm:mt-4 max-w-2xl mx-auto">
            Real-world experience that shaped my technical and professional growth
          </p>
        </div>

        {/* Open To Work Banner */}
        <div className={`mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative overflow-hidden rounded-2xl border border-green-200 dark:border-green-500/30 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-500/5 dark:to-emerald-500/5 p-5">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent animate-pulse" />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                </div>
                <div>
                  <p className="font-bold text-green-800 dark:text-green-300">Open to New Opportunities</p>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Actively seeking full-time roles & internships in software development
                  </p>
                </div>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg shadow-green-600/30"
              >
                Get In Touch
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-violet-200 to-transparent dark:from-primary-800 dark:via-violet-800 -translate-x-1/2 z-0" />

          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} visible={visible} />
          ))}
        </div>

        {/* Bottom note */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-dark-400 dark:text-slate-500 text-sm">
            More experience is being written every day —{' '}
            <span className="gradient-text font-medium">this is just the beginning.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
