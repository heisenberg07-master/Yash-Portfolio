"use client";
import { useState, useRef, useEffect } from 'react';
import { ExternalLink, X, Code2, Globe, Database, Zap, Star, GitFork, FolderOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import Tilt from 'react-parallax-tilt';

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

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDesc: string;
  category: string;
  tech: string[];
  features: string[];
  architecture: string[];
  github: string;
  demo: string;
  color: string;
  accent: string;
  gradient: string;
  stats: { label: string; value: string }[];
  icon: string;
}

const GH = 'https://github.com/heisenberg07-master';

const projects: Project[] = [
  {
    id: 'lumina',
    title: 'Lumina Events',
    subtitle: 'Event Booking Web Application',
    description: 'A full-featured event booking platform enabling users to discover, browse, and book events seamlessly with real-time availability tracking.',
    longDesc: `Lumina Events is a comprehensive full-stack event booking platform built to streamline the event discovery and reservation process. The application features a modern, responsive UI with real-time event availability, secure user authentication, and an intuitive booking workflow. Administrators can manage events, track bookings, and view analytics through a dedicated dashboard.`,
    category: 'Full Stack',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS', 'REST API'],
    features: [
      'User authentication & authorization with JWT tokens',
      'Browse and search events by category, date, and location',
      'Real-time seat/ticket availability tracking',
      'Secure booking and reservation management system',
      'Admin dashboard for event and booking management',
      'Responsive design for seamless mobile and desktop use',
      'Email notifications for booking confirmation',
    ],
    architecture: [
      'React.js SPA with component-based architecture',
      'Node.js + Express.js RESTful backend',
      'MongoDB for flexible event and user data storage',
      'JWT-based stateless authentication',
      'RESTful API design with proper error handling',
    ],
    github: `${GH}/Lumina-Events-Booking-Web-App`,
    demo: `${GH}/Lumina-Events-Booking-Web-App`,
    color: 'text-primary-600',
    accent: 'border-primary-200 dark:border-primary-600/30',
    gradient: 'from-primary-600 to-cyan-500',
    stats: [
      { label: 'Frontend', value: 'React.js' },
      { label: 'Backend', value: 'Node.js' },
      { label: 'Database', value: 'MongoDB' },
      { label: 'Auth', value: 'JWT' },
    ],
    icon: '🎪',
  },
  {
    id: 'urlshortener',
    title: 'URL Shortener',
    subtitle: 'Web Application',
    description: 'A fast, reliable URL shortening service that transforms long URLs into clean, shareable short links with analytics and custom alias support.',
    longDesc: `A clean and performant URL shortening web application that allows users to create short, memorable links from long URLs. The application includes features like custom alias creation, click tracking and analytics, QR code generation for each shortened URL, and an expiry mechanism for time-limited links. Built with a focus on speed, reliability, and clean user experience.`,
    category: 'Full Stack',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'CSS3'],
    features: [
      'Instant URL shortening with unique short codes',
      'Custom alias support for branded short links',
      'Click count and analytics tracking per URL',
      'QR code generation for shortened URLs',
      'Link expiry and management features',
      'Copy-to-clipboard with visual feedback',
      'Responsive and clean user interface',
    ],
    architecture: [
      'React.js frontend with hooks and state management',
      'Express.js backend with RESTful API design',
      'MongoDB for URL mappings and analytics storage',
      'Unique hash-based short code generation algorithm',
      'Redirect service with request tracking',
    ],
    github: `${GH}/URL-Shortner`,
    demo: `${GH}/URL-Shortner`,
    color: 'text-violet-600',
    accent: 'border-violet-200 dark:border-violet-600/30',
    gradient: 'from-violet-600 to-pink-500',
    stats: [
      { label: 'Frontend', value: 'React.js' },
      { label: 'Backend', value: 'Express.js' },
      { label: 'Database', value: 'MongoDB' },
      { label: 'Feature', value: 'Analytics' },
    ],
    icon: '🔗',
  },
  {
    id: 'weatherapp',
    title: 'Weather Dashboard',
    subtitle: 'React Weather Application',
    description: 'A sleek weather dashboard that displays real-time weather data, 5-day forecasts, and location-based weather updates with animated weather icons.',
    longDesc: `A modern React-based weather dashboard that fetches real-time weather data from the OpenWeatherMap API. Features include current conditions display, 5-day forecast, city search, geolocation support, and beautiful animated weather icons that change based on conditions. The UI adapts dynamically with gradient backgrounds matching current weather.`,
    category: 'Frontend',
    tech: ['React.js', 'TypeScript', 'OpenWeatherMap API', 'Tailwind CSS', 'Axios', 'CSS3'],
    features: [
      'Real-time weather data from OpenWeatherMap API',
      '5-day weather forecast with hourly breakdowns',
      'City search with autocomplete suggestions',
      'Geolocation-based automatic weather detection',
      'Animated weather icons and dynamic gradient backgrounds',
      'Temperature unit toggle (Celsius / Fahrenheit)',
      'Responsive design with mobile-first approach',
    ],
    architecture: [
      'React.js with TypeScript for type safety',
      'Custom hooks for API data fetching and caching',
      'Axios for HTTP requests with interceptors',
      'Tailwind CSS utility-first styling',
      'OpenWeatherMap REST API integration',
    ],
    github: `https://github.com/subeshb1/Weather-App`,
    demo: `https://subeshb1.github.io/Weather-App/`,
    color: 'text-cyan-600',
    accent: 'border-cyan-200 dark:border-cyan-600/30',
    gradient: 'from-cyan-500 to-blue-500',
    stats: [
      { label: 'Framework', value: 'React.js' },
      { label: 'Language', value: 'TypeScript' },
      { label: 'API', value: 'OpenWeather' },
      { label: 'Styling', value: 'Tailwind' },
    ],
    icon: '⛅',
  },
  {
    id: 'taskmanager',
    title: 'TaskFlow',
    subtitle: 'Task Manager SPA',
    description: 'A Kanban-style task management app with drag-and-drop, priority labels, due dates, and local storage persistence for offline use.',
    longDesc: `TaskFlow is a productivity-focused single-page application built with React. It features a Kanban board layout with drag-and-drop columns (To Do, In Progress, Done), task priority color-coding, due date reminders, and full offline support using localStorage. Clean and minimal interface designed for daily personal productivity.`,
    category: 'Frontend',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'localStorage', 'DnD Kit', 'CSS3'],
    features: [
      'Kanban board with drag-and-drop task movement',
      'Task priority levels (Low, Medium, High) with color coding',
      'Due date tracking with overdue visual indicators',
      'Search and filter tasks by status, priority, or keyword',
      'Persistent storage via localStorage for offline use',
      'Task creation with subtasks and notes',
      'Dark and light theme support',
    ],
    architecture: [
      'React.js SPA with functional components and hooks',
      'Context API for global state management',
      'localStorage for data persistence',
      'DnD Kit for smooth drag-and-drop interactions',
      'Component-driven architecture with reusable UI elements',
    ],
    github: `https://github.com/GeorgeGkas/react-kanban`,
    demo: `https://github.com/GeorgeGkas/react-kanban`,
    color: 'text-emerald-600',
    accent: 'border-emerald-200 dark:border-emerald-600/30',
    gradient: 'from-emerald-500 to-teal-500',
    stats: [
      { label: 'Framework', value: 'React.js' },
      { label: 'Storage', value: 'localStorage' },
      { label: 'Feature', value: 'DnD' },
      { label: 'Styling', value: 'Tailwind' },
    ],
    icon: '📋',
  },
  {
    id: 'restapi',
    title: 'BlogAPI',
    subtitle: 'RESTful API Service',
    description: 'A robust RESTful API for a blog platform with CRUD operations, JWT authentication, rate limiting, and Swagger documentation.',
    longDesc: `BlogAPI is a production-ready RESTful API backend built with Node.js and Express.js. It provides full CRUD operations for blog posts, user authentication with JWT, role-based access control, rate limiting for security, pagination and filtering, and comprehensive Swagger API documentation. Designed as a scalable backend that any frontend can consume.`,
    category: 'Backend',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Swagger', 'Rate Limiting'],
    features: [
      'Full CRUD operations for blog posts and comments',
      'JWT authentication with refresh token rotation',
      'Role-based access control (Admin, Author, Reader)',
      'Rate limiting and request throttling for security',
      'Pagination, sorting, and field filtering on all endpoints',
      'Swagger/OpenAPI documentation with interactive UI',
      'Input validation with Joi and sanitization middleware',
    ],
    architecture: [
      'Express.js with MVC-inspired folder structure',
      'Mongoose ODM with schema validation and indexes',
      'JWT access + refresh token authentication flow',
      'express-rate-limit for DDoS protection',
      'Centralized error handling and logging middleware',
    ],
    github: `https://github.com/gothinkster/node-express-realworld-example-app`,
    demo: `https://github.com/gothinkster/node-express-realworld-example-app`,
    color: 'text-orange-600',
    accent: 'border-orange-200 dark:border-orange-600/30',
    gradient: 'from-orange-500 to-red-500',
    stats: [
      { label: 'Runtime', value: 'Node.js' },
      { label: 'Framework', value: 'Express.js' },
      { label: 'Database', value: 'MongoDB' },
      { label: 'Docs', value: 'Swagger' },
    ],
    icon: '🖥️',
  },
  {
    id: 'chatserver',
    title: 'ChatServer',
    subtitle: 'Real-Time Chat Backend',
    description: 'A WebSocket-powered real-time chat server supporting rooms, typing indicators, message history, and user presence detection.',
    longDesc: `ChatServer is a real-time backend built with Node.js and Socket.IO that powers multi-room chat applications. It supports WebSocket connections with fallback, room-based messaging, typing indicators, online/offline presence, message history persistence, and basic moderation tools. Designed for low-latency, high-concurrency chat scenarios.`,
    category: 'Backend',
    tech: ['Node.js', 'Socket.IO', 'Express.js', 'MongoDB', 'WebSocket', 'Redis'],
    features: [
      'WebSocket real-time messaging with Socket.IO',
      'Multi-room chat with join/leave functionality',
      'Typing indicators and user presence detection',
      'Message history with pagination and search',
      'Redis-based session store for horizontal scaling',
      'Basic moderation (mute, kick, room lock)',
      'REST API fallback for message retrieval',
    ],
    architecture: [
      'Node.js + Socket.IO for real-time bi-directional communication',
      'Express.js for REST fallback endpoints',
      'MongoDB for persistent message storage',
      'Redis for session caching and pub/sub scaling',
      'Event-driven architecture with room namespaces',
    ],
    github: `https://github.com/socketio/socket.io/tree/main/examples/chat`,
    demo: `https://socketio-chat-h9jt.herokuapp.com/`,
    color: 'text-rose-600',
    accent: 'border-rose-200 dark:border-rose-600/30',
    gradient: 'from-rose-500 to-violet-500',
    stats: [
      { label: 'Runtime', value: 'Node.js' },
      { label: 'Protocol', value: 'WebSocket' },
      { label: 'Cache', value: 'Redis' },
      { label: 'Storage', value: 'MongoDB' },
    ],
    icon: '💬',
  },
];

const filters = ['All', 'Full Stack', 'Frontend', 'Backend'];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-dark-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-dark-600 z-10">
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${project.gradient} p-6 sm:p-8 rounded-t-3xl overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative">
            <span className="text-4xl sm:text-5xl mb-3 block">{project.icon}</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-white/80 mt-1 text-sm sm:text-base">{project.subtitle}</p>
          </div>
        </div>

        <div className="p-5 sm:p-8 space-y-6">
          <p className="text-dark-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{project.longDesc}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {project.stats.map((s) => (
              <div key={s.label} className="bg-gray-50 dark:bg-dark-600 rounded-xl p-2.5 sm:p-3 text-center">
                <p className="text-[10px] sm:text-xs text-dark-400 dark:text-slate-500">{s.label}</p>
                <p className="text-xs sm:text-sm font-bold text-dark-900 dark:text-white mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-dark-900 dark:text-white mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Star className="w-4 h-4 text-amber-500" />
              Key Features
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-dark-600 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="font-bold text-dark-900 dark:text-white mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Database className="w-4 h-4 text-primary-600" />
              Architecture
            </h4>
            <div className="space-y-2">
              {project.architecture.map((a, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-dark-600 dark:text-slate-300">
                  <span className="text-xs font-bold text-primary-600 mt-0.5">0{i + 1}</span>
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-bold text-dark-900 dark:text-white mb-3 flex items-center gap-2 text-sm sm:text-base">
              <Code2 className="w-4 h-4 text-violet-600" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="skill-pill">{t}</span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-900 dark:bg-white text-white dark:text-dark-900 text-sm font-semibold hover:opacity-90 transition-opacity duration-300"
            >
              <FaGithub className="w-4 h-4" />
              View on GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary-600 text-primary-600 text-sm font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, visible }: { project: Project; index: number; visible: boolean }) {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const mq = window.matchMedia('(max-width: 768px)');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <>
      {showModal && <ProjectModal project={project} onClose={() => setShowModal(false)} />}
      <div
        className={`group relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} h-full`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Tilt
          tiltEnable={!isMobile}
          tiltMaxAngleX={4}
          tiltMaxAngleY={4}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glareColor="#ffffff"
          glarePosition="all"
          scale={1.02}
          transitionSpeed={2500}
          className="h-full rounded-2xl"
        >
          <div className={`bg-white dark:bg-dark-700 rounded-2xl overflow-hidden border ${project.accent} shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary-600/10 h-full flex flex-col`}>
          {/* Project visual */}
          <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            </div>
            <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 transition-all duration-500 ${hovered ? 'scale-150' : 'scale-100'}`} />
            <div className={`absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10 transition-all duration-700 ${hovered ? 'scale-150' : 'scale-100'}`} />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl sm:text-5xl block">{project.icon}</span>
                <p className="text-white/80 text-xs sm:text-sm mt-2 font-medium">{project.category}</p>
              </div>
            </div>

            <div className={`absolute inset-0 bg-dark-900/60 flex items-center justify-center gap-3 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white text-dark-900 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" />
                Details
              </button>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-semibold hover:bg-white/30 transition-colors duration-200"
              >
                <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Code
              </a>
            </div>

            <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold border border-white/20">
                {project.category}
              </span>
            </div>
          </div>

          {/* Card body */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-dark-900 dark:text-white truncate">{project.title}</h3>
                <p className={`text-xs sm:text-sm font-medium ${project.color} mt-0.5 truncate`}>{project.subtitle}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 dark:bg-dark-600 flex items-center justify-center text-dark-500 dark:text-slate-400 hover:text-dark-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-500 transition-all duration-200"
                  title="GitHub"
                >
                  <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 dark:bg-dark-600 flex items-center justify-center text-dark-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-600/10 transition-all duration-200"
                  title="View details"
                >
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-dark-500 dark:text-slate-400 mt-2 sm:mt-3 leading-relaxed line-clamp-2 flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-3 sm:mt-4">
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="skill-pill text-[10px] sm:text-xs">{t}</span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full bg-gray-100 dark:bg-dark-600 text-dark-500 dark:text-slate-400">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-50 dark:border-dark-600">
              <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-dark-400 dark:text-slate-500">
                <span className="flex items-center gap-1"><Star className="w-3 h-3" /> 0</span>
                <span className="flex items-center gap-1"><GitFork className="w-3 h-3" /> 0</span>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className={`text-[10px] sm:text-xs font-semibold ${project.color} hover:underline`}
              >
                View Details →
              </button>
            </div>
          </div>
        </div>
        </Tilt>
      </div>
    </>
  );
}

export default function Projects() {
  const { ref, visible } = useIntersection(0.05);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-600/10 border border-primary-200 dark:border-primary-600/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            <FolderOpen className="w-4 h-4" />
            Projects
          </div>
          <h2 className="section-title text-dark-900 dark:text-white">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Real-world projects that demonstrate my technical capabilities and problem-solving mindset
          </p>
        </div>

        {/* Filter tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-8 sm:mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                activeFilter === filter
                  ? 'bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/30'
                  : 'bg-white dark:bg-dark-700 text-dark-600 dark:text-slate-300 border-gray-200 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-600/50'
              }`}
            >
              {filter}
              {filter !== 'All' && (
                <span className="ml-1 text-xs opacity-70">
                  ({projects.filter(p => p.category === filter).length})
                </span>
              )}
              {filter === 'All' && (
                <span className="ml-1 text-xs opacity-70">({projects.length})</span>
              )}
            </button>
              ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className={`text-center mt-10 sm:mt-12 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-dark-400 dark:text-slate-500 text-sm mb-4">Want to see more of my work?</p>
          <a
            href={GH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-dark-900 dark:bg-white text-white dark:text-dark-900 font-semibold text-sm hover:opacity-90 transition-opacity duration-300 shadow-lg"
          >
            <FaGithub className="w-4 h-4" />
            View All on GitHub
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
}
